import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n/config";
import { SITE_URL } from "./data";

/**
 * Canonical and hreflang construction, in one place.
 *
 * Six route families each need a canonical plus the same en/fr pair, and the
 * prefix rule is a routing decision, not a per-page one: `localePrefix` is
 * "as-needed", so English URLs carry no prefix and French ones carry `/fr`.
 * Spelled out at six call sites that rule drifts the first time a seventh page
 * is added; here it cannot.
 *
 * `path` is the route WITHOUT a locale prefix and without a trailing slash —
 * "" for the home page, "/about", "/hire/typescript-engineer".
 */
export function urlFor(locale: string, path: string): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

/**
 * The `alternates` block every page under [locale] publishes: its own
 * canonical, and one hreflang entry per locale — including itself, which is
 * what the spec asks for and what stops the pair reading as one-directional.
 *
 * There is intentionally no `x-default`: this site has no language-neutral
 * landing page to point one at, and declaring English as the default twice
 * tells a crawler nothing it cannot read from the `en` entry.
 */
export function alternatesFor(
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: urlFor(locale, path),
    languages: Object.fromEntries(
      locales.map((candidate) => [candidate, urlFor(candidate, path)]),
    ),
  };
}
