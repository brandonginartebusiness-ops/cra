import type { Metadata } from "next";
import EsContact from "@/components/sections/EsContact";
import EsContactForm from "./EsContactForm";
import { getDict } from "@/i18n/dictionaries";

const meta = getDict("es").meta;

export const metadata: Metadata = {
  title: meta.contactTitle,
  description: meta.contactDescription,
  alternates: {
    canonical: "https://claimremedyadjusters.com/es/contact",
    languages: {
      "en-US": "https://claimremedyadjusters.com/contact",
      "es-US": "https://claimremedyadjusters.com/es/contact",
    },
  },
  openGraph: { locale: "es_US" },
};

export default function EsContactPage() {
  return (
    <>
      <EsContact headingAs="h1" />
      <EsContactForm />
    </>
  );
}
