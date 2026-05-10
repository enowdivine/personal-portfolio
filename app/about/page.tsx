import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { PROFILE, EXPERIENCE, SKILLS, EDUCATION } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Enow Divine — senior software engineer specializing in SaaS and payments infrastructure. 7+ years of production experience.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-24 md:py-28">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-6">
            About
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.92] tracking-tight text-foreground mb-6 max-w-3xl">
            Senior backend engineer with deep payments expertise.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {PROFILE.summary}
          </p>
        </div>
      </section>

      {/* Bio + facts */}
      <section className="border-b border-border">
        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            <div className="space-y-5 text-base text-foreground leading-relaxed max-w-2xl">
              <p>
                Enow Divine is a senior software engineer based in{" "}
                <span className="text-primary">{PROFILE.location}</span>, building
                production SaaS and payments infrastructure for clients across the US,
                Europe, and Africa. Started freelancing in 2018, formalized into a small
                studio (SaaS Simplified) shortly after.
              </p>
              <p>
                Specializes in <span className="text-primary">backend systems</span>:
                microservices, REST and GraphQL APIs, payment gateway integrations,
                multi-currency systems. Equally comfortable across the stack — React,
                Next.js, React Native — when the work calls for it.
              </p>
              <p>
                Has shipped 20+ production projects across fintech, ticketing, e-commerce,
                e-learning, and on-demand services. Currently embedded with three product
                teams in parallel: <span className="text-primary">Impact Factors</span> (US),{" "}
                <span className="text-primary">Primus Learning</span> (US), and{" "}
                <span className="text-primary">Tando Dating</span> (Switzerland) — while
                running SaaS Simplified on the side.
              </p>
              <p>
                Open to senior remote roles where the work is technically meaningful, the
                team is competent, and the scope is real.
              </p>
            </div>

            <aside className="space-y-6">
              <div className="border border-border p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Quick facts
                </p>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Experience
                    </dt>
                    <dd className="text-foreground">7+ years</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Specialty
                    </dt>
                    <dd className="text-foreground">SaaS · Payments · Microservices</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Based
                    </dt>
                    <dd className="text-foreground">{PROFILE.location}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Time zones served
                    </dt>
                    <dd className="text-foreground">US · EU · Africa</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Status
                    </dt>
                    <dd className="text-foreground flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                      Open to senior roles
                    </dd>
                  </div>
                </dl>
              </div>

              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between border border-border p-4 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <span className="font-semibold">Download full resume</span>
                <Download className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="mb-16 max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-3">
              Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Where the work has happened.
            </h2>
          </div>

          <div className="border border-border divide-y divide-border">
            {EXPERIENCE.map((job, i) => (
              <article
                key={`${job.company}-${i}`}
                className="grid grid-cols-1 md:grid-cols-[60px_1fr] gap-4 md:gap-8 p-8"
              >
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-xl font-black tracking-tight text-foreground">
                      {job.company}
                      {job.current && (
                        <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-primary align-middle">
                          · Active
                        </span>
                      )}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">
                    {job.role} · {job.location}
                  </p>
                  <ul className="space-y-2">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary mt-0.5 shrink-0">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="mb-12 max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-3">
              Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Tools of the trade.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {SKILLS.map((group, i) => (
              <div
                key={group.label}
                className={`p-6 border-b border-border md:border-b ${
                  i % 2 === 0 ? "md:border-r" : ""
                } ${i >= SKILLS.length - 2 ? "md:border-b-0" : ""}`}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs border border-border px-2.5 py-1 text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-b border-border">
        <div className="container py-20">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Education
            </span>
            <div>
              <h3 className="text-xl font-black tracking-tight text-foreground mb-1">
                {EDUCATION.degree}
              </h3>
              <p className="text-sm text-muted-foreground">
                {EDUCATION.institution} · <span className="font-mono">{EDUCATION.date}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end">
            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black tracking-tight text-foreground leading-[0.95]">
              Have a role or project in mind?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
