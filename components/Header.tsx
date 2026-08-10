"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";

type NavItem = { href: string; label: string; external?: boolean };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: PROFILE.socials.linkedin, label: "Writing", external: true },
  { href: "/consulting", label: "Consulting" },
  { href: "/contact", label: "Contact" },
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
  const [open, setOpen] = useState(false);
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
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-border">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg md:text-xl font-black tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary text-2xl leading-none">·</span>
            {PROFILE.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium px-3.5 py-2 text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[10px]">↗</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium px-3.5 py-2 text-foreground/70 hover:text-primary transition-colors"
                  style={isActive(item.href) ? { color: "var(--color-foreground)", fontWeight: 700 } : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — overlays page content instead of pushing it */}
      {open ? (
        <div
          id="mobile-nav"
          className="md:hidden absolute left-0 right-0 top-full border-b border-border bg-background shadow-lg"
        >
          <nav className="container py-3 flex flex-col">
            {NAV.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium py-3.5 px-1 border-b border-border last:border-b-0 text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xs">↗</span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium py-3.5 px-1 border-b border-border last:border-b-0 hover:text-primary transition-colors"
                  style={{
                    color: isActive(item.href)
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                  }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
