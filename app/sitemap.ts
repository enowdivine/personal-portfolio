import type { MetadataRoute } from "next";
import { HIRE_SPECIALTIES, DOMAIN_TOPICS } from "@/lib/data";

const SITE = "https://enowdivine.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/consulting`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const hireEntries: MetadataRoute.Sitemap = HIRE_SPECIALTIES.map((s) => ({
    url: `${SITE}/hire/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const domainEntries: MetadataRoute.Sitemap = DOMAIN_TOPICS.map((s) => ({
    url: `${SITE}/domain/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...hireEntries, ...domainEntries];
}
