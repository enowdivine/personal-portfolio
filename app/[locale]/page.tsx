import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  Globe,
  Mail,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/Reveal";
import { StackMarquee } from "@/components/StackMarquee";
import { IconGitHub, IconNpm, IconWhatsApp } from "@/components/icons";
import {
  AGENCY_CASE_STUDIES_URL,
  AGENCY_URL,
  PROFILE,
  SITE_URL,
  TESTIMONIALS,
} from "@/lib/data";
import { alternatesFor, urlFor } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const tProfile = await getTranslations({ locale, namespace: "Profile" });

  return {
    // `absolute`: the root layout's `%s · Enow Divine` template would otherwise
    // print the name twice, and this title already carries it.
    title: { absolute: tProfile("siteTitle") },
    description: t("meta.description"),
    alternates: alternatesFor(locale, ""),
    openGraph: {
      title: tProfile("siteTitle"),
      description: t("meta.description"),
      url: urlFor(locale, ""),
      locale,
    },
  };
}

/** What a client can actually buy, in the order a stranger reads them. Each
 *  one is a real engagement type detailed on /consulting — this strip is the
 *  short answer, that page is the long one. `key` indexes
 *  `HomePage.services.items`. */
const SERVICES = [
  { key: "payments", Icon: CreditCard },
  { key: "saas", Icon: Sparkles },
  { key: "mobile", Icon: Smartphone },
  { key: "sites", Icon: Globe },
] as const;

/** Recent, verifiable work. Each line links to something a client can open;
 *  the product names are proper nouns, so only the body copy is translated. */
const RECENT = [
  { key: "tyketz", name: "Tyketz", href: "https://tyketz.com" },
  { key: "esqs", name: "ES QS", href: "https://es-qs.com" },
  { key: "uniassist", name: "UniAssist Africa", href: "https://uniassist.africa" },
  { key: "agency", name: "SaaS Simplified", href: AGENCY_URL },
] as const;

/**
 * schema.org topic values, left in English in both locales on purpose: these
 * are not read by a visitor, they are matched by machines against an English
 * vocabulary, and a French "Systèmes de paiement" here matches nothing.
 */
