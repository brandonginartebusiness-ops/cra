import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import ContactForm from "./ContactForm";
import PageTransition from "@/components/ui/PageTransition";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Contact a Miami Public Adjuster",
  description:
    "Get a free claim review from Claim Remedy Adjusters. Call, WhatsApp, or visit our Miami Lakes office. Licensed Florida public adjusters — no recovery, no fee.",
  openGraph: {
    title: "Free Claim Review — Contact a Miami Public Adjuster",
    description:
      "Call, WhatsApp, or visit our Miami Lakes office for a free Florida insurance claim review.",
    url: "https://claimremedyadjusters.com/contact",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://claimremedyadjusters.com/contact",
    languages: {
      "en-US": "https://claimremedyadjusters.com/contact",
      "es-US": "https://claimremedyadjusters.com/es/contact",
    },
  },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <div className="pt-24">
        <h1 className="sr-only">Contact a Miami Public Adjuster — Free Claim Review</h1>
        <ContactForm />
        <Contact />
      </div>
    </PageTransition>
  );
}
