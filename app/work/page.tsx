import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across fintech, SaaS, mobile, and dev tools — production work from Enow Divine.",
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-24 md:py-28">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-6">
            Work
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.92] tracking-tight text-foreground mb-6 max-w-3xl">
            Selected projects across fintech, SaaS, and mobile.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            A curated set — the rest is under NDA or not worth shipping a case study for.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="border-b border-border">
        <div className="container py-16">
          <div className="border-t border-border">
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end">
            <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black tracking-tight text-foreground leading-[0.95]">
              Want to talk about something similar?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const num = String(index).padStart(3, "0");

  return (
    <Wrapper
      {...wrapperProps}
      className="group block border-b border-border py-10 hover:bg-muted/30 transition-colors"
    >
      <div className="grid grid-cols-1 md:grid-cols-[60px_1fr_140px_80px] gap-4 md:gap-6 items-start">
        <span className="font-mono text-xs text-primary pt-1">{num}</span>
        <div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
            {project.tagline}
          </p>
          <ul className="space-y-1.5 mb-4">
            {project.results.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary mt-0.5 shrink-0">→</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-wider border border-border px-2 py-0.5 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block">
            {project.category}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mt-2">
            {project.role}
          </span>
        </div>
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
