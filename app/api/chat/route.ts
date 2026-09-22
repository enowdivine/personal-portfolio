import Groq, { APIError } from "groq-sdk";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { AI_SYSTEM_PROMPT, topicFocusNote } from "@/lib/ai-knowledge-base";
import { CHAT_TOPICS } from "@/components/chat/chat-context";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

/**
 * Public, unauthenticated, and it spends money on every call — so the system
 * prompt is composed here and never accepted from the client, the payload is
 * whitelisted, and the caller is rate limited before any work happens.
 */

// Groq retires model ids without notice, so the id is overridable via env and
// the default is kept to a currently-served model.
const DEFAULT_MODEL = "openai/gpt-oss-120b";

const MAX_COMPLETION_TOKENS = 1024;

/** Generous for a real visitor, useless for a script farming free tokens. */
const RATE_LIMIT = { limit: 20, windowMs: 10 * 60 * 1000 };

const requestSchema = z.object({
  /**
   * The transcript so far. Capped in both directions: a single message cannot
   * be an essay, and the history cannot grow without bound.
   */
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
  /**
   * Which starter the visitor tapped, if any. An id out of a closed set and
   * nothing more — the client cannot send prompt text, so this endpoint is
   * never a free LLM proxy, and the grounding sentence the id earns is composed
   * server-side in lib/ai-knowledge-base.ts.
   */
  topic: z.enum(CHAT_TOPICS).optional(),
});

type ErrorCode =
  | "not_configured"
  | "invalid_request"
  | "rate_limited"
  | "model_unavailable"
  | "upstream_unavailable"
  | "unexpected_error";

function errorResponse(code: ErrorCode, message: string, status: number) {
  return Response.json({ error: message, code }, { status });
}

function logFailure(context: string, error: unknown) {
  if (error instanceof APIError) {
    console.error(
      `[chat] ${context}: ${error.name} status=${String(error.status)} message=${error.message}`,
      error.error,
    );
    return;
  }

  if (error instanceof Error) {
    console.error(
      `[chat] ${context}: ${error.name} message=${error.message}`,
      error.stack,
    );
    return;
  }

  console.error(`[chat] ${context}: non-Error thrown`, error);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  // Fails loudly rather than degrading into a canned reply: a portfolio
  // assistant that answers without the model would answer wrongly.
  if (!apiKey) {
    console.error("[chat] GROQ_API_KEY is not set; chat endpoint disabled");
    return errorResponse(
      "not_configured",
      "The assistant is not configured right now.",
      503,
    );
  }

  if (isRateLimited("chat", clientIp(req.headers), RATE_LIMIT)) {
    return errorResponse(
      "rate_limited",
      "That is a lot of questions at once. Please try again in a few minutes.",
      429,
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    logFailure("request body is not valid JSON", error);
    return errorResponse(
      "invalid_request",
      "Request body must be valid JSON.",
      400,
    );
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    console.error(
      "[chat] invalid request payload:",
      z.treeifyError(parsed.error),
    );
    return errorResponse("invalid_request", "Request payload was rejected.", 400);
  }

  const { messages, topic } = parsed.data;

  // `topic` is already narrowed to a known id by the schema, so the note is
  // composed from a closed lookup and never from client text.
  const systemPrompt = topic
    ? `${AI_SYSTEM_PROMPT}\n\n${topicFocusNote(topic)}`
    : AI_SYSTEM_PROMPT;

  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;
  const client = new Groq({ apiKey });

  try {
    const response = await client.chat.completions.create({
      model,
      max_completion_tokens: MAX_COMPLETION_TOKENS,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const reply = response.choices[0]?.message?.content ?? "";

    if (!reply) {
      console.error(
        `[chat] model "${model}" returned an empty reply (finish_reason=${String(
          response.choices[0]?.finish_reason,
        )})`,
      );
      return errorResponse(
        "upstream_unavailable",
        "The assistant returned an empty response.",
        502,
      );
    }

    return Response.json({ reply });
  } catch (error) {
    logFailure(`completion failed for model "${model}"`, error);

    if (error instanceof APIError) {
      if (error.status === 429) {
        return errorResponse(
          "rate_limited",
          "The assistant is busy right now. Please try again in a moment.",
          429,
        );
      }

      if (error.status === 404) {
        return errorResponse(
          "model_unavailable",
          "The assistant is temporarily unavailable.",
          503,
        );
      }

      if (error.status === 401 || error.status === 403) {
        return errorResponse(
          "not_configured",
          "The assistant is not configured right now.",
          503,
        );
      }

      return errorResponse(
        "upstream_unavailable",
        "The assistant is temporarily unavailable.",
        502,
      );
    }

    return errorResponse(
      "unexpected_error",
      "Something went wrong handling your message.",
      500,
    );
  }
}
