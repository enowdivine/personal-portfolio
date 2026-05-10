export const PROFILE = {
  name: "Enow Divine",
  title: "Senior Software Engineer",
  specialty: "SaaS & Payments",
  email: "enowdivine14@gmail.com",
  phone: "+237 672 491 296",
  location: "Buea, Cameroon",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/enowdivine",
    linkedin: "https://www.linkedin.com/in/enowdivine/",
    twitter: "https://twitter.com/EnowDivine3",
  },
  summary:
    "Senior backend engineer with 7+ years building production SaaS platforms, with deep specialization in payment integrations across Stripe, and mobile money systems. Architected and shipped microservices serving multi-region user bases across fintech, ticketing, dating, and e-learning verticals.",
  shortBio:
    "Senior engineer building production SaaS and payments infrastructure. Founded SaaS Simplified in 2018. Available for senior remote roles and select consulting.",
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  stack: string[];
  url?: string;
  category: "Fintech" | "SaaS" | "Mobile" | "EdTech" | "Dev Tools";
  results: string[];
  metric?: string;
  metricLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "easykingspay",
    title: "EasyKingsPay",
    tagline: "Cross-border remittance from BHD/GBP to XAF.",
    role: "Founder & lead engineer",
    year: "2026",
    stack: ["Expo", "React Native", "Node.js", "PostgreSQL", "Prisma"],
    url: "https://easykingspay.com",
    category: "Fintech",
    results: [
      "5 corridors live (BHD/GBP → XAF)",
      "Published on App Store + Play Store",
      "Mobile Money + bank-transfer reconciliation",
    ],
    metric: "5",
    metricLabel: "live corridors",
  },
  {
    slug: "nextransfer",
    title: "NexTransfer",
    tagline: "International money-transfer platform with Stripe and referral rewards.",
    role: "Lead engineer (contract)",
    year: "2025",
    stack: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    category: "Fintech",
    results: [
      "Secure transfer flows + Stripe integration",
      "Threshold-based referral reward logic",
      "Owned full-stack lifecycle independently",
    ],
    metric: "—",
    metricLabel: "Primus Learning PLC",
  },
  {
    slug: "tando-dating",
    title: "Tando Dating",
    tagline: "React Native dating app for the African diaspora.",
    role: "Mobile lead",
    year: "2025",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    category: "Mobile",
    results: [
      "1,000+ users in first month",
      "Published to App Store + Play Store",
      "Built admin panel for moderation",
    ],
    metric: "1k+",
    metricLabel: "first-month users",
  },
  {
    slug: "ss-invoice",
    title: "SS Invoice",
    tagline: "Multi-currency invoicing SaaS with Mobile Money checkout.",
    role: "Founder & engineer",
    year: "2026",
    stack: ["Next.js 16", "TypeScript", "Express", "PostgreSQL", "Prisma"],
    url: "https://invoice.saassimplified.net",
    category: "SaaS",
    results: [
      "7+ currencies, PDF export via Puppeteer",
      "Mobile Money checkout via Fapshi",
      "Free + Pro plans",
    ],
    metric: "7+",
    metricLabel: "currencies",
  },
  {
    slug: "pulselab",
    title: "PulseLab",
    tagline: "Real-time HTTP and WebSocket debugger.",
    role: "Founder & engineer",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Express", "Socket.IO", "PostgreSQL"],
    url: "https://pulselab.saassimplified.net",
    category: "Dev Tools",
    results: [
      "Webhook capture + WS testing in one tool",
      "Real-time push via Socket.IO",
      "EN/FR, 4 analytics charts",
    ],
    metric: "1.8s",
    metricLabel: "P95 capture latency",
  },
  {
    slug: "campuscamer",
    title: "CampusCamer",
    tagline: "Automated multi-university student application processing.",
    role: "Engineer",
    year: "2024",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    category: "EdTech",
    results: [
      "Multi-university application platform",
      "Automated processing pipeline",
      "Built at AECO",
    ],
  },
];

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
    role: "Software Engineer",
    period: "Feb 2025 – Present",
    current: true,
    bullets: [
      "Engineered and deployed 15+ backend microservices using Node.js and Docker — article management, donations, user CRM, form builder, notification systems.",
      "Designed production REST APIs with authentication, versioning, and backward compatibility consumed across multiple product lines.",
      "Led end-to-end feature development across distributed engineering teams.",
      "Mentor junior developers through code reviews, enforcing best practices in distributed systems.",
    ],
  },
  {
    company: "SaaS Simplified",
    location: "Cameroon · Remote",
    role: "Founder & Lead Engineer",
    period: "2018 – Present",
    current: true,
    bullets: [
      "Founded and lead a software agency delivering production SaaS platforms across fintech, ticketing, e-commerce, and on-demand services.",
      "Built and launched internal SaaS products: Rezify (AI resume builder), HookVault (webhooks), SocketLab (WebSockets).",
      "Delivered 20+ client projects including payment gateway integrations and multi-tenant systems on AWS, Vercel, Firebase.",
      "Architecting AI-powered features using OpenAI and Anthropic APIs.",
    ],
  },
  {
    company: "Primus Learning PLC",
    location: "US · Remote",
    role: "Software Engineer",
    period: "Apr 2024 – Present",
    current: true,
    bullets: [
      "Designed and built NexTransfer — international money-transfer platform with secure flows and Stripe integration.",
      "Implemented custom referral program with threshold-based reward logic.",
      "Currently leading development of additional fintech and education products.",
      "Owned full-stack development lifecycle independently.",
    ],
  },
  {
    company: "Tando Dating",
    location: "Switzerland · Remote",
    role: "Mobile Engineer",
    period: "Sep 2024 – Present",
    current: true,
    bullets: [
      "Led full-stack development of React Native dating app for African diaspora; 1,000+ users in first month.",
      "Built cross-platform iOS and Android applications with native-like performance.",
      "Engineered the admin panel for user management, content moderation, and operations.",
      "Manage ongoing maintenance, feature releases, and platform stability.",
    ],
  },
  {
    company: "AECO",
    location: "Cameroon",
    role: "Software Engineer",
    period: "Jan 2024 – Aug 2024",
    current: false,
    bullets: [
      "Redesigned AECO Education and Saint Louis University of Cameroon digital infrastructure — 30% engagement increase.",
      "Built CampusCamer — automated multi-university student application processing platform.",
    ],
  },
  {
    company: "Summit Tech",
    location: "Cameroon · Full-time",
    role: "Software Engineer",
    period: "Jun 2021 – May 2024",
    current: false,
    bullets: [
      "Designed and shipped Gilgal Towers hotel platform with integrated booking and admin console.",
      "Built RHIIBMS school management system, reducing admission processing by several weeks with 100% budget calculation accuracy.",
      "Delivered restaurant management and e-commerce platforms driving 10–15% monthly revenue increases.",
    ],
  },
];

export const SKILLS = [
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "REST",
      "GraphQL",
      "Microservices",
      "Docker",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Infrastructure",
    items: [
      "AWS",
      "Vercel",
      "Firebase",
      "Supabase",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Nginx",
      "PM2",
    ],
  },
  {
    label: "Payments & Fintech",
    items: [
      "Stripe",
      "Fapshi",
      "MTN Mobile Money",
      "Orange Mobile Money",
      "Remittance",
      "Multi-currency",
    ],
  },
  {
    label: "Other",
    items: ["Jest", "Git/GitHub", "OpenAI API", "Anthropic API", "Code review", "Tech leadership"],
  },
];

export const EDUCATION = {
  degree: "B.Sc. Computer Engineering",
  institution: "University of Buea, Cameroon",
  date: "Dec 2022",
};
