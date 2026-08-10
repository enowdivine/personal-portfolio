"use client";

import { PROFILE } from "@/lib/data";

export function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Contact
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="block text-sm text-foreground hover:text-primary transition-colors mb-1"
            >
              {PROFILE.email}
            </a>
            <p className="text-sm text-muted-foreground">{PROFILE.location}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Elsewhere
            </p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  Medium
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Open source
            </p>
            <a
              href="https://github.com/enowdivine/stateledger"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary translate-y-[-1px]" />
              stateledger
              <span className="font-mono text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                v0.3.0
              </span>
            </a>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">
              Database-backed state machine on npm
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Resume
            </p>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Download PDF →
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex justify-between items-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
