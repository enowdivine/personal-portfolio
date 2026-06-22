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
    medium: "https://medium.com/@enowdivine",
  },
  summary:
    "Senior backend engineer with 7+ years building production SaaS platforms, with deep specialization in payment integrations across Stripe, and mobile money systems. Architected and shipped microservices serving multi-region user bases across fintech, ticketing, dating, and e-learning verticals.",
  shortBio:
    "Senior engineer building production SaaS and payments infrastructure. Founded SaaS Simplified in 2018. Available for senior remote roles and select consulting.",
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
