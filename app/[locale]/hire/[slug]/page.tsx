import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import { IconWhatsApp } from "@/components/icons";
import { PROFILE, SKILLS, TESTIMONIALS } from "@/lib/data";
import { ENGLISH, HIRE_SPECIALTIES, bulletsFor } from "@/lib/content";
import { alternatesFor, urlFor } from "@/lib/seo";

/**
 * Programmatic hire-me pages. Each targets a distinct hire-me search query
 * (e.g. "senior Node.js engineer for hire", "Stripe consultant remote") and
 * pulls real experience bullets relevant to that role from the work registry.
 *
 * Add entries to HIRE_SPECIALTIES in lib/content.ts — plus their copy under
 * `HireSpecialties` in both message files — to generate more pages.
 *
 * The SLUGS ARE ENGLISH IN BOTH LOCALES and there is no French variant of any
 * of them: these pages exist to answer English search queries, and nobody
 * types "recruter-un-ingenieur-node-js-senior" into Google. /fr/hire/<slug>
 * serves the same URL with French page copy, and the hreflang pair below says
 * exactly that. Only the keyword list stays English all the way through,
 * because it is matched against the English experience bullets — see
 * `bulletsFor`.
 *
 * The visual language is the same as the rest of the site, but the structure
 * is deliberately leaner: someone lands here from a search with one question,
 * so the page is evidence followed by a way to make contact, and nothing else.
 */

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Slugs only. Next pairs these with the parent [locale] segment's own params,
 * so eight specialties across two locales prerender as sixteen pages.
 */
export function generateStaticParams() {
  return HIRE_SPECIALTIES.map((specialty) => ({ slug: specialty.slug }));
}

/** The registered specialty for a slug, or undefined — never a cast. */
function findSpecialty(slug: string) {
  return HIRE_SPECIALTIES.find((specialty) => specialty.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const specialty = findSpecialty(slug);
  if (!specialty) return {};

  const t = await getTranslations({ locale, namespace: "HireSpecialties" });
  const path = `/hire/${specialty.slug}`;

  return {
    title: t(`${specialty.slug}.title`),
    description: t(`${specialty.slug}.metaDescription`),
    alternates: alternatesFor(locale, path),
    openGraph: {
      title: t(`${specialty.slug}.title`),
      description: t(`${specialty.slug}.metaDescription`),
      url: urlFor(locale, path),
      locale,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: t(`${specialty.slug}.title`),
      description: t(`${specialty.slug}.metaDescription`),
    },
  };
}

export default async function HirePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const specialty = findSpecialty(slug);
  if (!specialty) notFound();

  // Next 16 renders a layout and the page inside it as separate tasks, so the
  // locale the layout set is not reliably in scope here. Without this the page
  // falls back to a dynamic request read and stops being prerendered.
  setRequestLocale(locale);

  const t = await getTranslations("HirePage");
  const tSpecialty = await getTranslations("HireSpecialties");
  const tExperience = await getTranslations("Experience");
  const tSkills = await getTranslations("Skills");

  const copy = (field: string) => tSpecialty(`${specialty.slug}.${field}`);

  const bullets = bulletsFor(specialty.matchKeywords).slice(0, 8);
  const testimonial = TESTIMONIALS[0];

  const path = `/hire/${specialty.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: PROFILE.name,
      jobTitle: copy("role"),
      description: copy("metaDescription"),
      url: urlFor(locale, path),
      email: `mailto:${PROFILE.email}`,
      sameAs: [
        PROFILE.socials.github,
        PROFILE.socials.linkedin,
        PROFILE.socials.medium,
      ],
    },
  };

  /* English subject line on purpose: it is read in Divine's inbox, not on the
     page. Taken off the English catalogue rather than this locale's, so two
     enquiries about the same specialty arrive with the same subject whichever
     language the page was read in. */
  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `${ENGLISH.hire(specialty.slug).role} — enquiry`,
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="lift inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-card px-7 py-3.5 text-[15px] font-semibold text-foreground hover:border-primary hover:text-primary"
            >
              {t("cv")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Relevant work ──────────────────────────────────────────────── */}
      {bullets.length > 0 ? (
        <section className="border-y border-border bg-sand">
          <div className="container py-20 md:py-24">
            <Reveal distance="far" className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("evidence.label")}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
                {t("evidence.title")}
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

      {/* ── Stack ──────────────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container py-20 md:py-24">
          <Reveal distance="far" className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("stack.label")}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
              {t("stack.title")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SKILLS.map((group, i) => (
              <Reveal
                key={group.id}
                delay={(i % 2) * 120}
                className="card-rest rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {tSkills(group.id)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 text-[13px] text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────────────────── */}
      {testimonial ? (
        <section className="border-y border-border bg-sand">
          <div className="container py-16 md:py-20">
            <Reveal
              as="figure"
              distance="far"
              className="card-rest mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 md:p-10"
            >
              {/* `lang="en"` on both: this is one person's own wording, shown
                  verbatim in both locales rather than paraphrased into French
                  under his name. */}
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
            {/* `roleLower` rather than `role.toLowerCase()`: lowercasing by
                machine turns "Senior Node.js Engineer" into "node.js" in both
                languages, and French capitalises role titles differently
                again. Each locale writes the inline form itself. */}
            <h2 className="text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[1.04] text-ink">
              {t("cta.title", { role: copy("roleLower") })}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
              {t("cta.body")}
            </p>
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
              {(["years", "timeZones", "scope"] as const).map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/10"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 text-ink" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {t(`cta.points.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
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
              {t.rich("cta.orSee", {
                link: (chunks) => (
                  <Link
                    href="/consulting"
                    className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
