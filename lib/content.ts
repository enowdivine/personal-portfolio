/**
 * The work registry: jobs, hire pages, domain pages — and the matcher that
 * decides which experience bullets a specialty page gets to show.
 *
 * SERVER-ONLY BY INTENT, for one concrete reason: this module imports
 * messages/en.json. It needs to, because `bulletsFor` matches a specialty's
 * keywords against the ENGLISH wording of the experience bullets — keywords
 * like "escrow" and "idempoten" only exist in one language, and a per-locale
 * matcher would show a French visitor a different (worse) set of evidence than
 * an English one. So the match runs once, in English, and the pages render the
 * matched bullets through next-intl in whatever locale they are in.
 *
 * Nothing here may be imported from a client component. The language-neutral
 * data the header, footer, contact form and chat panel need lives in
 * ./data instead.
 *
 * The ids below are typed from messages/en.json, so a job or a slug added here
 * without its copy — or renamed in one place only — is a compile error rather
 * than a page that prints "Experience.jobs.foo.role" at visitors.
 */

import en from "@/messages/en.json";

const JOBS = en.Experience.jobs;

export type JobId = keyof typeof JOBS;

export type Job = {
  id: JobId;
  /** A company's own name. The same in both languages. */
  company: string;
  current: boolean;
};

/** Reverse-chronological, with the three live engagements first. */
export const EXPERIENCE: Job[] = [
  { id: "impactFactors", company: "Impact Factors", current: true },
  { id: "primusLearning", company: "Primus Learning PLC", current: true },
  { id: "saasSimplified", company: "SaaS Simplified", current: true },
  { id: "tandoDating", company: "Tando Dating", current: false },
  { id: "aeco", company: "AECO", current: false },
  { id: "summitTech", company: "Summit Tech", current: false },
];

/**
 * A job's bullets, widened to a plain record so they can be iterated and
 * indexed by key. Each job in messages/en.json has its own set of bullet keys
 * (b1, b2, …), so the literal types are all different and only have string
 * values in common.
 */
function bulletsOf(id: JobId): Record<string, string> {
  return JOBS[id].bullets;
}

/** The bullet keys for a job, in the order messages/en.json lists them. */
export function bulletKeys(id: JobId): string[] {
  return Object.keys(bulletsOf(id));
}

/** One matched bullet: enough for a page to label it and translate it. */
export type BulletRef = {
  jobId: JobId;
  company: string;
  bulletKey: string;
};

/**
 * Bullets matching any of the given keywords, across all jobs, tagged with the
 * company that shipped them. Used by the hire and domain pages to surface only
 * the work relevant to that page's topic.
 */
export function bulletsFor(keywords: string[]): BulletRef[] {
  const needles = keywords.map((keyword) => keyword.toLowerCase());
  const matched: BulletRef[] = [];

  for (const job of EXPERIENCE) {
    for (const [bulletKey, text] of Object.entries(bulletsOf(job.id))) {
      const haystack = text.toLowerCase();
      if (needles.some((needle) => haystack.includes(needle))) {
        matched.push({ jobId: job.id, company: job.company, bulletKey });
      }
    }
  }

  return matched;
}

/**
 * Hire pages (`/hire/[slug]`) and domain pages (`/domain/[slug]`).
 *
 * Each entry is a real specialty Divine genuinely delivers on, not a
 * keyword-only ghost page. The slug and the match keywords are the whole of
 * the data: every word a visitor reads is in messages, under `HireSpecialties`
 * or `DomainTopics`, keyed by the slug.
 *
 * The SLUGS STAY ENGLISH in both locales, and there are deliberately no French
 * slug variants. These pages exist to answer English search queries — nobody
 * searches for "recruter-un-ingenieur-node-js-senior" — so /fr/hire/<slug>
 * serves the same URL with French page copy, and the hreflang pair on each
 * page says so.
 *
 * Add an entry here plus its copy in both message files and the pages
 * regenerate on the next build.
 */
export type HireSlug = keyof typeof en.HireSpecialties;
export type DomainSlug = keyof typeof en.DomainTopics;

