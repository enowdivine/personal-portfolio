import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  HIRE_SPECIALTIES,
  PROFILE,
  SKILLS,
  TESTIMONIALS,
  bulletsFor,
} from "@/lib/data";

/**
 * Programmatic hire-me pages. Each targets a distinct hire-me search query
 * (e.g. "senior Node.js engineer for hire", "Stripe consultant remote") and
 * pulls real experience bullets relevant to that role from EXPERIENCE.
 *
 * Add entries to HIRE_SPECIALTIES in lib/data.ts to generate more pages.
 */

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HIRE_SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const spec = HIRE_SPECIALTIES.find((s) => s.slug === slug);
  if (!spec) return {};
  return {
    title: spec.title,
    description: spec.metaDescription,
    alternates: {
      canonical: `https://enowdivine.net/hire/${spec.slug}`,
    },
    openGraph: {
      title: spec.title,
      description: spec.metaDescription,
      url: `https://enowdivine.net/hire/${spec.slug}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: spec.title,
      description: spec.metaDescription,
    },
  };
}

export default async function HirePage({ params }: PageProps) {
  const { slug } = await params;
  const spec = HIRE_SPECIALTIES.find((s) => s.slug === slug);
  if (!spec) notFound();

  const bullets = bulletsFor(spec.matchKeywords).slice(0, 8);
  const testimonial = TESTIMONIALS[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: PROFILE.name,
      jobTitle: spec.role,
      description: spec.metaDescription,
      url: `https://enowdivine.net/hire/${spec.slug}`,
      email: `mailto:${PROFILE.email}`,
      sameAs: [
        PROFILE.socials.github,
        PROFILE.socials.linkedin,
        PROFILE.socials.medium,
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-24 md:py-28">
          <nav
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">
              {PROFILE.name}
            </Link>{" "}
            / Hire / <span>{spec.role}</span>
          </nav>
          {/* Above the fold: CSS entrance only. The h1 is the LCP element on
              these pages, so it moves without fading. */}
          <span className="animate-rise font-mono text-[11px] uppercase tracking-widest text-primary block mb-8">
            Available for senior remote roles
          </span>
          <h1 className="animate-lift text-[clamp(2.25rem,5vw,4.25rem)] font-black leading-[0.95] tracking-tight text-foreground mb-6 max-w-4xl">
            {spec.title}
          </h1>
          <p
            className="animate-rise text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            style={{ animationDelay: "120ms" }}
          >
            {spec.lead}
          </p>

          <div
            className="animate-rise flex flex-wrap items-center gap-3 mt-10"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                `${spec.role} — enquiry`,
              )}`}
              className="lift inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
            <a
              href={PROFILE.resume}
              className="lift inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold hover:border-foreground"
            >
              Download CV
              <ArrowUpRight className="nudge-diag w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Relevant work */}
      {bullets.length > 0 ? (
        <section className="border-b border-border">
          <div className="container py-20">
            <Reveal
              as="h2"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
            >
              What that looks like in production
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-10"
            >
              {spec.bulletsIntro}
            </Reveal>
            {/* A single tall column: each item crosses the line on its own, so
                no stagger — a delay here would just read as lag. */}
            <ul className="space-y-6">
              {bullets.map((b, i) => (
                <Reveal
                  as="li"
                  key={`${b.company}-${i}`}
                  className="border-l-2 border-border pl-5"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-primary block mb-2">
                    {b.company}
                  </span>
                  <p className="text-base leading-relaxed">{b.bullet}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Skills */}
      <section className="border-b border-border">
        <div className="container py-20">
          <Reveal
            as="h2"
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-8"
          >
            Full stack
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILLS.map((group, i) => (
              <Reveal key={group.label} delay={(i % 2) * 130}>
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-3">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="text-sm px-3 py-1 border border-border rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial ? (
        <section className="border-b border-border">
          <div className="container py-20">
            <Reveal as="blockquote" distance="far" className="max-w-3xl">
              <p className="text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {testimonial.name}
                </span>{" "}
                | {testimonial.role}
              </footer>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section>
        <div className="container py-20 text-center">
          <Reveal as="h2" className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Need this on your team?
          </Reveal>
          <Reveal as="p" delay={120} className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Enow is currently accepting a small number of senior remote roles
            and consulting engagements. Get in touch — usually replies within
            one business day.
          </Reveal>
          <Reveal delay={240}>
            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                `${spec.role} — enquiry`,
              )}`}
              className="lift inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90"
            >
              <Mail className="w-4 h-4" />
              Contact {PROFILE.name.split(" ")[0]}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
