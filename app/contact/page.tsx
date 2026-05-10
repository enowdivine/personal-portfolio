import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Enow Divine — senior remote roles, payments/SaaS consulting, or technical due diligence.",
};

export default function ContactPage() {
  return <ContactForm />;
}
