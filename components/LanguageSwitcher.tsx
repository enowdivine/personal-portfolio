"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales } from "@/i18n/config";

/**
 * Not translated, and not a mistake: a language picker has to name each
 * language IN that language, or the person who cannot read the current one
 * cannot find their way out of it.
 */
const LABEL: Record<string, string> = {
  en: "English",
  fr: "Français",
};

/**
 * The header's language picker — same shape as saassimplified.net's, so the
 * two sites feel like one.
 *
 * Nothing is persisted here. `router.replace` sends the navigation through the
 * next-intl proxy, which writes the `NEXT_LOCALE` cookie as it resolves the
 * new locale; the choice therefore survives a return visit without this
 * component touching storage. See proxy.ts.
 */
export function LanguageSwitcher() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchLocale = (next: string) => {
    // `replace`, not `push`: switching language is not a step in the visitor's
    // history, and a back button that returns to the other language reads as
    // the switch having failed.
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary sm:px-3.5"
      >
        {/* The locale code and the chevron already say what this is. The globe
            is reinforcement, and it is the first thing to go when the bar is
            competing with the lockup for width. */}
        <Globe className="hidden h-3.5 w-3.5 lg:block" />
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[150px] overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg"
        >
          {locales.map((candidate) => {
            const active = locale === candidate;
            return (
              <li key={candidate} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchLocale(candidate)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? "bg-primary/10 font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span>{LABEL[candidate] ?? candidate.toUpperCase()}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {candidate.toUpperCase()}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
