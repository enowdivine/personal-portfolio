import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import { IconWhatsApp } from "@/components/icons";
import {
  AGENCY_CASE_STUDIES_URL,
  ENGAGEMENTS,
  type EngagementId,
  PROFILE,
} from "@/lib/data";
import { alternatesFor, urlFor } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/consulting";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConsultingPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: alternatesFor(locale, PATH),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: urlFor(locale, PATH),
      locale,
    },
  };
}

/**
 * The photograph for each engagement card, by engagement id.
 *
 * The engagements themselves — their order, their ids and the English `type`
 * string that travels in the `?type=` link — are the closed set in
 * lib/data.ts, and every word on the card is `Engagements.<id>.*` in messages.
 * All that is left here is the artwork, which is language-neutral.
 */
const IMAGES: Record<EngagementId, string> = {
  payments:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop",
  sites:
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80&auto=format&fit=crop",
  saas: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
  mobile:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=80&auto=format&fit=crop",
  ai: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
  advisory:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80&auto=format&fit=crop",
};

/** Every engagement publishes exactly six steps and six deliverables. */
const PROCESS_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;
const DELIVERABLE_KEYS = ["d1", "d2", "d3", "d4", "d5", "d6"] as const;

const HERO_POINTS = ["proposal", "start", "warranty"] as const;
const WORKING_ITEMS = ["async", "channel", "written", "rhythm"] as const;
const STEPS = ["intake", "proposal", "start"] as const;
const FAQ = [
  "scope",
  "advisoryToBuild",
  "who",
  "nda",
  "speed",
  "capacity",
] as const;

