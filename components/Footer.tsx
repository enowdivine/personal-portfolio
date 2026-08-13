"use client";

import { Mail, Phone } from "lucide-react";
import { PROFILE } from "@/lib/data";

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.96.11-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .98-.32 3.21 1.18a11.11 11.11 0 0 1 5.83 0c2.23-1.5 3.21-1.18 3.21-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}
function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5l-.57-.02c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.5.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.11.57-.08 1.75-.71 2-1.4.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Zm-5.44 7.44h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.21-3.73.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.5-5.24c0-5.46 4.44-9.9 9.88-9.9 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.46-4.45 9.87-9.9 9.87ZM20.52 3.45A11.83 11.83 0 0 0 12.05 0C5.5 0 .1 5.4.1 12a11.9 11.9 0 0 0 1.6 5.94L0 24l6.24-1.63a11.86 11.86 0 0 0 5.7 1.45h.01c6.55 0 11.94-5.4 11.94-11.98 0-3.19-1.24-6.19-3.5-8.44Z" />
    </svg>
  );
}
function IconMedium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42ZM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75Z" />
    </svg>
  );
}

export function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border mt-auto">
      <div className="container py-14">
        {/* Top row: brand + contact icons */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 mb-12 items-start md:items-end">
          <div>
            <p className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-2">
              {PROFILE.name}
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              Senior software engineer. Available for select projects and consulting engagements.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 text-left md:text-right">
              Reach me
            </p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Email"
                  title="Email"
                  className="inline-flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phoneE164}`}
                  aria-label="Call"
                  title="Call"
                  className="inline-flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="inline-flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <IconWhatsApp className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="inline-flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <IconGitHub className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="inline-flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <IconLinkedIn className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                  title="Medium"
                  className="inline-flex items-center justify-center h-10 w-10 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <IconMedium className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle row: Open source + Resume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-border pt-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
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

          <div className="sm:text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              Resume
            </p>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              Download PDF
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-1.5 border border-border px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <span aria-hidden="true">↑</span>
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
