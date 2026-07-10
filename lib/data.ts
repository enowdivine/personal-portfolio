export const PROFILE = {
  name: "Enow Divine",
  title: "Senior Backend Engineer",
  specialty: "Payment Systems · Open Source Author",
  email: "enowdivine14@gmail.com",
  phone: "+237 672 491 296",
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
];

export const EDUCATION = {
  degree: "B.Sc. Computer Engineering",
  institution: "University of Buea, Cameroon",
  date: "Dec 2022",
};
