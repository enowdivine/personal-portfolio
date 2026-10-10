import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { engagementFor } from "@/lib/data";
import { alternatesFor, urlFor } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const PATH = "/contact";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: alternatesFor(locale, PATH),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: urlFor(locale, PATH),
      locale,
    },
  };
}

export default async function ContactPage({ searchParams }: PageProps) {
  // `/consulting` links here as `?type=Payment systems`. Reading it server-side
  // keeps the form a plain client component: `useSearchParams` would have
  // needed a Suspense boundary around it, for a value that is already known
  // when the page is rendered.
  //
  // Validated against the closed set in lib/data.ts rather than trusted: the
  // value is rendered as a chip and travels on into the enquiry email, so an
  // arbitrary string from the URL has no business reaching either.
  //
  // The parameter is still the ENGLISH type string it has always been, so every
  // link already published keeps working. What comes back from `engagementFor`
  // is the whole entry, which gives the form both halves it needs: the message
  // id for the label it prints, and the English type it posts.
  const raw = (await searchParams).type;
  const engagement = engagementFor(Array.isArray(raw) ? raw[0] : raw);

  return (
    <ContactForm
      engagementId={engagement?.id}
      engagementType={engagement?.type}
    />
  );
}
