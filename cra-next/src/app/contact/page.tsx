import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import ContactForm from "./ContactForm";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Free Claim Review — Contact a Miami Public Adjuster",
  description:
    "Get a free claim review from Claim Remedy Adjusters. Call, WhatsApp, or visit our Miami Lakes office. Licensed Florida public adjusters — no recovery, no fee.",
  openGraph: {
    title: "Free Claim Review — Contact a Miami Public Adjuster",
    description:
      "Call, WhatsApp, or visit our Miami Lakes office for a free Florida insurance claim review.",
    url: "https://claimremedyadjusters.com/contact",
  },
  alternates: { canonical: "https://claimremedyadjusters.com/contact" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <Contact />
        <ContactForm />
      </div>
    </PageTransition>
  );
}
