"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Maximize2, Minimize2, Send, Trash2, X } from "lucide-react";
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

/**
 * Everything the Tab trap is allowed to land on. Disabled controls are excluded
 * because they are not tabbable, and the composer is disabled while a request
 * is in flight.
 */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function ChatPanel({
  isOpen,
  onClose,
  isFullscreen,
  onToggleFullscreen,
}: ChatPanelProps) {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  // Only the fullscreen panel is modal, so only the fullscreen panel locks the
  // page behind it. The lock lives in one effect whose cleanup is the single
  // release path, which means every way out releases it: closing, minimising,
  // Escape (which closes), and unmounting all change or drop this effect.
  //
  // The scrollbar it hides is replaced with equivalent padding, so nothing on
  // the page behind moves. Nothing here repositions the body — a `position:
  // fixed` lock would scroll the page to the top and shift its layout.
  useEffect(() => {
    if (!isOpen || !isFullscreen) return;
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = documentElement.style.overflow;
    const previousBodyPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousRootOverflow;
      body.style.paddingRight = previousBodyPadding;
    };
  }, [isOpen, isFullscreen]);

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

  /**
   * Focus containment, fullscreen only. As a small sheet the panel is not modal
   * and the page behind it stays reachable by keyboard, which is the point of a
   * non-modal widget. Fullscreen covers the page, so Tab has to cycle inside it
   * rather than wander onto content the visitor cannot see.
   */
  const trapTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isFullscreen || event.key !== "Tab") return;
    const root = panelRef.current;
    if (!root) return;

    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((element) => element.offsetParent !== null);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop. As a sheet it is phones only — there the panel covers the
          page and a tap outside should close it, while on desktop the panel sits
          beside the content and the page stays usable. Fullscreen is modal at
          every width, so the backdrop is too: on desktop it dims the gutter
          around the panel, and a click there closes. */}
      <button
        type="button"
        aria-label="Close the assistant"
        onClick={onClose}
        className={cx(
          "fixed inset-0 z-[55] bg-background/70 backdrop-blur-sm",
          !isFullscreen && "sm:hidden",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-label={`Ask about ${PROFILE.name}`}
        // Modal only while fullscreen: a small sheet leaves the rest of the page
        // available to assistive technology, which matches the fact that it is
        // still visible and still scrollable.
        aria-modal={isFullscreen}
        onKeyDown={trapTab}
        className={cx(
          styles.panel,
          "fixed z-[60] flex flex-col bg-background shadow-2xl",
          isFullscreen
            ? cx(
                styles.panelFullscreen,
                // Phones: genuinely edge to edge, over the sticky header
                // included — the whole point is room for the transcript and the
                // composer. `100dvh` rather than `100vh` because the latter
                // measures the viewport with the URL bar collapsed and pushes
                // the composer off the bottom of the screen.
                "inset-x-0 top-0 h-[100dvh] border-0",
                // Desktop: a large centred panel inside a 2rem gutter, capped
                // so it does not become an unreadably wide column of chat.
                // `left`/`right` plus a max width and auto inline margins is
                // what centres it — no transform, so the entrance animation is
                // free to use one.
                "sm:inset-8 sm:mx-auto sm:h-auto sm:max-w-[64rem] sm:border sm:border-border",
              )
            : cx(
                "border border-border",
                // Phones: a sheet that clears the sticky header rather than
                // covering it, so the site's own navigation is never trapped
                // underneath.
                "inset-x-2 bottom-2 top-[4.5rem]",
                // Desktop: a card above the launcher, capped so it never runs
                // off a short window.
                "sm:inset-x-auto sm:top-auto sm:bottom-24 sm:right-5 sm:h-[min(620px,calc(100vh-9rem))] sm:w-[25rem]",
              ),
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
          {/* Window controls. 2.75rem square on phones so each one is its own
              tappable target even with three of them side by side — fullscreen
              hides the site's chrome, so these are the only way back out and
              they have to be hit first time. */}
          <div className="flex shrink-0 items-center gap-1">
            {entries.length > 0 && (
              <button
                type="button"
                onClick={clear}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="inline-flex h-11 w-11 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-8 sm:w-8"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            {/* Outlined where the other two are borderless, so it never reads as
                a second close button. */}
            <button
              type="button"
              onClick={onToggleFullscreen}
              aria-pressed={isFullscreen}
              title={isFullscreen ? "Exit full screen" : "Expand to full screen"}
              aria-label={
                isFullscreen
                  ? "Exit full screen"
                  : "Expand the assistant to full screen"
              }
              className="inline-flex h-11 w-11 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-8 sm:w-8"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close the assistant"
              className="inline-flex h-11 w-11 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-8 sm:w-8"
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
            // Fullscreen on a wide screen would otherwise stretch the transcript
            // to 64rem of line length. The panel gets the room; the reading
            // column stays a reading column.
            isFullscreen && "sm:mx-auto sm:w-full sm:max-w-3xl",
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
          <div
            className={cx(
              "flex gap-2",
              // Lines up with the transcript's reading column when fullscreen.
              isFullscreen && "sm:mx-auto sm:w-full sm:max-w-3xl",
            )}
          >
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
              // Taller on phones: the composer row stretches, so this sets the
              // height of the send button beside it as well, and 44px is the
              // floor for a touch target.
              className="min-w-0 flex-1 border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:opacity-50 sm:py-2"
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
