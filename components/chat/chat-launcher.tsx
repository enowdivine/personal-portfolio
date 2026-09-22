"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  // Fullscreen is owned here rather than in the panel because the launcher has
  // to know about it too: a fullscreen panel covers this corner on every screen
  // size, so the button has to get out of the way.
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Focus is restored in an effect rather than inline in `close`, because the
  // button it returns focus to is `display: none` while the panel is fullscreen
  // and cannot be focused until React has committed the closed state.
  const [restoreFocus, setRestoreFocus] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Closing has to put focus somewhere deliberate: the panel's own controls are
  // unmounting, and focus would otherwise fall to the document body.
  const close = useCallback(() => {
    setIsOpen(false);
    setIsFullscreen(false);
    setRestoreFocus(true);
  }, []);

  useEffect(() => {
    if (!restoreFocus) return;
    buttonRef.current?.focus({ preventScroll: true });
    setRestoreFocus(false);
  }, [restoreFocus]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((current) => !current);
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
          // 3.5rem square on phones — comfortably past the 44x44 minimum for a
          // touch target, and clear of the sticky header at the other end of
          // the viewport. From `sm` up it becomes the labelled pill again,
          // where the text carries the height.
          "fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center gap-2 text-sm font-semibold shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-auto sm:w-auto sm:px-4 sm:py-3",
          isOpen
            ? isFullscreen
              ? // Fullscreen covers this corner at every width, and the panel
                // carries its own close and minimise controls.
                "hidden"
              : // While the panel is open on a phone it covers this corner, so
                // the button only stays on screen where it is still reachable.
                "hidden border border-border bg-card text-foreground hover:text-primary sm:inline-flex"
            : "bg-primary text-primary-foreground hover:opacity-90",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 sm:h-4 sm:w-4" aria-hidden="true" />
        ) : (
          <MessageSquare className="h-6 w-6 sm:h-4 sm:w-4" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">
          {isOpen ? "Close" : "Ask about Divine"}
        </span>
      </button>

      <ChatPanel
        isOpen={isOpen}
        onClose={close}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </>
  );
}
