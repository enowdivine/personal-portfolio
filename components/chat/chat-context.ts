/**
 * The conversation-focus contract shared by the chat widget and /api/chat.
 *
 * The widget never sends a system prompt — that stays server-side on purpose,
 * so the endpoint cannot be driven as a free LLM proxy and the prompt never
 * ships in the public bundle. Instead the widget sends one id out of the closed
 * set below, and the route composes any extra grounding itself from data it
 * already trusts. Nothing a visitor types ever reaches the system prompt.
 *
 * Every topic here is reachable from the opening screen. There is no menu and
 * no submenu on this site — four starters is the whole map — so an id that no
 * starter uses would be dead weight in the validator.
 *
 * The ids are ALSO the message keys: each one's button copy, its one-line hint
 * and the question it actually asks live under `ChatWidget.starters.<id>` in
 * messages/en.json and messages/fr.json. That is the whole reason this file no
 * longer carries any English — the starter a French visitor taps has to send a
 * French question, or the assistant answers the right thing in the wrong
 * language.
 */

/**
 * In the order a stranger reads them: who, what, proof, how to engage. The
 * opening screen renders one starter button per entry, in this order. This is
 * a personal site, not a support desk — anything else the visitor can type.
 */
export const CHAT_TOPICS = ["who", "what", "work", "hire"] as const;

export type ChatTopic = (typeof CHAT_TOPICS)[number];

export function isChatTopic(value: unknown): value is ChatTopic {
  return (
    typeof value === "string" &&
    (CHAT_TOPICS as readonly string[]).includes(value)
  );
}
