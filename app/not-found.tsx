import "./globals.css";
import {
  NotFoundPanel,
  NOT_FOUND_PRIMARY,
  NOT_FOUND_SECONDARY,
} from "@/components/NotFoundPanel";

/**
 * Root 404 — the last resort.
 *
 * `app/[locale]/not-found.tsx` handles anything the locale proxy routes into a
 * locale segment, which is nearly every bad URL. This file catches what that
 * never sees: the paths excluded by the proxy matcher (/api, /health, and
 * anything containing a dot), and a `notFound()` thrown while the locale
 * itself is being resolved.
 *
 * Deliberately translation-free and provider-free: at this point no locale has
 * been resolved, so `useTranslations` would have no NextIntlClientProvider
 * above it and a `Link` from next-intl could not build a prefixed href. Native
 * anchors and English copy are the correct trade — an English 404 beats a
 * crashing one. It renders without the header and footer for the same reason:
 * both are translated, and both live under the provider.
 *
 * It imports globals.css itself: with no `app/layout.tsx` above it (see
 * app/[locale]/layout.tsx for why there is none), Next hands this route a bare
 * document of its own, and nothing else would pull the stylesheet in. The two
 * webfonts are NOT loaded here — they are `next/font` variables set on the
 * `<html>` element this route does not own, so the type falls back to the
 * system stack. For a page only /api and dotted paths can ever reach, one
 * substituted typeface is the right trade against shipping two font files to
 * every 404.
 */
export default function RootNotFound() {
  return (
    <NotFoundPanel
      label="404"
      title="That page is not here."
      lede="It may have moved, or it may never have existed. The work itself is still one click away."
      consulting={
        <a href="/consulting" className={NOT_FOUND_PRIMARY}>
          See consulting
        </a>
      }
      home={
        <a href="/" className={NOT_FOUND_SECONDARY}>
          Back to home
        </a>
      }
    />
  );
}