const KNOWS_ABOUT = [
  "Payment Systems",
  "Money-Movement Correctness",
  "Distributed Systems",
  "Backend Architecture",
  "API Design",
  "Idempotent Webhooks",
  "Multi-Currency",
  "Stripe",
  "Mobile Money",
  "Microservices",
  "Node.js",
  "TypeScript",
  "Next.js",
  "React Native",
];

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  // Next 16 renders a layout and the page inside it as separate tasks, so the
  // locale the layout set is not reliably in scope here. Without this the page
  // falls back to a dynamic request read and stops being prerendered.
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const tProfile = await getTranslations("Profile");

  const location = tProfile("location");

  /* One canonical description of the person, on the one URL that is about him.
     It sits on this page rather than in the root layout so the /hire and
     /domain pages — which publish their own ProfilePage graph — are not also
     emitting a second, competing Person entity.

     Still ONE Person across both locales: `name`, the socials, the employer
     and the university are the same facts in French, and `url` points at this
     locale's own canonical so the node belongs to the page that carries it.
     Only the prose — `jobTitle` and `description` — follows the locale. */
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: tProfile("title"),
    description: tProfile("summary"),
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phoneE164,
    url: urlFor(locale, ""),
    image: `${SITE_URL}/avatar.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.city,
      addressCountry: PROFILE.countryCode,
    },
    sameAs: [
      PROFILE.socials.github,
      PROFILE.socials.linkedin,
      PROFILE.socials.medium,
    ],
    knowsAbout: KNOWS_ABOUT,
    worksFor: {
      "@type": "Organization",
      name: "SaaS Simplified",
      url: AGENCY_URL,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Buea",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────
          Two columns on desktop, stacked on a phone with the portrait LAST:
          the whole point of the order is that the three ways to start a
          conversation sit above the fold on a 667px screen. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand via-background to-background">
        <div className="container relative py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary card-rest">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
                </span>
                {t("hero.badge")}
              </p>

              {/* `animate-lift` — transform only, no delay. This is the LCP
                  element, and fading it in would push the LCP timestamp out by
                  the length of the animation.

                  `t.rich` rather than three concatenated strings: the amber
                  sweep falls on a different phrase in each language, and only
                  the translator of a whole sentence can decide which one. */}
              <h1 className="animate-lift mt-7 text-[clamp(2.1rem,5.2vw,3.5rem)] font-extrabold text-foreground">
                {t.rich("hero.title", {
                  swash: (chunks) => <span className="swash">{chunks}</span>,
                })}
              </h1>

              <p
                className="animate-rise mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-lg"
                style={{ animationDelay: "100ms" }}
              >
                {/* Deliberately short. On a 667px phone this paragraph is the
                    last thing between the headline and the three contact
                    buttons, and every extra line pushes one of them below the
                    fold. */}
                {t("hero.lede", { location })}
              </p>

              {/* The contact path, deliberately three doors wide: a form for
                  people who want to write it all down, WhatsApp for the local
                  and diaspora clients who live in it, email for everyone
                  else. */}
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
                <a
                  href={`mailto:${PROFILE.email}`}
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
                {(["reply", "timeZones", "scope"] as const).map((key) => (
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

            {/* Portrait. `animate-lift` rather than `animate-rise` for the same
                LCP reason as the headline: below `lg` this stacks under the
                copy, but on a wide screen it is the largest paint on the page
                and must not fade in. */}
            <div
              className="animate-lift relative mx-auto w-full max-w-md lg:max-w-none"
              style={{ animationDelay: "160ms" }}
            >
              <div
                aria-hidden
                className="hero-aura pointer-events-none absolute -inset-8 -z-10"
              />
              <figure className="card-rest overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/hero-bg.jpg"
                    alt={t("hero.portraitAlt", { name: PROFILE.name, location })}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 28rem, 36rem"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
                  <span className="text-sm font-semibold text-foreground">
                    {PROFILE.name}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {location}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ── What a client can buy ─────────────────────────────────────── */}
      <section className="border-y border-border bg-sand">
        <div className="container py-20 md:py-24">
          <Reveal distance="far" className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("services.label")}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.75rem)] font-extrabold text-foreground">
              {t("services.title")}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {t("services.lede")}
            </p>
          </Reveal>

          {/* Two columns, so the stagger is the column index rather than the
              item index — row-mates arrive together instead of accumulating
              lag down the grid. */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {SERVICES.map(({ key, Icon }, i) => (
              <Reveal key={key} delay={(i % 2) * 120} className="grid">
                <Link
                  href="/consulting"
                  className="lift card-rest flex gap-5 rounded-2xl border border-border bg-card p-7 hover:border-primary/40"
                >
                  <span
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-primary"
                    aria-hidden="true"
                  >
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                  </span>
                  <span className="block">
                    <span className="block text-lg font-bold text-foreground">
                      {t(`services.items.${key}.title`)}
                    </span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-muted-foreground">
                      {t(`services.items.${key}.body`)}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <Link
              href="/consulting"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-foreground"
            >
              {t("services.more")}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
            <Reveal distance="far">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("recent.label")}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
                {t("recent.title")}
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                {t("recent.lede")}
              </p>
              <a
                href={AGENCY_CASE_STUDIES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-foreground"
              >
                {t("recent.cta")}
                <ArrowUpRight className="nudge-diag h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {RECENT.map((item, i) => (
                <Reveal key={item.key} delay={(i % 2) * 120} className="grid">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lift card-rest flex flex-col rounded-2xl border border-border bg-card p-7 hover:border-primary/40"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-lg font-bold text-foreground">
                        {item.name}
                      </span>
                      <ArrowUpRight
                        className="nudge-diag h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-3 block text-[15px] leading-relaxed text-muted-foreground">
                      {t(`recent.items.${item.key}`)}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack ───────────────────────────────────────────────────────
          Immediately after the shipped products, and before anyone else's
          opinion of them: read in that order it answers "what are those built
          with", which is the next question a technical reader has. */}
      <StackMarquee />

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section className="border-y border-border bg-sand">
        <div className="container py-20 md:py-24">
          <Reveal distance="far" className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t("testimonials.label")}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
              {t("testimonials.title")}
            </h2>
          </Reveal>

          {/* Border warms on hover, but no lift: nothing in these cards is
              clickable, and a card that rises under the cursor promises a
              click that is not there.

              The quotes are NOT translated — see TESTIMONIALS in lib/data.ts.
              They are four people's own words, and a French paraphrase under
              someone's name and photograph is a sentence they never said. */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal
                as="figure"
                key={testimonial.name}
                delay={(i % 2) * 120}
                distance="far"
                className="card-rest flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/30"
              >
                <blockquote
                  lang="en"
                  className="flex-1 text-[15px] leading-relaxed text-foreground"
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  {testimonial.image && (
                    <Image
                      src={testimonial.image}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
                    />
                  )}
                  <span className="block">
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </span>
                    <span
                      lang="en"
                      className="mt-0.5 block text-[13px] text-muted-foreground"
                    >
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open source ─────────────────────────────────────────────────
          Deliberately one compact strip rather than the full-width flagship
          card it used to be. For a client it is evidence that the payment
          correctness claims above are real, which is worth a paragraph — it
          is not worth a screenful ahead of the work they can buy. */}
      <section className="bg-background">
        <div className="container py-16 md:py-20">
          <Reveal
            distance="far"
            className="card-rest grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12 md:p-10"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t("oss.label")}
              </p>
              <h2 className="mt-3 text-[clamp(1.4rem,3.2vw,1.9rem)] font-bold text-foreground">
                {t("oss.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {t("oss.body")}
              </p>
              <p className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary px-4 py-2 font-mono text-[13px] text-foreground">
                <span className="select-none text-primary" aria-hidden="true">
                  $
                </span>
                npm install @stateledger/core
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="https://github.com/enowdivine/stateledger"
                target="_blank"
                rel="noopener noreferrer"
                className="lift inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <IconGitHub className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="nudge-diag h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="https://www.npmjs.com/package/@stateledger/core"
                target="_blank"
                rel="noopener noreferrer"
                className="lift inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                <IconNpm className="h-4 w-4" />
                npm
                <ArrowUpRight className="nudge-diag h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────────────
          Amber ground with ink type — the one high-contrast band on the page,
          and the same closing gesture the agency homepage makes, so the two
          sites end the same way. */}
      <section className="relative overflow-hidden bg-amber">
        <div className="container relative py-20 md:py-24">
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
                href={`mailto:${PROFILE.email}`}
                className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {PROFILE.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
