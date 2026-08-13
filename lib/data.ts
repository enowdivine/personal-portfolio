export const PROFILE = {
  name: "Enow Divine",
  title: "Senior Backend Engineer",
  specialty: "Payment Systems · Open Source Author",
  email: "enowdivine14@gmail.com",
  phone: "+237 672 491 296",
  phoneE164: "+237672491296",
  whatsapp: "https://wa.me/237672491296",
  location: "Buea, Cameroon",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/enowdivine",
    linkedin: "https://www.linkedin.com/in/enowdivine/",
    medium: "https://medium.com/@enowdivine",
  },
  summary:
    "Senior backend engineer, 7+ years building the payment and correctness layers behind fintech, remittance, and SaaS products used across the US, EU, and Africa. Owns platform-scale backends and gets the hard parts right — payments that don't double-charge, funds that settle exactly as promised, and systems that stay consistent under load. Trusted remote delivery across US, EU, and African time zones.",
  shortBio:
    "Senior backend engineer specializing in payments, money-movement correctness, and distributed backends. Founded SaaS Simplified in 2018. Available for senior remote roles and select consulting.",
};

// Projects moved to saassimplified.net/projects (single canonical home).
// `Project` type + `PROJECTS` array intentionally removed.


export type Job = {
  company: string;
  location: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: "Impact Factors",
    location: "US · Remote",
    role: "Senior Software Engineer · Full-time",
    period: "Feb 2025 – Present",
    current: true,
    bullets: [
      "Became the primary backend engineer for a multi-tenant faith-community platform used by churches and ministries (giving, community, messaging) — the person new features and cross-team backend issues route to, across 15+ services.",
      "Protected recurring giving and subscription revenue from silent failures: fixed a renewal race that could drop active subscriptions mid-payment, and added recovery that reconciles failed renewals without ever double-charging donors.",
      "Secured customer organizations' admin controls against takeover — rebuilt role authorization across every service and closed a path where non-admins could grant themselves admin rights.",
      "Made platform data trustworthy under load: a user action like a deletion or role change now propagates once and correctly across every service, even when events are retried or arrive out of order.",
    ],
  },
  {
    company: "Primus Learning PLC",
    location: "US · Remote",
    role: "Software Engineer · Contract",
    period: "Apr 2024 – Present",
    current: true,
    bullets: [
      "Made a crowdfunding platform's core \"all-or-nothing\" promise real: re-architected money flow so backer funds are held in escrow and released to creators only when a campaign hits its goal — otherwise every backer is automatically refunded — protecting both sides of the transaction.",
      "Eliminated a bug that double-counted campaign totals and tax figures — reworked payment processing so a duplicate or retried provider notification can never be counted twice, verified under concurrent load.",
      "Built the compliance controls a money-moving product needs to operate legally: a tamper-proof audit trail, anti-money-laundering caps, and automated tax-threshold reporting.",
      "Made automated trading safe on a custodial trading platform — a crash-safe execution engine with built-in guardrails (spending caps, kill-switches, auto-pause) and hardware-key-protected withdrawals, so trades can't run away or exceed set limits.",
    ],
  },
  {
    company: "SaaS Simplified",
    location: "Cameroon · Remote",
    role: "Founder & Lead Engineer",
    period: "2018",
    current: true,
    bullets: [
      "Founded and lead a senior software agency — 10+ production platforms shipped across fintech, remittance, ticketing, and education, including 5 apps published to the App Store and Play Store.",
      "Built a cross-border remittance app (live on both stores, 5 corridors into Central Africa) that guarantees senders the exact rate they saw — the exchange rate is locked at submission with money-safe decimal handling and duplicate-transfer protection, so diaspora transfers land correct to the last franc.",
      "Authored stateledger, an open-source payment state-machine library for Node/TypeScript (3 packages on npm) — the reliable equivalent the Node ecosystem was missing for handling payment workflows.",
      "Also shipped a pan-African admissions platform letting students apply and pay by mobile money across 10 countries without traveling to campus; a mobile-money event-ticketing platform with fraud-resistant QR tickets; and PulseLab, a real-time webhook debugger.",
    ],
  },
  {
    company: "Tando Dating",
    location: "Switzerland · Remote",
    role: "Mobile Engineer · Contract",
    period: "Sep 2024 – Apr 2026",
    current: false,
    bullets: [
      "Gave a diaspora dating app a reliable foundation to scale on — led its migration from MongoDB to PostgreSQL, restructuring the entire data model (33 models, 150+ endpoints) for enforceable integrity.",
      "Stopped subscription revenue leaking from forged or unverified receipts by adding cryptographic verification across Apple, Google, and card payments.",
      "Rebuilt match discovery on a location-aware scoring engine; the product reached 1,000+ users in its first month.",
    ],
  },
  {
    company: "AECO",
    location: "Cameroon",
    role: "Software Engineer",
    period: "Jan 2024 – Aug 2024",
    current: false,
    bullets: [
      "Rebuilt AECO Education and Saint Louis University's digital presence (30% engagement lift) and built the student-application system that grew into a pan-African admissions platform.",
    ],
  },
  {
    company: "Summit Tech",
    location: "Cameroon · Full-time",
    role: "CTO",
    period: "Jun 2021 – May 2024",
    current: false,
    bullets: [
      "Led a team of 3 engineers and 10 interns; owned technical scoping of all incoming projects.",
      "Built the digital platform for a 5-company conglomerate that generated 3M FCFA in its first two months and drove a 30% annual revenue increase.",
      "Built RHIIBMS, a school-management system that cut admission processing by weeks with 100% budget-calculation accuracy.",
    ],
  },
];

