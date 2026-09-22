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
 */

export const CHAT_TOPICS = ["who", "what", "work", "hire"] as const;

export type ChatTopic = (typeof CHAT_TOPICS)[number];

export function isChatTopic(value: unknown): value is ChatTopic {
  return (
    typeof value === "string" &&
    (CHAT_TOPICS as readonly string[]).includes(value)
  );
}

export interface ChatStarter {
  topic: ChatTopic;
  /** Button copy. */
  label: string;
  /** One line under the label, so the four buttons are not four bare nouns. */
  hint: string;
  /**
   * What tapping the button actually asks. It is sent as the visitor's own
   * message — a template starts a real conversation rather than pasting text
   * into the composer. The route validates `topic`, never this string.
   */
  question: string;
}

/**
 * Four starters, in the order a stranger reads them: who, what, proof, how to
 * engage. This is a personal site, not a support desk — anything else the
 * visitor can simply type.
 */
export const CHAT_STARTERS: readonly ChatStarter[] = [
  {
    topic: "who",
    label: "Who is Divine?",
    hint: "The short version",
    question: "Who is Enow Divine?",
  },
  {
    topic: "what",
    label: "What does he do?",
    hint: "Specialties and stack",
    question: "What does Enow Divine do?",
  },
  {
    topic: "work",
    label: "What's he worked on?",
    hint: "Roles and shipped work",
    question: "What has Enow Divine worked on?",
  },
  {
    topic: "hire",
    label: "Is he available?",
    hint: "Hiring and consulting",
    question: "Is Enow Divine available, and how do I hire him?",
  },
];
