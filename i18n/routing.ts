import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  /* Same choice as saassimplified.net: no prefix on the default locale, so
     every English URL this site has already been indexed under — /, /about,
     /hire/<slug> — stays exactly where it is, and French lives under /fr. The
     alternative (`always`) would 301 the entire existing index to /en. */
  localePrefix: "as-needed",
});

// Lightweight wrappers around Next.js navigation APIs
// that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
