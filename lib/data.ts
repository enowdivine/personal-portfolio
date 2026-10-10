/**
 * Structural site data — the ids, links, numbers and proper nouns the pages
 * are assembled from.
 *
 * COPY DOES NOT LIVE HERE. Every visible string on this site is in
 * messages/en.json + messages/fr.json and read through next-intl. This module
 * holds only what is the same in both languages — a phone number, an npm
 * package name, a URL slug, a company's own name — so those cannot drift
 * between the two message files.
 *
 * The one deliberate exception is `ENGAGEMENTS[].type`: an English string that
 * travels in a URL and an email subject rather than onto the page. See below.
 *
 * Experience, the hire pages and the domain pages are registered in
 * lib/content.ts instead, because matching a visitor's topic against the work
 * means reading the English bullets out of messages/en.json — a server-only
 * import that has no business in a module three client components pull in.
 */

export const PROFILE = {
  name: "Enow Divine",
  email: "enowdivine14@gmail.com",
  phone: "+237 672 491 296",
  phoneE164: "+237672491296",
  whatsapp: "https://wa.me/237672491296",
  /* City and ISO country, separately, because they are the two fields the
     Person JSON-LD wants and neither needs translating. The rendered
     "Buea, Cameroon" / "Buea, Cameroun" is `Profile.location` in messages —
     the country's name is not the same word in both languages, so it cannot
     be a constant here. */
  city: "Buea",
  countryCode: "CM",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/enowdivine",
    linkedin: "https://www.linkedin.com/in/enowdivine/",
    medium: "https://medium.com/@enowdivine",
  },
} as const;

/** Where the client work and the full case studies live. */
export const AGENCY_URL = "https://saassimplified.net";
export const AGENCY_CASE_STUDIES_URL = `${AGENCY_URL}/case-studies`;

/** This site's canonical origin, for canonicals and hreflang pairs. */
export const SITE_URL = "https://enowdivine.net";

/**
 * The engagement types /consulting sells, as a closed set.
 *
 * It lives here rather than inside the consulting page because two routes have
 * to agree on it: /consulting links to `/contact?type=<type>`, and /contact
 * pre-selects that value and sends it on in the enquiry email. Validating the
 * query parameter against this list is what stops an arbitrary string from the
 * URL being rendered as a chip and mailed out as the enquiry's subject.
 *
 * `type` stays ENGLISH in both locales, on purpose, and is NOT what the
 * visitor reads. Two reasons: the links /consulting has been publishing for a
 * while carry these exact strings, so changing them would break every
 * bookmarked and shared `?type=` URL; and the value travels on into the
 * enquiry's subject line, which Divine reads in English whatever language the
 * visitor wrote in. What the page shows is `Engagements.<id>.name` from
 * messages — `id` is the message key, and the two are matched here so neither
 * can be edited without the other.
 */
export const ENGAGEMENTS = [
  { id: "payments", type: "Payment systems" },
  { id: "sites", type: "Business & marketing sites" },
  { id: "saas", type: "SaaS products" },
  { id: "mobile", type: "Mobile apps" },
  { id: "ai", type: "AI integrations" },
  { id: "advisory", type: "Advisory engagements" },
] as const;

export type Engagement = (typeof ENGAGEMENTS)[number];
export type EngagementId = Engagement["id"];
export type EngagementType = Engagement["type"];

/**
 * The engagement a `?type=` parameter names, or undefined if it names none.
 * Returning the whole entry rather than a boolean is what gives /contact the
 * message id it needs to print the localised label.
 */
export function engagementFor(value: unknown): Engagement | undefined {
  if (typeof value !== "string") return undefined;
  return ENGAGEMENTS.find((engagement) => engagement.type === value);
}

/**
 * The four standing reasons the contact form offers, beyond an engagement
 * arriving from /consulting.
 *
 * Same split as `ENGAGEMENTS`, for the same reason: `id` keys the label the
 * visitor reads (`ContactPage.form.reasons.<id>` in messages), while `value`
 * is the English string that is POSTED and printed in the enquiry email. One
 * vocabulary in the inbox whatever language the site was read in — otherwise
 * half the enquiries arrive filed under "Mission ou conseil" and the other
 * half under "Contract / consulting".
 */
export const ENQUIRY_REASONS = [
  { id: "project", value: "Project work" },
  { id: "contract", value: "Contract / consulting" },
  { id: "fulltime", value: "Full-time senior role" },
  { id: "other", value: "Something else" },
] as const;

/**
 * Skill groups. `id` is the key under the `Skills` namespace in messages —
 * the group heading is prose and is translated. The items are not: these are
 * product names, and "Node.js" is "Node.js" in French.
 */
export const SKILLS = [
  {
    id: "backend",
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
    id: "frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "infrastructure",
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
    id: "payments",
    items: ["Stripe", "Mobile money rails", "Remittance", "Multi-currency"],
  },
  {
    id: "other",
    items: [
      "Jest",
      "Vitest",
      "Git/GitHub",
      "OpenAI & Anthropic APIs",
      "Code review",
      "Tech leadership",
    ],
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;
};

/**
 * NOT TRANSLATED, AND NOT TO BE.
 *
 * These are four real people's own words, given in English. A French
 * "translation" of a quotation is a sentence that person never said, printed
 * under their name and their photograph — so the French site shows them
 * exactly as the English one does, quote, name and role alike. That is also
 * why they stay in this file rather than moving to messages/: there is no
 * second version of them to hold.
 */
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
