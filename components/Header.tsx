"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { IconWhatsApp } from "@/components/icons";
import { PROFILE } from "@/lib/data";

/** `labelKey` indexes the `Header` namespace; the href is locale-agnostic. */
type NavItem = { href: string; labelKey: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/consulting", labelKey: "consulting" },
  { href: "/about", labelKey: "about" },
  { href: PROFILE.socials.linkedin, labelKey: "writing", external: true },
];

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Header() {
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);
  /* next-intl's `usePathname`, not Next's: it returns the path WITHOUT the
     locale prefix, so `isActive` compares "/about" on both /about and
     /fr/about. Next's own hook would return "/fr/about" and no nav item would
     ever light up in French. */
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-foreground hover:text-primary"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-amber"
            />
            {PROFILE.name}
          </Link>

          {/* Desktop nav. The active item gets a soft bronze-tinted pill and
              hover previews it at lower strength, so the two states are one
              gesture at two intensities — the same nav treatment the agency
              site uses. */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/[0.06] hover:text-foreground"
                >
                  {t(item.labelKey)}
                  <span aria-hidden="true" className="text-[10px]">↗</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-primary/[0.06] hover:text-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* The switcher sits ahead of the contact affordances: a visitor
                who cannot read the bar needs it before anything else in the
                bar is useful to them. */}
            <LanguageSwitcher />
            {/* WhatsApp sits in the bar itself, not only in the footer: it is
                the channel most of the local and diaspora enquiries actually
                arrive on. Icon-only below `lg` so the row never crowds. */}
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsappAria")}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-whatsapp hover:border-whatsapp hover:bg-whatsapp hover:text-white sm:inline-flex"
            >
              <IconWhatsApp className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="lift hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-flex"
            >
              {t("startProject")}
              <ArrowRight className="nudge h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:border-primary hover:text-primary md:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown — overlays page content instead of pushing it */}
      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full border-b border-border bg-background shadow-lg md:hidden"
        >
          <nav className="container flex flex-col py-3">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border-b border-border px-1 py-3.5 text-base font-medium text-muted-foreground last:border-b-0 hover:text-primary"
                >
                  {t(item.labelKey)}
                  <span aria-hidden="true" className="text-xs">↗</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`border-b border-border px-1 py-3.5 text-base font-medium ${
                    isActive(item.href)
                      ? "font-semibold text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ),
            )}
            {/* The two contact doors, repeated inside the drawer: on a phone
                the header's own chips are hidden behind the hamburger, and a
                menu that cannot start a conversation is a dead end. */}
            <div className="mt-4 flex flex-col gap-3 pb-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                {t("startProject")}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white"
              >
                <IconWhatsApp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
