import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale negotiation for every page request.
 *
 * `proxy.ts`, NOT `middleware.ts`. Next 16 renamed the convention — the
 * `middleware` filename and the `middleware` named export are both deprecated
 * (see node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md).
 * saassimplified.net still carries a `middleware.ts` because it is on Next 15;
 * this is the same file doing the same job under the current name. The default
 * export is the supported shape, and next-intl's factory returns exactly that,
 * so nothing about the next-intl side changes.
 *
 * What it does: resolves the locale from the path, then from the `NEXT_LOCALE`
 * cookie, then from `Accept-Language`, and writes that cookie back. The cookie
 * is why the language switcher does not need to persist anything itself — a
 * visitor who picks French once lands on French next time.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - api routes (/api/chat, /api/contact) and /health, which are not pages
  // - _next (Next.js internals)
  // - static files (images, fonts, the resume PDF, etc.)
  matcher: ["/", "/(fr)/:path*", "/((?!api|health|_next|.*\\..*).*)"],
};