export type Specialty<Slug extends string> = {
  slug: Slug;
  /** Matched against the English experience bullets — see `bulletsFor`. */
  matchKeywords: string[];
};

export const HIRE_SPECIALTIES: Specialty<HireSlug>[] = [
  {
    slug: "senior-node-js-engineer",
    matchKeywords: ["node", "backend", "microservice", "service", "api", "prisma"],
  },
  {
    slug: "senior-backend-engineer",
    matchKeywords: [
      "backend",
      "service",
      "api",
      "microservice",
      "reconcil",
      "consistent",
      "role",
      "authorization",
    ],
  },
  {
    slug: "payment-systems-engineer",
    matchKeywords: [
      "payment",
      "renewal",
      "subscription",
      "escrow",
      "remittance",
      "refund",
      "money",
      "reconcil",
      "double-charge",
      "duplicate",
      "receipt",
      "stripe",
      "fapshi",
      "mobile money",
    ],
  },
  {
    slug: "stripe-integration-consultant",
    matchKeywords: [
      "stripe",
      "payment",
      "subscription",
      "renewal",
      "webhook",
      "receipt",
      "cryptographic",
      "reconcil",
    ],
  },
  {
    slug: "react-native-developer",
    matchKeywords: [
      "mobile",
      "react native",
      "expo",
      "app store",
      "play store",
      "receipt",
      "ios",
      "android",
    ],
  },
  {
    slug: "typescript-engineer",
    matchKeywords: [
      "typescript",
      "node",
      "react",
      "next",
      "prisma",
      "state machine",
      "typed",
    ],
  },
  {
    slug: "distributed-systems-engineer",
    matchKeywords: [
      "consistent",
      "race",
      "concurrent",
      "idempoten",
      "event",
      "retry",
      "microservice",
      "service",
      "state machine",
      "advisory lock",
    ],
  },
  {
    slug: "fintech-backend-engineer",
    matchKeywords: [
      "payment",
      "remittance",
      "escrow",
      "subscription",
      "crowdfunding",
      "money",
      "compliance",
      "aml",
      "audit",
      "corridor",
    ],
  },
];

export const DOMAIN_TOPICS: Specialty<DomainSlug>[] = [
  {
    slug: "payment-reconciliation",
    matchKeywords: ["reconcil", "duplicate", "double-count", "retry", "webhook", "tax"],
  },
  {
    slug: "cross-border-remittance",
    matchKeywords: [
      "remittance",
      "corridor",
      "rate",
      "mobile money",
      "diaspora",
      "money",
      "xaf",
      "gbp",
    ],
  },
  {
    slug: "subscription-payments",
    matchKeywords: [
      "subscription",
      "renewal",
      "recurring",
      "recover",
      "receipt",
      "cryptographic",
      "revenue",
    ],
  },
  {
    slug: "mobile-money-integration",
    matchKeywords: ["mobile money", "mtn", "orange", "fapshi", "corridor", "checkout"],
  },
  {
    slug: "multi-tenant-saas",
    matchKeywords: [
      "multi-tenant",
      "tenant",
      "role",
      "authorization",
      "propagat",
      "service",
      "microservice",
    ],
  },
];

/**
 * The English copy, straight out of messages/en.json.
 *
 * Only the AI knowledge base uses these: its prompt is English by design (see
 * lib/ai-knowledge-base.ts), while the model is told to answer in whatever
 * language the visitor writes in. Pages must NOT read copy through here —
 * they use `getTranslations`, which is what makes them bilingual.
 */
export const ENGLISH = {
  profile: en.Profile,
  education: en.Education,
  skills: en.Skills,
  job: (id: JobId) => ({
    role: JOBS[id].role,
    location: JOBS[id].location,
    period: JOBS[id].period,
    bullets: bulletsOf(id),
  }),
  hire: (slug: HireSlug) => en.HireSpecialties[slug],
  domain: (slug: DomainSlug) => en.DomainTopics[slug],
} as const;
