import type { ReactNode } from "react";

/**
 * The 404 body, shared by `app/[locale]/not-found.tsx` and
 * `app/not-found.tsx`.
 *
 * Two 404 routes exist because they resolve under different conditions, and
 * only one of them has a locale (see each file). The layout and copy are the
 * same either way, so the markup lives here once and each caller passes in its
 * own strings and its own link elements — translated `Link`s from the locale
 * version, plain anchors from the root one.
 */
export const NOT_FOUND_PRIMARY =
  "lift inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-[15px] font-semibold text-primary-foreground";

export const NOT_FOUND_SECONDARY =
  "lift inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-card px-6 py-3.5 text-[15px] font-semibold text-foreground hover:border-primary hover:text-primary";

export function NotFoundPanel({
  label,
  title,
  lede,
  consulting,
  home,
}: {
  label: string;
  title: string;
  lede: string;
  consulting: ReactNode;
  home: ReactNode;
}) {
  return (
    <section className="bg-gradient-to-b from-sand via-background to-background">
      <div className="container max-w-xl py-28 md:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {label}
        </p>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3rem)] font-extrabold text-foreground">
          {title}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {lede}
        </p>
        {/* Not a dead end: a 404 is still a visitor who was looking for
            something, so it offers the two pages most of them wanted. */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          {consulting}
          {home}
        </div>
      </div>
    </section>
  );
}
