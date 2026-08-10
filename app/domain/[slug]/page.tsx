import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  DOMAIN_TOPICS,
  PROFILE,
  TESTIMONIALS,
  bulletsFor,
} from "@/lib/data";

/**
 * Programmatic domain pages | one per topical area Enow specialises in.
 * Same shape as /hire/[slug] but framed as consulting expertise rather than
 * hire-me. Targets searches like "payment reconciliation consultant",
 * "cross-border remittance engineer", "mobile money integration".
 */

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOMAIN_TOPICS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const spec = DOMAIN_TOPICS.find((s) => s.slug === slug);
  if (!spec) return {};
  return {
    title: spec.title,
    description: spec.metaDescription,
    alternates: {
      canonical: `https://enowdivine.net/domain/${spec.slug}`,
    },
    openGraph: {
      title: spec.title,
      description: spec.metaDescription,
      url: `https://enowdivine.net/domain/${spec.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: spec.title,
      description: spec.metaDescription,
    },
  };
}

export default async function DomainPage({ params }: PageProps) {
  const { slug } = await params;
  const spec = DOMAIN_TOPICS.find((s) => s.slug === slug);
  if (!spec) notFound();

  const bullets = bulletsFor(spec.matchKeywords).slice(0, 8);
  const testimonial = TESTIMONIALS[0];

  return (
    <>
      <section className="border-b border-border">
        <div className="container py-24 md:py-28">
          <nav
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">
              {PROFILE.name}
            </Link>{" "}
            / Domain / <span>{spec.role}</span>
          </nav>
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-8">
            Consulting focus
          </span>
          <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] font-black leading-[0.95] tracking-tight text-foreground mb-6 max-w-4xl">
            {spec.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {spec.lead}
          </p>
        </div>
      </section>

      {bullets.length > 0 ? (
        <section className="border-b border-border">
          <div className="container py-20">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Track record
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-10">
              {spec.bulletsIntro}
            </p>
            <ul className="space-y-6">
              {bullets.map((b, i) => (
                <li
                  key={`${b.company}-${i}`}
                  className="border-l-2 border-border pl-5"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-primary block mb-2">
                    {b.company}
                  </span>
                  <p className="text-base leading-relaxed">{b.bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {testimonial ? (
        <section className="border-b border-border">
          <div className="container py-20">
            <blockquote className="max-w-3xl">
              <p className="text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {testimonial.name}
                </span>{" "}
                | {testimonial.role}
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      <section>
        <div className="container py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Building something in this space?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Enow takes on a small number of consulting engagements per quarter.
            Send the brief and expect a reply within one business day.
          </p>
          <a
            href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
              `${spec.role} — enquiry`,
            )}`}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90"
          >
            <Mail className="w-4 h-4" />
            Contact {PROFILE.name.split(" ")[0]}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
