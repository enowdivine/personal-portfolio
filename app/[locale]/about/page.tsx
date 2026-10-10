import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import { SkillsGrid } from "@/components/SkillsGrid";
import { IconWhatsApp } from "@/components/icons";
import { PROFILE } from "@/lib/data";
import { EXPERIENCE, bulletKeys } from "@/lib/content";
import { alternatesFor, urlFor } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/about";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    // Plain, not `absolute`: the root layout's `%s · Enow Divine` template is
    // exactly what this short title wants.
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: alternatesFor(locale, PATH),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: urlFor(locale, PATH),
      locale,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  // Next 16 renders a layout and the page inside it as separate tasks, so the
  // locale the layout set is not reliably in scope here. Without this the page
  // falls back to a dynamic request read and stops being prerendered.
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const tProfile = await getTranslations("Profile");
  const tExperience = await getTranslations("Experience");
  const tEducation = await getTranslations("Education");

  const location = tProfile("location");

  /* Reused by all four story paragraphs: the bronze emphasis is the same
     gesture every time, and the phrase it lands on is chosen inside the
     translated sentence rather than by splicing strings around it. */
  const mark = (chunks: React.ReactNode) => (
    <strong className="font-semibold text-primary">{chunks}</strong>
  );

  const facts = [
    { key: "experience", value: t("facts.experience.value") },
    { key: "specialty", value: t("facts.specialty.value") },
    { key: "based", value: location },
    { key: "timeZones", value: t("facts.timeZones.value") },
    {
      key: "education",
      value: `${tEducation("degree")}, ${tEducation("institution")}`,
    },
  ] as const;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-sand via-background to-background">
        <div className="container py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div>
              <p className="animate-rise text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("hero.label")}
              </p>
              {/* Transform-only entrance: the LCP element on this page. */}
              <h1 className="animate-lift mt-5 text-[clamp(2.1rem,5.4vw,3.5rem)] font-extrabold text-foreground">
                {t("hero.title")}
              </h1>
              <p
                className="animate-rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-lg"
                style={{ animationDelay: "100ms" }}
              >
                {tProfile("summary")}
              </p>
            </div>

            {/* `animate-lift`, not `animate-rise`: below `lg` this column
                stacks under the headline and the portrait becomes the largest
                paint on the page, so fading it in would move LCP by the whole
                animation. Transform-only keeps the pixels in frame one. */}
            <div
              className="animate-lift mx-auto w-full max-w-[340px] lg:mx-0"
              style={{ animationDelay: "180ms" }}
            >
              <figure className="card-rest overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/avatar.jpg"
                    alt={PROFILE.name}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-border px-5 py-4">
                  <p className="text-sm font-semibold text-foreground">
                    {PROFILE.name}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">
                    {tProfile("title")} · {location}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bio + facts ────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-sand">
        <div className="container py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            {/* One reveal for the whole prose column, not one per paragraph.
                At 30px and 680ms, four long paragraphs sliding in sequence is
                fussier than it is alive — the motion belongs to the block. */}
            <Reveal
              distance="far"
              className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground"
            >
              <p>{t.rich("story.p1", { mark, location })}</p>
              <p>{t.rich("story.p2", { mark })}</p>
              <p>{t.rich("story.p3", { mark })}</p>
              <p>{t("story.p4")}</p>
            </Reveal>

            <aside className="space-y-5">
              <Reveal
                delay={120}
                className="card-rest rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("facts.label")}
                </p>
                <dl className="mt-4 space-y-4 text-sm">
                  {facts.map((fact) => (
                    <div key={fact.key}>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {t(`facts.${fact.key}.term`)}
                      </dt>
                      <dd className="mt-0.5 text-foreground">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={240} className="space-y-3">
                <Link
                  href="/contact"
                  className="lift inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={PROFILE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t("ctaResume")}
                </a>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container py-20 md:py-24">
          <Reveal distance="far" className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("experience.label")}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
              {t("experience.title")}
            </h2>
          </Reveal>

          {/* No stagger: these rows are tall enough to cross the line one at a
              time, and a delay on an element that already arrived alone just
              reads as lag. */}
          <div className="mt-12 space-y-5">
            {EXPERIENCE.map((job) => (
              <Reveal
                as="article"
                key={job.id}
                distance="far"
                className="card-rest rounded-2xl border border-border bg-card p-7 md:p-8"
              >
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {job.company}
                    {job.current && (
                      <span className="ml-3 align-middle rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                        {t("experience.active")}
                      </span>
                    )}
                  </h3>
                  <span className="text-[13px] font-medium text-muted-foreground">
                    {tExperience(`jobs.${job.id}.period`)}
                  </span>
                </div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {tExperience(`jobs.${job.id}.role`)} ·{" "}
                  {tExperience(`jobs.${job.id}.location`)}
                </p>
                <ul className="space-y-3">
                  {bulletKeys(job.id).map((key) => (
                    <li
                      key={key}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span>{tExperience(`jobs.${job.id}.bullets.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ────────────────────────────────────────────────────────
          Was five bare pill-lists in the pre-redesign treatment. Now the same
          chip vocabulary as the homepage marquee — brand marks and all — but
          standing still, because this is the page people read slowly. */}
      <section className="border-y border-border bg-sand">
        <div className="container py-20 md:py-24">
          <Reveal distance="far" className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("tools.label")}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
              {t("tools.title")}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {t("tools.lede")}
            </p>
          </Reveal>

          <div className="mt-12">
            <SkillsGrid />
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
