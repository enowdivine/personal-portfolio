"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Trash2, X } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { CHAT_STARTERS, type ChatTopic } from "./chat-context";
import {
  CHAT_MESSAGES_KEY,
  readChatStorage,
  removeChatStorage,
  writeChatStorage,
} from "./chat-storage";
import { RichText } from "./rich-text";
import { cx } from "./cx";
import styles from "./chat.module.css";

/**
 * One line of the transcript.
 *
 * `isError` bubbles are rendered so the visitor knows what happened, but they
 * are never persisted and never replayed to the model. On the sibling agency
 * site a stored error message came back as an assistant turn on the next
 * reload and poisoned every answer after it.
 */
interface ChatEntry {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

/**
 * Entries the model is allowed to see, and the same set that may be written to
 * storage: real turns only, never errors.
 */
function isReplayable(entry: ChatEntry): boolean {
  return entry.isError !== true;
}

/**
 * What gets written to storage. Errors are dropped, and so is any trailing
 * question that has no answer — a request still in flight, or one that failed.
 * Otherwise a reload brings back a message nobody ever replied to, which reads
 * as a broken widget rather than an interrupted one.
 */
function persistableEntries(entries: ChatEntry[]): ChatEntry[] {
  const kept = entries.filter(isReplayable);
  while (kept.length > 0 && kept[kept.length - 1].role === "user") {
    kept.pop();
  }
  return kept;
}

function isEntry(value: unknown): value is ChatEntry {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

function loadEntries(): ChatEntry[] {
  const stored = readChatStorage(CHAT_MESSAGES_KEY);
  if (!stored) return [];
  try {
    const parsed: unknown = JSON.parse(stored);
    // Anything that does not look like a turn is dropped rather than trusted —
    // corrupt storage must not break the widget on mount.
    return Array.isArray(parsed) ? parsed.filter(isEntry) : [];
  } catch {
    return [];
  }
}

function errorTextFor(code: unknown): string {
  switch (code) {
    case "not_configured":
      return `The assistant is not available right now. You can still reach Divine directly at ${PROFILE.email}.`;
    case "rate_limited":
      return "That is a lot of questions at once — give it a minute and try again.";
    case "model_unavailable":
    case "upstream_unavailable":
      return "The assistant is temporarily unavailable. Please try again shortly.";
    case "invalid_request":
      return "That message could not be sent. Try rephrasing it.";
    default:
      return "Something went wrong sending that. Please try again.";
  }
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Read persisted state after mount rather than during render: localStorage
  // does not exist on the server, and the first client render has to match.
  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  useEffect(() => {
    // The guard keeps the first commit — which still holds the empty default —
    // from wiping what was just read back.
    if (entries.length === 0) return;
    writeChatStorage(
      CHAT_MESSAGES_KEY,
      JSON.stringify(persistableEntries(entries)),
    );
  }, [entries]);

  // Escape closes from anywhere, not only from inside the panel: on desktop the
  // panel is not modal, so focus is often out on the page when the visitor
  // reaches for it.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    endRef.current?.scrollIntoView({ block: "end" });
  }, [entries, loading, isOpen]);

