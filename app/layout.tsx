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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
