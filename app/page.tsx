import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { PROFILE, PROJECTS, TESTIMONIALS } from "@/lib/data";

export default function Home() {
  const featured = PROJECTS.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container py-24 md:py-32 relative">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-8">
            Portfolio · {PROFILE.specialty}
          </span>

          <h1 className="text-[clamp(2.75rem,7vw,5.75rem)] font-black leading-[0.92] tracking-tight text-foreground mb-8 max-w-4xl">
            Senior engineer building production SaaS and payments infrastructure.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            7+ years shipping production systems across fintech, ticketing, dating, and
            e-learning verticals. Founded SaaS Simplified in 2018. Available for senior
            remote roles and select consulting.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </Link>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-7 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Currently open to senior remote roles
            </span>
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="border-b border-border">
        <div className="container py-20">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Now / 2026
            </span>
            <div className="space-y-3 text-base text-foreground leading-relaxed max-w-2xl">
              <p>
                Building <span className="text-primary">EasyKingsPay v2</span> —
                cross-border remittance with mobile money payouts, live across 5
                corridors.
              </p>
              <p>
                Architecting microservices at <span className="text-primary">Impact Factors</span>{" "}
                and shipping NexTransfer at <span className="text-primary">Primus Learning</span>.
              </p>
              <p>
                Running <span className="text-primary">SaaS Simplified</span> — a small senior
                agency for production SaaS work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-3">
                Selected work
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Recent projects.
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              All work →
            </Link>
          </div>

          <div className="border-t border-border">
            {featured.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i + 1} />
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <Link
              href="/work"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              All work →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border">
        <div className="container py-24">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-12">
            What people say
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="border border-border p-8 flex flex-col"
              >
                <span className="font-mono text-3xl text-primary leading-none mb-4">
                  &ldquo;
                </span>
                <blockquote className="text-base text-foreground leading-relaxed mb-6 flex-1">
                  {t.quote}
                </blockquote>
                <figcaption className="border-t border-border pt-4 flex items-center gap-3">
                  {t.image && (
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border border-border shrink-0 grayscale"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end">
            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black tracking-tight text-foreground leading-[0.95]">
              Have a problem worth solving?
            </h2>
            <div className="flex flex-col items-start md:items-end gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Start a conversation →
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Or email {PROFILE.email}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const num = String(index).padStart(3, "0");

  return (
    <Wrapper
      {...wrapperProps}
      className="group block border-b border-border py-8 hover:bg-muted/30 transition-colors"
    >
      <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_120px_60px] gap-4 md:gap-6 items-center">
        <span className="font-mono text-xs text-primary">{num}</span>
        <div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">
            {project.tagline}
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {project.category}
        </span>
        <span className="font-mono text-xs text-muted-foreground flex items-center justify-between md:justify-end gap-2">
          {project.year}
          {project.url && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </span>
      </div>
    </Wrapper>
  );
}
