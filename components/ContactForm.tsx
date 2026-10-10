"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { IconLinkedIn, IconWhatsApp } from "@/components/icons";
import {
  ENQUIRY_REASONS,
  PROFILE,
  type EngagementId,
  type EngagementType,
} from "@/lib/data";

type ContactFormProps = {
  /**
   * The engagement the visitor came from, e.g. `/contact?type=Payment
   * systems`. Those links have existed on /consulting for a while but nothing
   * read the parameter, so every one of them landed on an empty form and the
   * context was lost. Now it arrives pre-selected.
   *
   * Two halves, because the chip and the email want different things:
   * `engagementId` names the message that is PRINTED (localised), while
   * `engagementType` is the English string that is POSTED and ends up as the
   * enquiry's subject line. Translating the posted value would hand Divine an
   * inbox sorted by two different vocabularies.
   */
  engagementId?: EngagementId;
  engagementType?: EngagementType;
};

export function ContactForm({
  engagementId,
  engagementType,
}: ContactFormProps) {
  const t = useTranslations("ContactPage");
  const tProfile = useTranslations("Profile");
  const tEngagements = useTranslations("Engagements");

  /* Each option as {value, label}: `value` is the English string that gets
     POSTED and lands in the enquiry email, `label` is the localised string the
     visitor reads. Both halves come from the closed sets in lib/data.ts, so a
     chip can never post something the API did not expect. */
  const reasons: { value: string; label: string }[] = [
    ...(engagementId && engagementType
      ? [
          {
            value: engagementType,
            label: tEngagements(`${engagementId}.name`),
          },
        ]
      : []),
    ...ENQUIRY_REASONS.map((reason) => ({
      value: reason.value,
      label: t(`form.reasons.${reason.id}`),
    })),
  ];

  const emptyForm = {
    name: "",
    company: "",
    email: "",
    reason: engagementType ?? "",
    message: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handle =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        /* The status, not the body. /api/contact answers with an English
           `error` string — it is a server, it has no locale — and printing it
           put English sentences in front of French visitors. The three cases
           it actually distinguishes (too many messages, rejected input,
           everything else) each have their own translated message here. */
        const key =
          res.status === 429
            ? "rateLimited"
            : res.status === 400
              ? "invalid"
              : "generic";
        setError(t(`form.errors.${key}`, { email: PROFILE.email }));
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("[contact] request failed:", err);
      setError(t("form.errors.network", { email: PROFILE.email }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-gradient-to-b from-sand via-background to-background">
        {/* Plays once when the panel swaps in — the only motion on the site
            that marks a state change rather than an arrival. */}
        <div className="animate-rise container max-w-lg py-28 text-center md:py-32">
          <span
            className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
            aria-hidden="true"
          >
            <CheckCircle className="h-7 w-7 text-primary" />
          </span>
          <h1 className="text-2xl font-bold text-foreground">
            {t("success.title")}
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            {t("success.body")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="lift inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white"
            >
              <IconWhatsApp className="h-4 w-4 shrink-0" />
              {t("success.whatsapp")}
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm(emptyForm);
              }}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t("success.again")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-sand via-background to-background">
        <div className="container py-16 md:py-20">
          <p className="animate-rise text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {t("hero.label")}
          </p>
          {/* Transform-only entrance: the LCP element on this page. */}
          <h1 className="animate-lift mt-5 max-w-3xl text-[clamp(2.1rem,5.4vw,3.5rem)] font-extrabold text-foreground">
            {t("hero.title")}
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "100ms" }}
          >
            {t("hero.lede")}
          </p>
        </div>
      </section>

      {/* ── Form + channels ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-sand">
        <div className="container py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
            {/* The form itself is deliberately static — inputs and labels
                should be ready the instant they are on screen, not fading. */}
            <form
              onSubmit={submit}
              aria-label={t("form.ariaLabel")}
              className="card-rest space-y-6 rounded-3xl border border-border bg-card p-7 md:p-9"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field id="f-name" label={t("form.name")}>
                  <input
                    id="f-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handle("name")}
                    className={INPUT}
                    placeholder={t("form.namePlaceholder")}
                  />
                </Field>
                <Field id="f-company" label={t("form.company")}>
                  <input
                    id="f-company"
                    type="text"
                    value={form.company}
                    onChange={handle("company")}
                    className={INPUT}
                    placeholder={t("form.companyPlaceholder")}
                  />
                </Field>
              </div>

              <Field id="f-email" label={t("form.email")}>
                <input
                  id="f-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handle("email")}
                  className={INPUT}
                  placeholder={t("form.emailPlaceholder")}
                />
              </Field>

              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("form.aboutLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((reason) => (
                    <button
                      type="button"
                      key={reason.value}
                      aria-pressed={form.reason === reason.value}
                      onClick={() =>
                        setForm((p) => ({ ...p, reason: reason.value }))
                      }
                      className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                        form.reason === reason.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {reason.label}
                    </button>
                  ))}
                </div>
              </div>

              <Field id="f-message" label={t("form.message")}>
                <textarea
                  id="f-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handle("message")}
                  className={`${INPUT} resize-none`}
                  placeholder={t("form.messagePlaceholder")}
                />
              </Field>

              {error && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lift inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {isSubmitting ? t("form.sending") : t("form.submit")}
                  {!isSubmitting && (
                    <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
                  )}
                </button>
                <span className="text-[13px] text-muted-foreground">
                  {t("form.replyNote")}
                </span>
              </div>
            </form>

            <aside className="space-y-5">
              {/* WhatsApp first, on purpose: it is the channel most enquiries
                  actually arrive on, and the one a visitor on a phone can act
                  on without typing an address. */}
              <Reveal className="card-rest rounded-2xl border border-border bg-card p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("side.reachLabel")}
                </p>
                <a
                  href={PROFILE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white"
                >
                  <IconWhatsApp className="h-4 w-4 shrink-0" />
                  {t("side.whatsapp")}
                </a>
                <ul className="mt-5 space-y-3 border-t border-border pt-5">
                  <li>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="break-all">{PROFILE.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${PROFILE.phoneE164}`}
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{PROFILE.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={PROFILE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <IconLinkedIn className="h-4 w-4 shrink-0" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </Reveal>

              <Reveal
                delay={120}
                className="card-rest rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("side.goodToKnow")}
                </p>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">
                      {t("side.timeZones.term")}
                    </dt>
                    <dd className="mt-0.5 text-muted-foreground">
                      {t("side.timeZones.value")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      {t("side.next.term")}
                    </dt>
                    <dd className="mt-0.5 text-muted-foreground">
                      {t("side.next.value")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      {t("side.based.term")}
                    </dt>
                    <dd className="mt-0.5 text-muted-foreground">
                      {tProfile("location")}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* One input treatment, used by all four fields. A constant rather than four
   copies of the same twenty utilities, so the focus ring cannot drift between
   them. */
const INPUT =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
