import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, allSlugs } from "@/data/cities";
import CityPageLayout from "@/components/templates/CityPageLayout";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = getCityBySlug(params.slug);
  if (!city) return {};

  const title = `Public Adjuster ${city.city} FL | Claim Remedy Adjusters`;
  const description = `Licensed public adjusters in ${city.city}, Florida. We handle hurricane, water, fire, roof, and mold damage claims. No recovery, no fee. Call (786) 223-7867.`;
  const url = `https://claimremedyadjusters.com/areas/${city.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `Public Adjuster in ${city.city}, Florida — Claim Remedy Adjusters`,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `Public Adjuster in ${city.city}, Florida`,
      description,
    },
    alternates: { canonical: url },
    keywords: [
      `public adjuster ${city.city}`,
      `public adjuster ${city.city} Florida`,
      `insurance claim help ${city.city}`,
      `${city.city} hurricane damage claim`,
      `${city.city} water damage claim`,
      `${city.county} public adjuster`,
      "public adjuster Florida",
      "Claim Remedy Adjusters",
    ],
  };
}

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.slug);
  if (!city) notFound();
  return <CityPageLayout city={city} />;
}