export const SKILLS = [
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "AdonisJS",
      "Express",
      "Python",
      "REST",
      "GraphQL",
      "gRPC",
      "Microservices",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Infrastructure",
    items: [
      "PostgreSQL",
      "Prisma",
      "Redis",
      "MongoDB",
      "Docker",
      "AWS",
      "Nginx",
      "PM2",
    ],
  },
  {
    label: "Payments & Fintech",
    items: [
      "Stripe",
      "Mobile money rails",
      "Remittance",
      "Multi-currency",
    ],
  },
  {
    label: "Other",
    items: [
      "Jest",
      "Vitest",
      "Git/GitHub",
      "OpenAI & Anthropic APIs",
      "Code review",
      "Tech leadership",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've had the opportunity to work with Enow on a couple of projects and I must say I'm marveled by his high level of competence. I would recommend him to anyone looking for a full-stack web developer.",
    name: "Akum Blaise",
    role: "CEO, Zotech",
    image: "/people/blaise.jpeg",
  },
  {
    quote:
      "Enow is a great team player — a leader who doesn't just assign or command but leads by example. He's a strong communicator and always ready to provide assistance. I highly recommend working with him.",
    name: "Njita Arnaud",
    role: "Frontend Engineer & UI/UX Designer",
    image: "/people/arnaud.jpeg",
  },
  {
    quote:
      "Worked with Divine on some heavy engineering builds, he's the real deal. Solid architecture, great UI polish, and zero fluff. Highly recommend him.",
    name: "Etang Kencliff Andock Tabi Atem",
    role: "AI-Integrated Full Stack Engineer",
    image: "/people/kencliff.jpg",
  },
  {
    quote:
      "I have worked with Divine on several projects and during my time at Markpedia. He is an excellent and reliable software engineer, very empathetic, intelligent and gets things done. I recommend him for software development projects, contracts and jobs.",
    name: "Oben Desmond Ashu",
    role: "Software Engineer & Social Impact Technologist",
    image: "/people/oben.jpg",
  },
];

export const EDUCATION = {
  degree: "B.Sc. Computer Engineering",
  institution: "University of Buea, Cameroon",
  date: "Dec 2022",
};

/**
 * Hire-me pages (`/hire/[slug]`) and domain pages (`/domain/[slug]`) are
 * generated from the two arrays below. Each entry is a real specialty Enow
 * genuinely delivers on | not a keyword-only ghost page. Add or remove entries
 * here and the corresponding pages regenerate on next build.
 */

export type Specialty = {
  slug: string;
  title: string;              // H1 / meta title
  role: string;               // shorter role label used inline
  metaDescription: string;    // <meta description>
  lead: string;               // hero paragraph
  bulletsIntro: string;       // sentence introducing the bullets block
  matchKeywords: string[];    // used to pull relevant EXPERIENCE bullets
};

