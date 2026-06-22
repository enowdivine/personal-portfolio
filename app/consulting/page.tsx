import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, FileText, Repeat, Eye, Workflow } from "lucide-react";
import { PROFILE } from "@/lib/data";

export const metadata: Metadata = {
  title: `Consulting — ${PROFILE.name}`,
  description:
    "Direct engineering consulting from a senior payments and SaaS specialist. Architecture reviews and advisory retainers.",
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
            payments and SaaS infrastructure. Used when you need a deep,
            second pair of eyes on the system you are about to build — or
            already have in flight.
          </p>
        </div>
      </section>

      {/* What's on offer */}
      <section className="border-b border-border">
        <div className="container py-24">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-12">
            How to engage
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Tier 1: Architecture Review */}
            <article className="border border-border p-8">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  Engagement 01
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
                Architecture review
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                A fixed-scope deep read of an existing system or a planned
                build. Code, schema, payment flows, data model, the
                concurrency story, the failure modes. Closes with a written
                assessment and a concrete roadmap.
              </p>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">→</span>
                  Two-week engagement, mostly async with two scheduled deep-dives
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">→</span>
                  Written assessment, ranked findings, and a recommended sequencing
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">→</span>
                  Closes with a 90-minute walkthrough with your team
                </li>
              </ul>
            </article>

            {/* Tier 2: Advisory Retainer */}
            <article className="border border-border p-8">
              <div className="flex items-center gap-2 mb-6">
                <Repeat className="h-4 w-4 text-primary" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  Engagement 02
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
                Advisory retainer
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                A monthly block of senior engineering time used the way you
                need it — design reviews, code reviews, an extra brain on a
                hard call, hiring help, an outside read on a vendor pitch.
                Async by default, with scheduled calls when they help.
              </p>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">→</span>
                  Monthly hours block — used flexibly through the month
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">→</span>
                  Shared channel (Slack or similar) for between-call questions
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 shrink-0">→</span>
                  Month-to-month, paused or stopped on a month's notice
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* What I tend to look at */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-4">
                <Eye className="inline-block h-3 w-3 mr-1.5" />
                Scope
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                What I tend to look at.
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed self-end">
              Most engagements end up touching some subset of these areas.
              Yours might be one of them, half of them, or something
              adjacent — we'll figure that out on the intake call.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 border-t border-border pt-8">
            {[
              {
                title: "API design",
                body: "Versioning, contract stability, idempotency at the boundary. How the API holds up as your callers grow in number and stop reading the changelog.",
              },
              {
                title: "Data modeling",
                body: "Schemas, state machines, audit trails. Modeling business workflows as explicit transitions so on-call and compliance can both answer their questions from one table.",
              },
              {
                title: "Concurrency safety",
                body: "Locking, transactions, race conditions. Where two writers can step on each other, where they can't, and where the database actually guarantees what you think it does.",
              },
              {
                title: "Background work",
                body: "Job queues, retry semantics, failure-mode design. What gets retried, what gets dead-lettered, what wakes someone up.",
              },
              {
                title: "Observability",
                body: "Logs, metrics, traces in production paths. Where the system can go silent and what to instrument so it can't.",
              },
              {
                title: "Database transaction boundaries",
                body: "Where to commit, where to roll back, what to snapshot at decision points so reports stay correct months later.",
              },
              {
                title: "Webhook handling",
                body: "Delivery vs idempotent processing as separate concerns. Why the provider's API is the source of truth and the webhook is just a hint to go ask.",
              },
              {
                title: "Migration safety",
                body: "Running schema changes on live data without downtime. The patterns that break under load and the ones that don't.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What working together looks like */}
      <section className="border-b border-border">
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-4">
                <Workflow className="inline-block h-3 w-3 mr-1.5" />
                Rhythm
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                What working together looks like.
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed self-end">
              The default is async — calls are scheduled when they help, not
              imposed as a daily standup. The aim is to be available
              without becoming a meeting tax.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 border-t border-border pt-8 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">Async by default.</strong>
                Most of the work happens on your repo, in a shared channel, and on
                review docs. Live time is reserved for the moments where it actually
                accelerates the call.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">Shared channel for between-call questions.</strong>
                Slack, Discord, or whatever your team uses. Same-business-day
                response on weekdays — never &quot;always on,&quot; but never absent
                either.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">Output lives in a shared doc.</strong>
                Architecture review deliverable, retainer log of work done — both
                end up in a written document you and your team can revisit. Nothing
                lives only in someone&apos;s head.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">·</span>
              <span className="text-muted-foreground">
                <strong className="text-foreground block mb-1">Cadence you can plan around.</strong>
                One weekly check-in by default; deep-dives scheduled as the work
                demands. Calendar is your call — I work across timezones from West
                Africa, comfortable with most overlap windows.
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
                q: "Does this convert into a full build if we want one?",
                a: "Yes. If the review or the retainer surfaces work you want my agency, SaaS Simplified, to take on, we scope a build engagement separately. The advisory work and the build are billed separately — never an upsell pressure inside the consulting hours.",
              },
              {
                q: "Do you sign NDAs?",
                a: "Yes. Send yours and I'll review it; if you don't have one I have a short mutual NDA I can share.",
              },
              {
                q: "How fast can we start?",
                a: "Architecture reviews kick off within about a week of signature. Retainers can start the same week if the scope is straightforward.",
              },
              {
                q: "How many engagements at once?",
                a: "A small number, deliberately. Usually one architecture review concurrent with one or two retainers — never more. If I'm at capacity I'll say so up front and offer a start date.",
              },
              {
                q: "Async-only, or some calls?",
                a: "Both, depending on the engagement. Architecture reviews include two scheduled deep-dives plus the written work. Retainers run mostly async with calls scheduled when the work needs them.",
              },
              {
                q: "What if our scope is too small for a review?",
                a: "Then the retainer is likely the better fit — same access, less commitment. We figure that out on the intake call. There's no minimum scope you have to manufacture to engage.",
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

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="border-t border-border pt-6">
      <span className="font-mono text-xs text-primary block mb-3">{num}</span>
      <h3 className="text-lg font-black tracking-tight text-foreground mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
