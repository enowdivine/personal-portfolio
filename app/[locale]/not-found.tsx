import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  NotFoundPanel,
  NOT_FOUND_PRIMARY,
  NOT_FOUND_SECONDARY,
} from "@/components/NotFoundPanel";

/**
 * Locale-aware 404 for any URL under `/[locale]/*` that does not match a
 * route — which, because the proxy resolves a locale for every page request,
 * is the overwhelming majority of bad URLs. It renders inside LocaleLayout, so
 * the next-intl provider is in scope for `Link` and the translations, and the
 * visitor keeps the header, the footer and the language they were reading in.
 *
 * Paths the proxy never sees — /api, /health, and anything with a file
 * extension — fall through to `app/not-found.tsx` instead.
 */
export default async function NotFound() {
  const t = await getTranslations("NotFoundPage");

  return (
    <NotFoundPanel
      label={t("label")}
      title={t("title")}
      lede={t("lede")}
      consulting={
        <Link href="/consulting" className={NOT_FOUND_PRIMARY}>
          {t("consulting")}
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </Link>
      }
      home={
        <Link href="/" className={NOT_FOUND_SECONDARY}>
          {t("home")}
        </Link>
      }
    />
  );
}