/** Hire-me pages | one per role/skill someone would hire Enow for. */
export const HIRE_SPECIALTIES: Specialty[] = [
  {
    slug: "senior-node-js-engineer",
    title: "Hire a Senior Node.js Engineer",
    role: "Senior Node.js Engineer",
    metaDescription:
      "Hire Enow Divine, a senior Node.js engineer with 7+ years shipping production backends for fintech, remittance, and SaaS. Available for senior remote roles and consulting.",
    lead:
      "Enow builds and owns production Node.js backends end-to-end — architecture, delivery, on-call. Seven years across payment platforms, remittance apps, subscription SaaS, and open-source infrastructure. Available for senior remote roles and select consulting engagements.",
    bulletsIntro:
      "Recent Node.js work, with real impact instead of tech-stack buzzwords:",
    matchKeywords: ["node", "backend", "microservice", "service", "api", "prisma"],
  },
  {
    slug: "senior-backend-engineer",
    title: "Hire a Senior Backend Engineer",
    role: "Senior Backend Engineer",
    metaDescription:
      "Hire a senior backend engineer with 7+ years across payments, distributed systems, and multi-tenant SaaS. Trusted remote delivery across US, EU, and African time zones.",
    lead:
      "Enow specialises in the hard parts: money movement that doesn't double-charge, systems that stay consistent under load, and services that fail safely. Seven years shipping backends behind fintech, remittance, and platform-scale SaaS.",
    bulletsIntro: "Backend engagements shipping in production right now:",
    matchKeywords: ["backend", "service", "api", "microservice", "reconcil", "consistent", "role", "authorization"],
  },
  {
    slug: "payment-systems-engineer",
    title: "Hire a Payment Systems Engineer",
    role: "Payment Systems Engineer",
    metaDescription:
      "Payment systems engineering — Stripe, mobile money, multi-currency, idempotency, reconciliation. Enow Divine builds money-movement layers that don't double-charge and settle exactly as promised.",
    lead:
      "Payments are unforgiving: double-charges, silent failures, and reconciliation drift compound into revenue and trust loss fast. Enow has spent 7+ years building the money-movement layer for remittance, subscription, and crowdfunding platforms | idempotent, auditable, and correct under retry.",
    bulletsIntro: "Selected payment-systems work:",
    matchKeywords: ["payment", "renewal", "subscription", "escrow", "remittance", "refund", "money", "reconcil", "double-charge", "duplicate", "receipt", "stripe", "fapshi", "mobile money"],
  },
  {
    slug: "stripe-integration-consultant",
    title: "Hire a Stripe Integration Consultant",
    role: "Stripe Integration Consultant",
    metaDescription:
      "Stripe integration consultant with production experience across subscriptions, one-time payments, receipt verification, and reconciliation. Available for remote consulting.",
    lead:
      "Stripe done right means renewals that never drop, receipts that can't be forged, and webhooks that can be retried without double-counting anything. Enow has shipped and owns these guarantees in production for both SaaS subscriptions and crowdfunding escrow.",
    bulletsIntro: "Stripe-adjacent work already live:",
    matchKeywords: ["stripe", "payment", "subscription", "renewal", "webhook", "receipt", "cryptographic", "reconcil"],
  },
  {
    slug: "react-native-developer",
    title: "Hire a React Native Developer",
    role: "React Native Developer",
    metaDescription:
      "React Native developer with published App Store and Play Store apps. Remittance, dating, and event-ticketing mobile experience. Available for remote contracts.",
    lead:
      "Cross-platform mobile that ships and stays shipped: 5 apps live on the App Store and Play Store across remittance, ticketing, and dating. Enow owns the mobile side from Expo tooling through native modules and payment SDK integration.",
    bulletsIntro: "Mobile work shipped to real users:",
    matchKeywords: ["mobile", "react native", "expo", "app store", "play store", "receipt", "ios", "android"],
  },
  {
    slug: "typescript-engineer",
    title: "Hire a Senior TypeScript Engineer",
    role: "Senior TypeScript Engineer",
    metaDescription:
      "Senior TypeScript engineer across Node.js backends, React frontends, and React Native mobile. 7+ years shipping strictly-typed production code. Available for remote roles.",
    lead:
      "Enow works end-to-end in TypeScript: strict-typed Node backends, React and Next.js frontends, React Native mobile, and open-source npm packages. Type safety used as a design tool, not a formality.",
    bulletsIntro: "Recent TypeScript-heavy work:",
    matchKeywords: ["typescript", "node", "react", "next", "prisma", "state machine", "typed"],
  },
  {
    slug: "distributed-systems-engineer",
    title: "Hire a Distributed Systems Engineer",
    role: "Distributed Systems Engineer",
    metaDescription:
      "Distributed systems engineer with real experience across event ordering, idempotent workflows, race conditions, and multi-service consistency. Available for senior remote roles.",
    lead:
      "The hard problems in distributed systems are the ones that only show up in production: out-of-order events, retried notifications, race conditions on shared state. Enow has fixed and owns these classes of bug across multi-tenant SaaS and payment platforms.",
    bulletsIntro: "Distributed-systems work in production:",
    matchKeywords: ["consistent", "race", "concurrent", "idempoten", "event", "retry", "microservice", "service", "state machine", "advisory lock"],
  },
  {
    slug: "fintech-backend-engineer",
    title: "Hire a Fintech Backend Engineer",
    role: "Fintech Backend Engineer",
    metaDescription:
      "Fintech backend engineer with published remittance, crowdfunding, and subscription experience. Idempotent money movement, receipt verification, escrow, audit trails.",
    lead:
      "Fintech backends live and die on correctness, not features. Enow has shipped remittance corridors that lock rates at submission, crowdfunding escrow that only releases when a goal is met, and subscription systems that recover failed renewals without double-charging.",
    bulletsIntro: "Fintech engagements in production:",
    matchKeywords: ["payment", "remittance", "escrow", "subscription", "crowdfunding", "money", "compliance", "aml", "audit", "corridor"],
  },
];

