import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import { IconWhatsApp } from "@/components/icons";
import { AGENCY_CASE_STUDIES_URL, PROFILE, TESTIMONIALS } from "@/lib/data";
import { DOMAIN_TOPICS, ENGLISH, bulletsFor } from "@/lib/content";
import { alternatesFor, urlFor } from "@/lib/seo";

/**
 * Programmatic domain pages — one per topical area Enow Divine specialises in.
 * Same shape as /hire/[slug] but framed as consulting expertise rather than
 * hire-me. Targets searches like "payment reconciliation consultant",
 * "cross-border remittance engineer", "mobile money integration".
 *
 * Slugs are English in both locales and have no French variants, for the same
 * reason as the hire pages: they exist to be searched for, and these are
 * English search terms. /fr/domain/<slug> is the same URL with French copy.
 */

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/** Slugs only — Next pairs them with the parent [locale] segment's params. */
export function generateStaticParams() {
  return DOMAIN_TOPICS.map((topic) => ({ slug: topic.slug }));
}

function findTopic(slug: string) {
  return DOMAIN_TOPICS.find((topic) => topic.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const topic = findTopic(slug);
  if (!topic) return {};

  const t = await getTranslations({ locale, namespace: "DomainTopics" });
  const path = `/domain/${topic.slug}`;

  return {
    title: t(`${topic.slug}.title`),
    description: t(`${topic.slug}.metaDescription`),
    alternates: alternatesFor(locale, path),
    openGraph: {
      title: t(`${topic.slug}.title`),
      description: t(`${topic.slug}.metaDescription`),
      url: urlFor(locale, path),
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t(`${topic.slug}.title`),
      description: t(`${topic.slug}.metaDescription`),
    },
  };
}

export default async function DomainPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const topic = findTopic(slug);
  if (!topic) notFound();

  // Next 16 renders a layout and the page inside it as separate tasks, so the
  // locale the layout set is not reliably in scope here. Without this the page
  // falls back to a dynamic request read and stops being prerendered.
  setRequestLocale(locale);

  const t = await getTranslations("DomainPage");
  const tTopic = await getTranslations("DomainTopics");
  const tExperience = await getTranslations("Experience");

  const copy = (field: string) => tTopic(`${topic.slug}.${field}`);

  const bullets = bulletsFor(topic.matchKeywords).slice(0, 8);
  const testimonial = TESTIMONIALS[0];

  /* English subject, from the English catalogue — see the hire page. */
  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `${ENGLISH.domain(topic.slug).role} — enquiry`,
  )}`;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-sand via-background to-background">
        <div className="container py-16 md:py-20">
          <nav
            className="text-[13px] text-muted-foreground"
            aria-label={t("breadcrumbAria")}
          >
            <Link href="/" className="hover:text-primary">
              {PROFILE.name}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            {t("breadcrumb")}
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">{copy("role")}</span>
          </nav>

          <p className="animate-rise mt-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary card-rest">
            <span
              className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
              aria-hidden="true"
            />
            {t("badge")}
          </p>

          {/* Transform-only entrance: the h1 is the LCP element here. */}
          <h1 className="animate-lift mt-6 max-w-4xl text-[clamp(2.1rem,5.2vw,3.5rem)] font-extrabold text-foreground">
            {copy("title")}
          </h1>
          <p
            className="animate-rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "100ms" }}
          >
            {copy("lead")}
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/contact"
              className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground"
            >
              {t("ctaPrimary")}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 py-3.5 text-[15px] font-semibold text-white"
            >
              <IconWhatsApp className="h-[18px] w-[18px] shrink-0" />
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Track record ───────────────────────────────────────────────── */}
      {bullets.length > 0 ? (
        <section className="border-y border-border bg-sand">
          <div className="container py-20 md:py-24">
            <Reveal distance="far" className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("track.label")}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
                {t("track.title")}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                {copy("bulletsIntro")}
              </p>
            </Reveal>

            {/* A single tall column: each item crosses the line on its own, so
                no stagger — a delay here would just read as lag. */}
            <ul className="mt-12 space-y-4">
              {bullets.map((bullet) => (
                <Reveal
                  as="li"
                  key={`${bullet.jobId}-${bullet.bulletKey}`}
                  className="card-rest rounded-2xl border border-border bg-card p-6 md:p-7"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {bullet.company}
                  </span>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-foreground md:text-base">
                    {tExperience(
                      `jobs.${bullet.jobId}.bullets.${bullet.bulletKey}`,
                    )}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── Testimonial ────────────────────────────────────────────────── */}
      {testimonial ? (
        <section className="bg-background">
          <div className="container py-16 md:py-20">
            <Reveal
              as="figure"
              distance="far"
              className="card-rest mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 md:p-10"
            >
              {/* Shown verbatim in both locales — one person's own words. */}
              <blockquote
                lang="en"
                className="text-lg leading-relaxed text-foreground md:text-xl"
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption
                lang="en"
                className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground"
              >
                <span className="font-semibold text-foreground">
                  {testimonial.name}
                </span>{" "}
                · {testimonial.role}
              </figcaption>
            </Reveal>
          </div>
        </section>
      ) : null}

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
                href={mailto}
                className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t("cta.email")}
              </a>
            </div>
            <p className="mt-8 text-sm font-medium text-ink/75">
              {t("cta.caseStudiesPrefix")}{" "}
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
