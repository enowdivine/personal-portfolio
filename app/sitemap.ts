import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { DOMAIN_TOPICS, HIRE_SPECIALTIES } from "@/lib/content";
import { urlFor } from "@/lib/seo";

/**
 * Every route in every locale, each entry carrying the full set of language
 * alternates.
 *
 * `urlFor` is the same helper the pages' canonicals use, so a sitemap URL and
 * the canonical on the page it points at cannot disagree about the prefix
 * rule — the one way a bilingual sitemap usually goes wrong.
 */

type Entry = { path: string; changeFrequency: "monthly" | "yearly"; priority: number };

const ROUTES: Entry[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/consulting", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ...HIRE_SPECIALTIES.map((specialty) => ({
    path: `/hire/${specialty.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  ...DOMAIN_TOPICS.map((topic) => ({
    path: `/domain/${topic.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: urlFor(locale, route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidate) => [candidate, urlFor(candidate, route.path)]),
        ),
      },
    })),
  );
}