export default async function ConsultingPage({ params }: PageProps) {
  const { locale } = await params;
  // Next 16 renders a layout and the page inside it as separate tasks, so the
  // locale the layout set is not reliably in scope here. Without this the page
  // falls back to a dynamic request read and stops being prerendered.
  setRequestLocale(locale);

  const t = await getTranslations("ConsultingPage");
  const tEngagement = await getTranslations("Engagements");

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────
          The contact path is in the hero, not only at the bottom: a CTO who
          has already decided should not have to scroll six engagement types
          to find out how to start. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand via-background to-background">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="animate-rise text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("hero.label")}
            </p>
            {/* Transform-only entrance: this is the LCP element. */}
            <h1 className="animate-lift mt-5 text-[clamp(2.1rem,5.4vw,3.6rem)] font-extrabold text-foreground">
              {t.rich("hero.title", {
                swash: (chunks) => <span className="swash">{chunks}</span>,
              })}
            </h1>
            <p
              className="animate-rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-lg"
              style={{ animationDelay: "100ms" }}
            >
              {t("hero.lede")}
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "200ms" }}
            >
              <Link
                href="/contact"
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-[15px] font-semibold text-white"
              >
                <IconWhatsApp className="h-[18px] w-[18px] shrink-0" />
                {t("hero.ctaWhatsapp")}
              </a>
              {/* The mailto subject stays English in both locales: it lands in
                  Divine's inbox, not on the page. */}
              <a
                href={`mailto:${PROFILE.email}?subject=Consulting%20enquiry`}
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-card px-7 py-3.5 text-[15px] font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t("hero.ctaEmail")}
              </a>
            </div>

            <ul
              className="animate-rise mt-9 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:flex-wrap sm:gap-x-7"
              style={{ animationDelay: "280ms" }}
            >
              {HERO_POINTS.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {t(`hero.points.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Engagement types ───────────────────────────────────────────── */}
      <section className="border-y border-border bg-sand">
        <div className="container py-20 md:py-24">
          <div className="mb-14 grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <Reveal distance="far">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("types.label")}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.75rem)] font-extrabold text-foreground">
                {t("types.title")}
              </h2>
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="self-end text-[15px] leading-relaxed text-muted-foreground md:text-base"
            >
              {t("types.lede")}
            </Reveal>
          </div>

          {/* One card per screenful, so no stagger — each arrives on its own. */}
          <div className="space-y-6">
            {ENGAGEMENTS.map((engagement, index) => {
              const num = String(index + 1).padStart(2, "0");
              return (
                <Reveal
                  as="article"
                  key={engagement.id}
                  distance="far"
                  className="card-rest overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-border bg-muted">
                    <Image
                      src={IMAGES[engagement.id]}
                      alt=""
                      fill
                      sizes="(max-width: 1280px) 100vw, 1232px"
                      className="object-cover"
                    />
                    {/* Warm ink veil so the white label stays legible whatever
                        the photo underneath is doing. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                    />
                    {/* The number only. The title is the h3 immediately below,
                        and printing it twice made every card open by saying its
                        own name twice. */}
                    <span className="absolute bottom-4 left-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-[13px] font-bold text-amber backdrop-blur-sm">
                      {num}
                    </span>
                  </div>

                  <div className="p-7 md:p-10">
                    <h3 className="text-2xl font-bold text-foreground md:text-[28px]">
                      {tEngagement(`${engagement.id}.name`)}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                      {tEngagement(`${engagement.id}.description`)}
                    </p>

                    <div className="mt-8 rounded-2xl border border-border bg-sand p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                        {t("card.howItStarts")}
                      </p>
                      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-foreground">
                        {tEngagement(`${engagement.id}.howItStarts`)}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-2 md:gap-12">
                      <div>
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {t("card.process")}
                        </p>
                        <ol className="space-y-3">
                          {PROCESS_KEYS.map((key, i) => (
                            <li
                              key={key}
                              className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                            >
                              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                                {i + 1}
                              </span>
                              <span>
                                {tEngagement(`${engagement.id}.process.${key}`)}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {t("card.deliverables")}
                        </p>
                        <ul className="space-y-3">
                          {DELIVERABLE_KEYS.map((key) => (
                            <li
                              key={key}
                              className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                            >
                              <span
                                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10"
                                aria-hidden="true"
                              >
                                <Check
                                  className="h-3 w-3 text-primary"
                                  strokeWidth={3}
                                />
                              </span>
                              <span>
                                {tEngagement(
                                  `${engagement.id}.deliverables.${key}`,
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-8">
                      {/* `?type=` carries the ENGLISH engagement type, not the
                          translated name: /contact validates the value against
                          the closed set in lib/data.ts and mails it on as the
                          enquiry's subject, and the links already published
                          carry these exact strings. The button's own wording is
                          a per-engagement message, because "Start a {name}
                          project" cannot be assembled from parts in French. */}
                      <Link
                        href={`/contact?type=${encodeURIComponent(engagement.type)}`}
                        className="lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                      >
                        {tEngagement(`${engagement.id}.cta`)}
                        <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
                      </Link>
                      <a
                        href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`${engagement.type} enquiry`)}`}
                        className="lift inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        {t("card.emailAbout")}
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Working together ───────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container py-20 md:py-24">
          <div className="mb-12 grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <Reveal distance="far">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("working.label")}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
                {t("working.title")}
              </h2>
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="self-end text-[15px] leading-relaxed text-muted-foreground md:text-base"
            >
              {t("working.lede")}
            </Reveal>
          </div>

          {/* Two columns, so the delay is the column index rather than the
              item index — row-mates lead and follow, rows do not accumulate
              lag. */}
          <div className="grid gap-5 md:grid-cols-2">
            {WORKING_ITEMS.map((key, i) => (
              <Reveal
                key={key}
                delay={(i % 2) * 120}
                className="card-rest rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="text-lg font-bold text-foreground">
                  {t(`working.items.${key}.title`)}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                  {t(`working.items.${key}.body`)}
                </p>
              </Reveal>
            ))}
          </div>

          {/* "Your repo" above raises the obvious question of what ends up in
              it. The landing page already answers that in full, so this is a
              link to that section rather than a second copy of it. */}
          <Reveal className="mt-8">
            <Link
              href="/#stack"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-foreground"
            >
              {t("working.stackLink")}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Getting started ────────────────────────────────────────────── */}
      <section className="border-y border-border bg-sand">
        <div className="container py-20 md:py-24">
          <Reveal distance="far" className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("steps.label")}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
              {t("steps.title")}
            </h2>
          </Reveal>

          {/* Three across on desktop, so they arrive left to right. */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((key, i) => (
              <Reveal
                key={key}
                delay={i * 120}
                className="card-rest rounded-2xl border border-border bg-card p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-card font-display text-base font-extrabold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {t(`steps.items.${key}.title`)}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                  {t(`steps.items.${key}.body`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
            <Reveal distance="far">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("faq.label")}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
                {t("faq.title")}
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                {t("faq.lede")}
              </p>
            </Reveal>

            <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {FAQ.map((key, i) => (
                <Reveal key={key} delay={(i % 2) * 120}>
                  <h3 className="text-base font-bold text-foreground">
                    {t(`faq.items.${key}.q`)}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {t(`faq.items.${key}.a`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-amber">
        <div className="container py-20 md:py-24">
          <Reveal className="max-w-3xl">
            <h2 className="text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.04] text-ink">
              {t("cta.title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
              {t("cta.body")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white"
              >
                {t("cta.primary")}
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink"
              >
                <IconWhatsApp className="h-[18px] w-[18px] shrink-0" />
                {t("cta.whatsapp")}
              </a>
            </div>
            <p className="mt-8 text-sm font-medium text-ink/75">
              {t("cta.emailPrefix")}{" "}
              <a
                href={`mailto:${PROFILE.email}?subject=Consulting%20enquiry`}
                className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {PROFILE.email}
              </a>
              . {t("cta.caseStudiesPrefix")}{" "}
              <a
                href={AGENCY_CASE_STUDIES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                saassimplified.net
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
