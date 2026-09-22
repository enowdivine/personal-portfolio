/**
 * The one localStorage key the chat widget owns, and guarded accessors for it.
 *
 * `localStorage` is not merely empty in some privacy modes — reading the
 * property throws outright, and an unguarded `setItem` inside an effect or a
 * click handler takes the page down with it. Every access here is wrapped, and
 * a failure is a no-op: the conversation still works, it just is not remembered.
 */

export const CHAT_MESSAGES_KEY = "enow-portfolio-chat-messages";

export function readChatStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeChatStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage is unavailable (private mode, blocked site data). The transcript
    // lives in React state either way; only persistence across reloads is lost.
  }
}

/**
 * Guarded delete. `removeItem` throws in the same locked-down modes `setItem`
 * does, and this one runs from a click handler.
 */
export function removeChatStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing to do: the value we wanted gone was never stored.
  }
}
