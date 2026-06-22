import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { PROFILE, TESTIMONIALS } from "@/lib/data";

const AGENCY_URL = "https://saassimplified.net";
const AGENCY_PROJECTS_URL = `${AGENCY_URL}/projects`;

export default function Home() {

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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-8">
                Portfolio · {PROFILE.specialty}
              </span>

              <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-tight text-foreground mb-8">
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

            <div className="relative w-full max-w-[360px] mx-auto lg:mx-0">
              {/* Offset accent block */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 w-full h-full bg-primary/15 border border-primary/40"
              />

              {/* Image frame */}
              <div className="relative aspect-[3/4] border border-border overflow-hidden bg-muted">
                <Image
                  src="/avatar.jpg"
                  alt={PROFILE.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 360px, 360px"
                  className="object-cover"
                />

                {/* Corner brackets */}
                <span aria-hidden className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary" />
                <span aria-hidden className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-primary" />
                <span aria-hidden className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-primary" />
                <span aria-hidden className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary" />
              </div>

              {/* Metadata strip */}
              <div className="relative mt-3 border border-border bg-background p-3 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary leading-tight">
                    {PROFILE.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5 leading-tight">
                    {PROFILE.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    Available
                  </span>
                </div>
              </div>
            </div>
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
                Relaunching <span className="text-primary">UniAssist Africa</span> — pan-African
                university admissions, expanding from Cameroon to 54 countries.
              </p>
              <p>
                Running <span className="text-primary">SaaS Simplified</span> — a small senior
                agency for production SaaS work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work — lives on the agency site now, this page just points there. */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-3">
                Selected work
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4">
                Projects live on the agency site.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                Same person, same engineering work — but the products and client builds are showcased
                under SaaS Simplified, since that's where the work is delivered from. Cleaner story for
                everyone landing here.
              </p>
            </div>
            <a
              href={AGENCY_PROJECTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border hover:border-primary/40 hover:text-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors"
            >
              View projects on saassimplified.net
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
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