/** Domain pages | one per topical area Enow writes / speaks / consults on. */
export const DOMAIN_TOPICS: Specialty[] = [
  {
    slug: "payment-reconciliation",
    title: "Payment Reconciliation Consulting",
    role: "Payment Reconciliation Specialist",
    metaDescription:
      "Payment reconciliation, retry-safe webhooks, and duplicate-prevention consulting. Real production experience across Stripe, mobile money, and multi-currency stacks.",
    lead:
      "Reconciliation drift is what turns healthy payment systems into support-ticket generators. Enow builds reconciliation layers that survive retried webhooks, duplicated provider notifications, and multi-provider mismatches | so the ledger always matches the money.",
    bulletsIntro: "Reconciliation work already live:",
    matchKeywords: ["reconcil", "duplicate", "double-count", "retry", "webhook", "tax"],
  },
  {
    slug: "cross-border-remittance",
    title: "Cross-Border Remittance Engineering",
    role: "Cross-Border Remittance Engineer",
    metaDescription:
      "Cross-border remittance engineering | rate-locking, mobile money integration, multi-corridor reconciliation. Built and shipped a live diaspora-to-Africa remittance app.",
    lead:
      "Cross-border remittance means people trust you with their salaries. Enow shipped a live BHD/GBP → XAF remittance product across 5 corridors, with locked-at-submission rates, money-safe decimal handling, and duplicate-transfer protection.",
    bulletsIntro: "Remittance work in production:",
    matchKeywords: ["remittance", "corridor", "rate", "mobile money", "diaspora", "money", "xaf", "gbp"],
  },
  {
    slug: "subscription-payments",
    title: "Subscription Payment Systems",
    role: "Subscription Payments Engineer",
    metaDescription:
      "Subscription payment systems | renewal recovery, dunning, receipt verification, revenue leak prevention. Owns the payment layer for real production SaaS.",
    lead:
      "Subscription revenue leaks in a hundred silent ways: dropped renewals, forged receipts, race conditions during mid-payment retries. Enow closes each of those failure modes and owns the recovery paths in production.",
    bulletsIntro: "Subscription-payments work:",
    matchKeywords: ["subscription", "renewal", "recurring", "recover", "receipt", "cryptographic", "revenue"],
  },
  {
    slug: "mobile-money-integration",
    title: "Mobile Money Integration",
    role: "Mobile Money Integration Engineer",
    metaDescription:
      "Mobile money integration across MTN, Orange, and other African rails. Production experience: remittance, event ticketing, admissions, cross-border transfers.",
    lead:
      "Mobile money is how money moves in Africa. Enow has integrated MTN Mobile Money, Orange Money, and Fapshi across remittance, ticketing, and admissions platforms | including reconciliation, retry logic, and fraud protection.",
    bulletsIntro: "Mobile-money integrations shipped:",
    matchKeywords: ["mobile money", "mtn", "orange", "fapshi", "corridor", "checkout"],
  },
  {
    slug: "multi-tenant-saas",
    title: "Multi-Tenant SaaS Backend",
    role: "Multi-Tenant SaaS Engineer",
    metaDescription:
      "Multi-tenant SaaS backend engineering | role authorization, event ordering across services, tenant data isolation. Owner of the primary backend for a live multi-tenant platform.",
    lead:
      "Multi-tenant SaaS is where authorization bugs become breach reports and event races become inconsistent tenant state. Enow is the primary backend engineer on a live multi-tenant faith-community platform, rebuilding role authorization and event propagation across 15+ services.",
    bulletsIntro: "Multi-tenant work in production:",
    matchKeywords: ["multi-tenant", "tenant", "role", "authorization", "propagat", "service", "microservice"],
  },
];

/** Return experience bullets that match any of the given keywords, across all
 *  jobs, tagged with the company that shipped them. Used by hire/domain
 *  pages to surface only relevant work per topic. */
export function bulletsFor(keywords: string[]): { company: string; bullet: string }[] {
  const lc = keywords.map((k) => k.toLowerCase());
  const out: { company: string; bullet: string }[] = [];
  for (const job of EXPERIENCE) {
    for (const bullet of job.bullets) {
      const b = bullet.toLowerCase();
      if (lc.some((k) => b.includes(k))) {
        out.push({ company: job.company, bullet });
      }
    }
  }
  return out;
}

