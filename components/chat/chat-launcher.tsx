"use client";

import { useCallback, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { ChatPanel } from "./chat-panel";
import { cx } from "./cx";

/**
 * The floating entry point to the assistant, mounted once in the root layout.
 *
 * One button and one panel: unlike the agency site there is no menu of chat
 * destinations here, because there is only one destination. A visitor who wants
 * a human has the contact page and the email address in the footer, and the
 * assistant offers both itself.
 */
export function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Closing has to put focus somewhere deliberate: the panel's own controls are
  // unmounting, and focus would otherwise fall to the document body.
  const close = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close the assistant" : "Ask about Divine"}
        className={cx(
          "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          // While the panel is open on a phone it covers this corner, so the
          // button only stays on screen where it is still reachable.
          isOpen
            ? "hidden border border-border bg-card text-foreground hover:text-primary sm:inline-flex"
            : "bg-primary text-primary-foreground hover:opacity-90",
        )}
      >
        {isOpen ? (
          <X className="h-4 w-4" aria-hidden="true" />
        ) : (
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">
          {isOpen ? "Close" : "Ask about Divine"}
        </span>
      </button>

      <ChatPanel isOpen={isOpen} onClose={close} />
    </>
  );
}
