import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enowdivine.com"),
  title: {
    default: `${PROFILE.name} — ${PROFILE.title}`,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.summary,
  authors: [{ name: PROFILE.name }],
  openGraph: {
    type: "website",
    title: `${PROFILE.name} — ${PROFILE.title}`,
    description: PROFILE.summary,
    siteName: PROFILE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.title}`,
    description: PROFILE.summary,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.title,
  description: PROFILE.summary,
  email: `mailto:${PROFILE.email}`,
  url: "https://enowdivine.com",
  sameAs: [
    PROFILE.socials.github,
    PROFILE.socials.linkedin,
    PROFILE.socials.medium,
  ],
  knowsAbout: [
    "Software Engineering",
    "SaaS",
    "Payments",
    "Stripe",
    "Mobile Money",
    "Microservices",
    "Node.js",
    "Next.js",
    "React Native",
    "TypeScript",
  ],
  worksFor: {
    "@type": "Organization",
    name: "SaaS Simplified",
    url: "https://saassimplified.net",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Buea",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