  // The visitor asked for the panel, so putting the caret in the composer is
  // what they want. Nothing focuses until they open it.
  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(
      () => inputRef.current?.focus({ preventScroll: true }),
      80,
    );
    return () => window.clearTimeout(id);
  }, [isOpen]);

  const send = useCallback(
    async (text: string, topic?: ChatTopic) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const history = entries.filter(isReplayable);
      const nextEntries: ChatEntry[] = [
        ...history,
        { role: "user", content: trimmed },
      ];
      setEntries(nextEntries);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextEntries.map(({ role, content }) => ({
              role,
              content,
            })),
            // A starter id out of a closed set, never prompt text. The route
            // validates it and composes any extra grounding server-side.
            ...(topic ? { topic } : {}),
          }),
        });

        const data: unknown = await res.json().catch(() => null);

        if (!res.ok) {
          const code =
            data && typeof data === "object" && "code" in data
              ? (data as { code: unknown }).code
              : undefined;
          setEntries([
            ...nextEntries,
            { role: "assistant", content: errorTextFor(code), isError: true },
          ]);
          return;
        }

        const reply =
          data && typeof data === "object" && "reply" in data
            ? (data as { reply: unknown }).reply
            : undefined;

        if (typeof reply !== "string" || !reply) {
          setEntries([
            ...nextEntries,
            { role: "assistant", content: errorTextFor(undefined), isError: true },
          ]);
          return;
        }

        setEntries([...nextEntries, { role: "assistant", content: reply }]);
      } catch (error) {
        console.error("[chat] request failed:", error);
        setEntries([
          ...nextEntries,
          {
            role: "assistant",
            content:
              "That did not reach the server. Check your connection and try again.",
            isError: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [entries, loading],
  );

  const clear = () => {
    setEntries([]);
    removeChatStorage(CHAT_MESSAGES_KEY);
    inputRef.current?.focus({ preventScroll: true });
  };

  /**
   * A starter sends its question as the visitor's own message — tapping one
   * starts a real conversation rather than pasting text into the composer.
   * Focus moves to the composer because the starter button is about to unmount
   * with the empty state, and focus would otherwise fall to the document body.
   */
  const startFrom = (question: string, topic: ChatTopic) => {
    inputRef.current?.focus({ preventScroll: true });
    void send(question, topic);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop, phones only — there the panel is a sheet over the page, and a
          tap outside should close it. On desktop it sits beside the content and
          the page stays usable. */}
      <button
        type="button"
        aria-label="Close the assistant"
        onClick={onClose}
        className="fixed inset-0 z-[55] bg-background/70 backdrop-blur-sm sm:hidden"
      />

      <div
        role="dialog"
        aria-label={`Ask about ${PROFILE.name}`}
        className={cx(
          styles.panel,
          "fixed z-[60] flex flex-col border border-border bg-background shadow-2xl",
          // Phones: a sheet that clears the sticky header rather than covering
          // it, so the site's own navigation is never trapped underneath.
          "inset-x-2 bottom-2 top-[4.5rem]",
          // Desktop: a card above the launcher, capped so it never runs off a
          // short window.
          "sm:inset-x-auto sm:top-auto sm:bottom-24 sm:right-5 sm:h-[min(620px,calc(100vh-9rem))] sm:w-[25rem]",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              Ask about Divine
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Answers come from this site only
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {entries.length > 0 && (
              <button
                type="button"
                onClick={clear}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="inline-flex h-8 w-8 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close the assistant"
              className="inline-flex h-8 w-8 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Transcript */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className={cx(
            styles.transcript,
            "min-h-0 flex-1 space-y-4 overflow-y-auto p-4",
          )}
        >
          {entries.length === 0 && (
            <div className="flex h-full flex-col justify-center">
              <p className="text-sm text-foreground">
                Ask anything about {PROFILE.name} — his experience, what he
                specialises in, or how to work with him.
              </p>
              <div className="mt-5 space-y-2">
                {CHAT_STARTERS.map((starter) => (
                  <button
                    key={starter.topic}
                    type="button"
                    disabled={loading}
                    onClick={() => startFrom(starter.question, starter.topic)}
                    className="block w-full border border-border bg-card px-3.5 py-2.5 text-left transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                  >
                    <span className="block text-sm font-semibold text-foreground">
                      {starter.label}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {starter.hint}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                AI answers · verify anything that matters
              </p>
            </div>
          )}

          {entries.map((entry, i) => (
            <div
              key={i}
              className={cx(
                "flex",
                entry.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cx(
                  "max-w-[88%] px-3 py-2 text-sm leading-relaxed",
                  entry.isError
                    ? "border border-red-500/40 bg-red-500/10 text-red-300"
                    : entry.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground",
                )}
              >
                {entry.role === "assistant" && !entry.isError ? (
                  <RichText text={entry.content} />
                ) : (
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="border border-border bg-card px-3 py-2.5">
                <span className="sr-only">Thinking…</span>
                <span className="flex gap-1" aria-hidden="true">
                  <span className={cx(styles.dot, "h-1.5 w-1.5 bg-primary")} />
                  <span className={cx(styles.dot, "h-1.5 w-1.5 bg-primary")} />
                  <span className={cx(styles.dot, "h-1.5 w-1.5 bg-primary")} />
                </span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="border-t border-border bg-card p-3">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={4000}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask a question…"
              aria-label="Your question"
              disabled={loading}
              className="min-w-0 flex-1 border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => void send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="inline-flex shrink-0 items-center justify-center bg-primary px-3.5 text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
