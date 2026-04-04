import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import ContactForm from "./ContactForm";
import PageTransition from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Contact — Claim Remedy Adjusters",
  description:
    "Get in touch with Claim Remedy Adjusters. Call, WhatsApp, or visit our Miami Lakes office for a free claim review.",
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
