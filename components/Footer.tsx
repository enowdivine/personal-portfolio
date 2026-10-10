"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUp, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import {
  IconGitHub,
  IconLinkedIn,
  IconMedium,
  IconWhatsApp,
} from "@/components/icons";
import { AGENCY_CASE_STUDIES_URL, AGENCY_URL, PROFILE } from "@/lib/data";

/** Icon links, in the order someone actually reaches for them: WhatsApp first
 *  because that is where most enquiries arrive, then the slower channels.
 *  `labelKey` indexes `Footer.socials` in messages. */
const SOCIALS = [
  { href: PROFILE.whatsapp, labelKey: "whatsapp", Icon: IconWhatsApp, external: true },
  { href: `mailto:${PROFILE.email}`, labelKey: "email", Icon: Mail, external: false },
  { href: `tel:${PROFILE.phoneE164}`, labelKey: "call", Icon: Phone, external: false },
  { href: PROFILE.socials.linkedin, labelKey: "linkedin", Icon: IconLinkedIn, external: true },
  { href: PROFILE.socials.github, labelKey: "github", Icon: IconGitHub, external: true },
  { href: PROFILE.socials.medium, labelKey: "medium", Icon: IconMedium, external: true },
] as const;

const SITE_LINKS = [
  { href: "/consulting", labelKey: "consulting" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tProfile = useTranslations("Profile");

  const scrollTop = () => {
    // CSS `scroll-behavior` cannot reach a scroll started from JS, so the
    // preference has to be read here or this stays smooth under reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    /* Dark ink ground, the same hue family as the body text two steps deeper,
       so this reads as the same design rather than a borrowed panel — and so
       the footer closes the page the way saassimplified.net's does. */
    <footer className="mt-auto bg-ink text-white">
      {/* Closing contact band. Every page on this site ends on a way to start
          a conversation; this is the backstop for the ones whose own CTA the
          visitor scrolled straight past. */}
      <div className="border-b border-ink-border">
        <div className="container py-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber">
                {t("availableLabel")}
              </p>
              <h2 className="mt-3 text-[clamp(1.5rem,3.6vw,2.1rem)] font-bold text-white">
                {t("ctaTitle")}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                {t("ctaBody")}
              </p>
            </Reveal>

            <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row md:justify-self-end">
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 py-3.5 text-[15px] font-semibold text-white"
              >
                <IconWhatsApp className="h-[18px] w-[18px] shrink-0" />
                {t("whatsapp")}
              </a>
              <Link
                href="/contact"
                className="lift inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 text-[15px] font-semibold text-ink"
              >
                {t("startProject")}
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <p className="font-display text-xl font-extrabold tracking-tight text-white">
              {PROFILE.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
              {tProfile("shortBio")}
            </p>
            <p className="mt-6 text-sm text-white/80">{tProfile("location")}</p>
            <p className="mt-1.5 text-sm text-white/80">{t("timeZones")}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                {t("thisSite")}
              </p>
              <ul className="space-y-3">
                {SITE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/80 hover:text-amber"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={PROFILE.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-amber"
                  >
                    {t("resume")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                {t("elsewhere")}
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={AGENCY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-amber"
                  >
                    SaaS Simplified
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={AGENCY_CASE_STUDIES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-amber"
                  >
                    {t("caseStudies")}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/enowdivine/stateledger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-amber"
                  >
                    stateledger
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                {t("reachHim")}
              </p>
              <ul className="flex flex-wrap gap-2">
                {SOCIALS.map(({ href, labelKey, Icon, external }) => {
                  const label = t(`socials.${labelKey}`);
                  return (
                    <li key={labelKey}>
                      <a
                        href={href}
                        aria-label={label}
                        title={label}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-border text-ink-muted transition-colors hover:border-amber hover:bg-amber hover:text-ink"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-sm text-white/80">{PROFILE.email}</p>
              <p className="mt-1.5 text-sm text-white/80">{PROFILE.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="container flex flex-col-reverse items-start justify-between gap-4 py-5 md:flex-row md:items-center">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} {PROFILE.name} · {tProfile("location")}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-2 rounded-full border border-ink-border px-4 py-2 text-xs font-semibold text-ink-muted transition-colors hover:border-amber hover:bg-amber hover:text-ink"
          >
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
            {t("top")}
          </button>
        </div>
      </div>
    </footer>
  );
}
