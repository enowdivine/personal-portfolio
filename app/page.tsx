import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { PROFILE, TESTIMONIALS } from "@/lib/data";

const AGENCY_URL = "https://saassimplified.net";
const AGENCY_PROJECTS_URL = `${AGENCY_URL}/case-studies`;

export default function Home() {

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        {/* Background portrait | dark scrim so foreground text stays legible */}
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right hidden md:block -z-10"
        />
        {/* Legibility scrims | strong on the left (where headline sits), fading right */}
        <div
          aria-hidden
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50 pointer-events-none -z-10"
        />
        {/* Warm brand tint */}
        <div
          aria-hidden
          className="hidden md:block absolute inset-0 bg-primary/[0.04] pointer-events-none -z-10"
        />
        {/* Existing grid pattern (kept for texture) */}
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
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-8">
              Portfolio · {PROFILE.specialty}
            </span>

            <h1 className="text-[clamp(2rem,4.25vw,3.5rem)] font-black leading-[1.05] tracking-tight text-foreground mb-8 max-w-2xl">
              Senior software engineer building SaaS, payment integrations, and microservices at scale.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
              7+ years building the payment and correctness layers behind fintech, remittance, and
              SaaS products used across the US, EU, and Africa. Founded SaaS Simplified in 2018.
              Available for senior remote roles and select consulting.
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
        </div>
      </section>

      {/* Open source — flagship project */}
      <section className="border-b border-border relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--color-primary) 0, transparent 50%)",
          }}
        />
        <div className="container py-24 md:py-28 relative">
          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-14">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-6">
                Open source
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                Currently maintaining.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                Not a claim on a resume — code you can pull down, read, and depend on.
                Shipped, versioned, and used in production.
              </p>
            </div>
          </div>

          {/* stateledger card */}
          <article className="relative border border-border bg-background hover:border-primary/40 transition-colors group">
            {/* Top strip */}
            <div className="flex flex-wrap items-center justify-between border-b border-border px-6 md:px-10 py-4 gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  OSS · Node · TypeScript
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                v0.3.0 · MIT
              </span>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-0">
              {/* Main column */}
              <div className="p-6 md:p-10">
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-3 leading-none">
                  stateledger
                </h3>
                <p className="text-lg md:text-xl text-foreground/85 leading-snug mb-6 max-w-2xl">
                  Database-backed state machine for payment workflows.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
                  A TypeScript-first state machine library that handles concurrent
                  webhooks, idempotency, and audit-traceable transitions at the database
                  level. Ships as three focused packages: core, Prisma adapter, and Drizzle
                  adapter.
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Drizzle"].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs border border-border px-2.5 py-1 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Install command */}
                <div className="inline-flex items-center gap-3 border border-border bg-muted/30 px-4 py-2.5 mb-8 max-w-full overflow-x-auto">
                  <span className="font-mono text-sm text-primary select-none shrink-0">$</span>
                  <code className="font-mono text-sm text-foreground whitespace-nowrap">
                    npm install @stateledger/core
                  </code>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/enowdivine/stateledger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.96.11-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .98-.32 3.21 1.18a11.11 11.11 0 0 1 5.83 0c2.23-1.5 3.21-1.18 3.21-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    View on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://www.npmjs.com/package/@stateledger/core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
                    </svg>
                    View on npm
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Meta sidebar */}
              <aside className="border-t border-border lg:border-t-0 lg:border-l lg:border-border p-6 md:p-10 bg-muted/[0.15] flex flex-col justify-between gap-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                    Packages
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-foreground truncate">@stateledger/core</span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0">logic</span>
                    </li>
                    <li className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-foreground truncate">@stateledger/prisma</span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0">adapter</span>
                    </li>
                    <li className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-foreground truncate">@stateledger/drizzle</span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0">adapter</span>
                    </li>
                    <li className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-foreground truncate">@stateledger/memory</span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0">test</span>
                    </li>
                  </ul>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Solves
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0">→</span>
                      <span>Concurrent webhooks racing on the same order</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0">→</span>
                      <span>Duplicate provider notifications counted twice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0">→</span>
                      <span>Missing audit trail when the state changed</span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </article>
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
                Shipped{" "}
                <a
                  href="https://tyketz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Tyketz
                </a>{" "}
                — event ticketing platform for African organizers, with mobile money
                checkout, QR ticketing, and organizer dashboards.
              </p>
              <p>
                Just shipped{" "}
                <a
                  href="https://es-qs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-4"
                >
                  ES QS
                </a>{" "}
                — a UK quantity surveying practice&rsquo;s new marketing site with
                services, projects, and a lead-capture enquiry flow.
              </p>
              <p>
                Building{" "}
                <a
                  href="https://uniassist.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-4"
                >
                  UniAssist Africa
                </a>{" "}
                — pre-launch admissions platform being built for an established admissions
                organization, expanding their reach from Cameroon into 10 African countries.
              </p>
              <p>
                Running{" "}
                <a
                  href="https://saassimplified.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-4"
                >
                  SaaS Simplified
                </a>{" "}
                — a small senior agency for production SaaS work.
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
