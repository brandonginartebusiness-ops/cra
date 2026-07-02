import type { Metadata } from "next";
import EsHero from "@/components/sections/EsHero";
import EsContact from "@/components/sections/EsContact";
import { getDict } from "@/i18n/dictionaries";

const meta = getDict("es").meta;

export const metadata: Metadata = {
  // `absolute` bypasses the root "%s | Claim Remedy Adjusters" template — the
  // Spanish home title already carries the brand (matches the English homepage).
  title: { absolute: meta.homeTitle },
  description: meta.homeDescription,
  alternates: {
    canonical: "https://claimremedyadjusters.com/es",
    languages: {
      "x-default": "https://claimremedyadjusters.com",
      "en-US": "https://claimremedyadjusters.com",
      "es-US": "https://claimremedyadjusters.com/es",
    },
  },
  openGraph: { locale: "es_US" },
};

export default function EsHome() {
  return (
    <>
      <EsHero />
      <EsContact />
    </>
  );
}
