import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Workflow } from "lucide-react";
import { PROFILE } from "@/lib/data";

export const metadata: Metadata = {
  title: `Consulting — ${PROFILE.name}`,
  description:
    "Direct engineering consulting from a senior payments and distributed-systems specialist. Architecture reviews and advisory retainers.",
};

export default function ConsultingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-24 md:py-32">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-8">
            Consulting · {PROFILE.specialty}
          </span>
          <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-tight text-foreground mb-6 max-w-3xl">
            Senior engineering, on retainer.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Direct access to a senior engineer who has shipped production
            payment systems and money-safe distributed backends. Used when
            you need a deep, second pair of eyes on the system you are about
            to build — or already have in flight.
          </p>
        </div>
      </section>

      {/* What we build */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-16">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-4">
                What I take on
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Six kinds of engineering work.
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed self-end">
              Every engagement follows a familiar shape — discovery, scope,
              build, handover — but the deliverables change with the work.
              Here&rsquo;s what you actually walk away with, per project type.
            </p>
          </div>

          <div className="space-y-8">
            {PROJECT_TYPES.map((p) => (
              <article
                key={p.num}
                className="border border-border overflow-hidden group"
              >
                {/* Image banner */}
                <div className="relative w-full aspect-[21/9] overflow-hidden bg-muted border-b border-border">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-widest text-white bg-black/60 backdrop-blur-sm px-2.5 py-1">
                    {p.num} · {p.title}
                  </span>
                </div>

                <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                    {p.num}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  {p.description}
                </p>

                {/* How I engage */}
                <div className="border-t border-border pt-8 mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    How I engage
                  </p>
                  <p className="text-sm text-foreground leading-relaxed max-w-3xl">
                    {p.howIEngage}
                  </p>
                </div>

                {/* Process + Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-border pt-8">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                      Process
                    </p>
                    <ol className="space-y-3">
                      {p.process.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
                        >
                          <span className="font-mono text-[10px] text-primary mt-1 shrink-0 w-4">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                      Results &amp; documents delivered
                    </p>
                    <ul className="space-y-3">
                      {p.deliverables.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
                        >
                          <span className="text-primary mt-1 shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-border mt-8 pt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/contact?type=${encodeURIComponent(p.title)}`}
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Start a {p.title.toLowerCase()} project
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`${p.title} enquiry`)}`}
                    className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Email me
                  </a>
                </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* How we work */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-4">
                <Workflow className="inline-block h-3 w-3 mr-1.5" />
                How we work
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                How we&rsquo;ll work together.
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed self-end">
              Most of the work happens by chat and shared docs. We only jump
              on a call when it actually helps.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 border-t border-border pt-8 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">Messages first, calls when needed.</strong>
                Most of the work happens in your repo, in a shared channel, and in
                review docs. We jump on a call only when it actually saves time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">A shared chat for questions.</strong>
                Slack, Discord, or whatever your team uses. I reply the same
                working day — not 24/7, but never silent for days either.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">Everything gets written down.</strong>
                Every review, decision, or piece of work ends up in a document
                your team can read later. Nothing important lives only in
                someone&apos;s head.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">A rhythm you can plan around.</strong>
                One weekly check-in by default. Deep-dive calls when the work
                needs them. I work from West Africa and can overlap with most
                timezones.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border">
        <div className="container py-24">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-12">
            Process
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step
              num="01"
              title="Intake call"
              body="A 30-minute call to understand what you're building, where it hurts, and whether either of these engagement shapes fits. No deck, no sales pitch."
            />
            <Step
              num="02"
              title="Scoped proposal"
              body="Within a few days I send a one-page proposal with the scope, the deliverables, and the price. Plain language, no surprises."
            />
            <Step
              num="03"
              title="Start"
              body="On signature and the first payment, work starts on the date we agreed. Most engagements kick off within a week."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="container py-24">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-12">
            Common questions
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-border pt-8">
            {[
              {
                q: "Do you handle both building and advising?",
                a: "Yes. Most engagements are build work — payment systems, SaaS, mobile, marketing sites, AI features. But I also take on advisory-only work when a team just needs a second opinion or an ongoing brain to bounce things off.",
              },
              {
                q: "Does this convert into a full build if we want one?",
                a: "Yes. If an advisory engagement surfaces work you want done, we scope a build separately and my agency, SaaS Simplified, takes it on. Advisory and build are always billed separately — never an upsell pressure inside the advisory hours.",
              },
              {
                q: "Do you sign NDAs?",
                a: "Yes. Send yours and I'll review it; if you don't have one I have a short mutual NDA I can share.",
              },
              {
                q: "How fast can we start?",
                a: "Most engagements kick off within a week of signature. Build work with a bigger scope may take longer to schedule — I'll say so up front on the intake call.",
              },
              {
                q: "How many engagements at once?",
                a: "A small number, deliberately. I keep a firm cap so every client gets real senior attention, not shared time. If I'm at capacity I'll say so on the intake call and offer a start date.",
              },
              {
                q: "Async-only, or some calls?",
                a: "Both, depending on the work. Most of the day-to-day happens by chat and in shared docs. Calls get scheduled when they actually save time.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="text-base font-bold text-foreground mb-3">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container py-24">
          <div className="border border-border p-10 md:p-16">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-6">
              Start the conversation
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-6 max-w-2xl">
              Tell me about the system you're working on.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
              A short email is enough — the architecture, where you're stuck,
              and how soon you want a second read. I reply within one business
              day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${PROFILE.email}?subject=Consulting%20enquiry`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Mail className="h-3.5 w-3.5" />
                {PROFILE.email}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border hover:border-primary/40 hover:text-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors"
              >
                Or use the contact form
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type ProjectType = {
  num: string;
  title: string;
  description: string;
  howIEngage: string;
  process: string[];
  deliverables: string[];
  image: string;
};

const PROJECT_TYPES: ProjectType[] = [
  {
    num: "01",
    title: "Payment systems",
    description:
      "For fintech products, marketplaces, and any platform moving money between two sides. Cards, mobile money, escrow, subscriptions — the stuff that has to be right the first time.",
    howIEngage:
      "Starts with a discovery call to map your money flow — sources, custody points, exits — and identify the risky joints: duplicate processing, race conditions, reconciliation gaps. Scoped as a fixed proposal within a few days.",
    process: [
      "Map the money flow: sources, custody points, exits",
      "Choose the provider stack (Stripe, Paystack, MTN/Orange Mobile Money, Fapshi)",
      "Design idempotent processing + escrow rules",
      "Build the audit trail before shipping anything else",
      "Wire compliance hooks: transaction limits, KYC, threshold reporting",
      "Load-test the concurrency story before go-live",
    ],
    deliverables: [
      "Payment processing service in your codebase, integrated with your provider(s)",
      "State machine for every money-movement flow, with tests covering duplicates and races",
      "Reconciliation dashboard or CLI for finance/ops",
      "Runbook for common failure modes: webhook duplicate, provider outage, partial refund",
      "Written architecture doc for future engineers",
      "30 days of post-launch bug-fix support",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Business & marketing sites",
    description:
      "For consultancies, agencies, and SMBs who need a professional site that actually converts — not another template drop.",
    howIEngage:
      "Discovery call on your positioning, target audience, and primary conversion action. Scoped page-by-page proposal within three business days.",
    process: [
      "Define positioning, target audience, and the primary conversion action",
      "Sitemap + wireframe review before design",
      "Build page-by-page with weekly demos",
      "SEO + performance instrumentation baked in",
      "Contact form wired to your inbox, analytics live",
      "Deploy + handover to your team",
    ],
    deliverables: [
      "Live site on your domain (Vercel or your infra)",
      "Fully editable Next.js + Tailwind codebase in your repo",
      "Contact form emailing to your inbox",
      "Bilingual (EN/FR) if in scope",
      "Sitemap, robots.txt, structured data, analytics, Open Graph metadata",
      "Handover doc + 30-day bug-fix window",
    ],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "SaaS products",
    description:
      "For founders shipping a subscription product from scratch, or teams rebuilding an aging one that's holding them back.",
    howIEngage:
      "Discovery on the core user workflow — the loop from signup to primary action to billing. Scoped MVP proposal, weekly demos, no black-box builds.",
    process: [
      "Define the core loop: signup → primary action → billing",
      "Auth + multi-tenant foundation (workspaces, RBAC, org-level isolation)",
      "Core feature build with weekly demos",
      "Stripe subscriptions with plan changes + usage metering",
      "Admin console + analytics dashboards",
      "Deploy + observability wired, beta users onboarded",
    ],
    deliverables: [
      "Live SaaS on your domain, ready for real users",
      "Multi-tenant codebase with workspace/org isolation",
      "Stripe subscriptions with plan changes + usage metering",
      "Admin console for user + billing management",
      "API for third-party integrations",
      "Deployment + monitoring runbook",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Mobile apps",
    description:
      "For products that need to live in users' pockets — payments, community, on-the-go tools. iOS + Android from a single codebase.",
    howIEngage:
      "Discovery on the core mobile workflow, backend requirements, and where you are in the app-store publishing journey (fresh account vs. existing listings).",
    process: [
      "Define the mobile-first user flow",
      "Design system + core screens",
      "Native features: push, camera, biometrics, deep links",
      "Backend API tuned for mobile constraints (batching, offline)",
      "App Store + Play Store submission (cert setup to first accept)",
      "OTA update pipeline (Expo EAS) so future updates skip resubmission",
    ],
    deliverables: [
      "iOS + Android app from one Expo/React Native codebase",
      "App Store + Play Store listings live",
      "Backend API in your repo",
      "OTA update workflow (Expo EAS) — ship fixes without new submissions",
      "Push notification setup (APNs + FCM)",
      "Handover doc covering build, release, and update cycles",
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    num: "05",
    title: "AI integrations",
    description:
      "For teams adding real LLM features to their product — not chatbot demos, but production workflows with cost caps and fallbacks.",
    howIEngage:
      "Discovery on the use case, latency + cost constraints, and — most importantly — where AI actually helps vs. where a plain form field would do the job better.",
    process: [
      "Define the use case and measure what \"correct output\" means",
      "Model selection (OpenAI, Anthropic, Groq) with real cost analysis",
      "Prompt design + a small evaluation harness so iteration is confident",
      "Streaming UX + fallback logic for model outages",
      "RAG pipeline if needed (pgvector or dedicated embeddings DB)",
      "Cost + rate-limit guardrails before shipping to real users",
    ],
    deliverables: [
      "AI feature integrated in your codebase with streaming UX",
      "Prompt library + evaluation set so you can iterate confidently",
      "Cost monitoring + hard-cap guards",
      "Fallback logic for model outages or rate limits",
      "Deployment + observability for AI-specific paths",
      "Doc explaining prompt design decisions and how to iterate them",
    ],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
  },
  {
    num: "06",
    title: "Advisory engagements",
    description:
      "For teams who want a senior engineer's brain on a decision without commissioning a full build. Architecture audits, second opinions, ongoing engineering advice.",
    howIEngage:
      "Starts with a discovery call to figure out whether you need a fixed-scope review (audit an existing system) or an ongoing retainer (bounce ideas as they come). Scoped proposal within a few days.",
    process: [
      "Discovery call to scope the ask (review vs. ongoing retainer)",
      "Written scope with fixed price (review) or monthly hours (retainer)",
      "Async work in your repo, shared channel, and review docs",
      "Two scheduled deep-dive calls for reviews; weekly check-ins for retainers",
      "Written deliverable at the end (review) or a running decision log (retainer)",
      "Two weeks of follow-up email support after reviews wrap",
    ],
    deliverables: [
      "Written architecture assessment (10–20 pages) with ranked findings by risk and effort",
      "Prioritized roadmap: what to fix now, what to defer, what to leave alone",
      "Inline code and schema annotations in your repo where useful",
      "Running decision log for retainer engagements",
      "Same-business-day answers to async questions",
      "90-min team walkthrough + Q&A for reviews",
    ],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80&auto=format&fit=crop",
  },
];

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="border-t border-border pt-6">
      <span className="font-mono text-xs text-primary block mb-3">{num}</span>
      <h3 className="text-lg font-black tracking-tight text-foreground mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
