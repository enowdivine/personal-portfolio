import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatLauncher } from "@/components/chat/chat-launcher";
import { PROFILE, SITE_URL } from "@/lib/data";
import "../globals.css";

/* Body face. Neutral on purpose — it is read on cheap Android phones as often
   as on a laptop, and Inter's hinting holds up there.

   `latin-ext` as well as `latin` since the site went bilingual: French copy is
   half of it now, and the circumflex/cedilla set plus the œ ligature live
   outside the basic latin subset. */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/* Display face — every heading, via the base layer in globals.css rather than
   a utility at each call site. Variable on the weight axis, so one file covers
   the 600 small labels want and the 800 the hero needs.

   Same two faces as saassimplified.net, which is the point: the sites link to
   each other and must read as one brand. */
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-face",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Site-wide metadata DEFAULTS, per locale.
 *
 * Every page under here sets its own title, description, canonical and
 * hreflang pair; what this owns is the part that is the same on all of them —
 * `metadataBase`, and the `%s · Enow Divine` template the per-page titles are
 * threaded through.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Profile" });
  const siteTitle = t("siteTitle");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteTitle,
      template: `%s · ${PROFILE.name}`,
    },
    description: t("summary"),
    authors: [{ name: PROFILE.name }],
    openGraph: {
      type: "website",
      title: siteTitle,
      description: t("summary"),
      siteName: PROFILE.name,
      locale,
      alternateLocale: routing.locales.filter(
        (candidate) => candidate !== locale,
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: t("summary"),
    },
  };
}

/**
 * THE ROOT LAYOUT — and it is here, under `[locale]`, rather than in
 * `app/layout.tsx`. That is the one place this site's structure departs from
 * saassimplified.net's, and the reason is Next 16.
 *
 * `<html lang>` has to be correct in both languages, which means the document
 * element needs the locale. A root `app/layout.tsx` has no `params`, so the
 * only way to get it there is `getLocale()` — a dynamic request read. On
 * Next 15 (which the agency site runs) that is survivable. On Next 16 it opts
 * the entire tree out of static generation: measured, every route including
 * the thirteen `generateStaticParams` pages dropped to server-rendered-on-
 * demand, and `next build` emitted exactly one HTML file. `unstable_rootParams`
 * would have solved it; Next 16 removed it with no replacement yet (see
 * node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md).
 *
 * So the document shell lives at the first level where the locale is a static
 * route param. The division of labour the agency site draws between its two
 * layouts is kept — document concerns, then provider, then chrome — it is just
 * drawn inside one file instead of across two. `app/not-found.tsx` still sits
 * above this segment, and still works: with no `app/layout.tsx` to nest it in,
 * Next gives it a document of its own.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required by next-intl v4 for static rendering under this segment. Every
  // page below calls it too: on Next 16 a layout and the page inside it are
  // rendered as separate tasks, so the locale this sets is not guaranteed to
  // still be in scope by the time the page's own `getTranslations()` runs.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${display.variable} h-full`}
    >
      {/* The Person JSON-LD used to live here, which published the same entity
          on every route including the programmatic /hire and /domain pages that
          carry their own ProfilePage graph. It now lives on the landing page
          only — one canonical description of the person, on the URL that is
          actually about him. */}
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* All three of these call `useTranslations`, so all three have to
              sit under the provider. They are still direct children of the
              flex column that pins the footer to the bottom — the provider
              renders no element of its own. */}
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatLauncher />
        </NextIntlClientProvider>
        {/* Both cookieless — they store no identifier and set nothing, so they
            need no consent, and nothing in them is translated. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
