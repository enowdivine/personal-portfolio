"use client";

import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

const REASONS = [
  "Full-time senior role",
  "Contract / consulting",
  "Project work",
  "Just saying hi",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    reason: "",
    message: "",
  });
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed");
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(`${msg}. If this keeps happening, email directly at ${PROFILE.email}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section>
        <div className="container py-32 max-w-md text-center">
          <CheckCircle className="h-10 w-10 text-primary mx-auto mb-6" />
          <h1 className="text-2xl font-black tracking-tight text-foreground mb-3">
            Message sent.
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Reply within one business day.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", company: "", email: "", reason: "", message: "" });
            }}
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            ← Send another
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-24 md:py-28">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-6">
            Contact
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.92] tracking-tight text-foreground mb-6 max-w-3xl">
            Get in touch.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Senior remote roles, contract work, or interesting problems worth solving — a
            few sentences is enough. Reply within one business day.
          </p>
        </div>
      </section>

      {/* Form + side */}
      <section className="border-b border-border">
        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            {/* Form */}
            <form onSubmit={submit} className="space-y-6" aria-label="Contact form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field id="f-name" label="Name *">
                  <input
                    id="f-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handle("name")}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Jane Smith"
                  />
                </Field>
                <Field id="f-company" label="Company">
                  <input
                    id="f-company"
                    type="text"
                    value={form.company}
                    onChange={handle("company")}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Acme Inc."
                  />
                </Field>
              </div>

              <Field id="f-email" label="Email *">
                <input
                  id="f-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handle("email")}
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="jane@acme.com"
                />
              </Field>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Reason
                </p>
                <div className="flex flex-wrap gap-2">
                  {REASONS.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setForm((p) => ({ ...p, reason: r }))}
                      className={`font-mono text-[11px] uppercase tracking-widest px-3 py-2 border transition-colors ${
                        form.reason === r
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <Field id="f-message" label="Message *">
                <textarea
                  id="f-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handle("message")}
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="A few sentences about the role, project, or question…"
                />
              </Field>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send →"}
                </button>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  ~1 business day reply
                </span>
              </div>
            </form>

            {/* Side */}
            <aside className="space-y-6">
              <div className="border border-border p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                  Direct
                </p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors mb-4"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>{PROFILE.email}</span>
                </a>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden>→</span>
                </a>
              </div>

              <div className="border border-border p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Time zones served
                </p>
                <p className="text-sm text-foreground">US · EU · Africa</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  Remote-first, flexible hours
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

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
        className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
