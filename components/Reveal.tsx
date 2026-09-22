"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * How far above the bottom edge of the viewport an element has to come before
 * it counts as "in view", in px. A settle band, so the whole animation plays
 * with the element comfortably on screen rather than at the very bottom edge,
 * where a normal scroll carries it past the motion before the motion finishes.
 *
 * Capped as a fraction of the viewport as well, because a fixed band is a much
 * bigger bite out of a 667px phone than a 1080px desktop: 15% of 667 is 100px,
 * of 844 is 120px (the cap), of 1080 is 120px.
 *
 * These two numbers produce ONE value — `band` — and that value is the only
 * threshold in this component. The mount-time "already visible" check and the
 * observer both measure against it, so they cannot drift apart and leave a
 * sliver of the viewport where neither path fires.
 */
const BAND_MAX_PX = 120;
const BAND_FRACTION = 0.15;

type RevealProps = {
  children: ReactNode;
  /** Stagger row-mates by passing `(i % columns) * 130`. Milliseconds. */
  delay?: number;
  /**
   * How far the element travels. `far` is for full-width section headers and
   * cards, which need more distance to read as deliberate at their size;
   * `base` is for body copy, list items, and labels. Distances live in
   * globals.css.
   */
  distance?: "base" | "far";
  /** Element to render. Use this rather than wrapping, so `li`/`figure`
   *  stay valid children of their parent and grid/flex cells keep working. */
  as?: ElementType;
  className?: string;
};

/**
 * Scroll reveal. Sets `data-reveal="in"` the first time the element crosses
 * into view; every visual decision lives in globals.css.
 *
 * Vertical travel only — there is no direction prop. One axis for the whole
 * site is what makes the motion read as a single behaviour rather than a set
 * of effects.
 *
 * IntersectionObserver rather than a scroll listener, and it unobserves after
 * firing — a page with thirty of these should not keep thirty callbacks alive
 * for the rest of the session.
 *
 * `prefers-reduced-motion` is handled in CSS, not here: the hidden start state
 * is gated on `no-preference`, so there is nothing for this to undo. The same
 * block is gated on `scripting: enabled`, so nothing is hidden if this file
 * never runs at all.
 */
export function Reveal({
  children,
  delay = 0,
  distance = "base",
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute("data-reveal", "in");

    // Nothing to observe with — show, rather than gamble on the element ever
    // being un-hidden.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    // `documentElement.clientHeight`, not `window.innerHeight`. The two agree
    // on desktop but not on mobile: innerHeight tracks the visual viewport,
    // which shrinks and grows as the URL bar collapses, while
    // IntersectionObserver's implicit root is the layout viewport. Measuring
    // the check below with one and the observer with the other puts them on
    // lines ~100px apart on a phone.
    const viewport = document.documentElement.clientHeight;
    const band = Math.min(BAND_MAX_PX, Math.round(viewport * BAND_FRACTION));
    const line = viewport - band;

    const top = el.getBoundingClientRect().top;
    // Room left to scroll, and therefore the highest this element's top can
    // ever travel. Read next to the rect above so one layout pass answers both.
    const remaining = Math.max(
      0,
      document.documentElement.scrollHeight - viewport - window.scrollY,
    );

    // Either it is already past the line (above the fold, or a hash jump), or
    // it can never reach the line however far the page scrolls — a short
    // element near the end of a page that barely scrolls. Both mean the
    // observer would never fire, so show it now. The bigger the band, the more
    // elements land in that second case, so this is load-bearing, not a
    // belt-and-braces extra.
    if (top <= line || top - remaining > line) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        }
      },
      // threshold 0: any overlap at all. A ratio threshold is unreachable for
      // an element shorter than that fraction of the shrunken root, and on a
      // phone plenty of elements are that short.
      { threshold: 0, rootMargin: `0px 0px -${band}px 0px` },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-distance={distance}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
