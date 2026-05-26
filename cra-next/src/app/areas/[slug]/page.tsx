import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCityBySlug, allSlugs } from "@/data/cities";
import CityPageLayout from "@/components/templates/CityPageLayout";

// Next.js 15+: params is a Promise
interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

function buildCityDescription(city: ReturnType<typeof getCityBySlug>): string {
  if (!city) return "";
  const risks = city.localFacts.uniqueRisks;
  if (risks) {
    const shortRisk = risks.length > 70 ? risks.slice(0, 67).trim() + "…" : risks;
    return `${city.city}, Florida public adjusters. Local expertise on ${shortRisk}. No recovery, no fee. Call (305) 733-1670.`;
  }
  const storm = city.localFacts.stormHistory;
  if (storm) {
    return `Licensed ${city.city} public adjusters. ${city.county} claim experience including ${storm.split(";")[0]}. No recovery, no fee.`;
  }
  return `Licensed public adjusters serving ${city.city}, Florida (${city.county}). Hurricane, water, fire, and roof damage claims. No recovery, no fee.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Public Adjuster ${city.city} FL | Claim Remedy Adjusters`;
  const description = buildCityDescription(city);
  const url = `https://claimremedyadjusters.com/areas/${city.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `Public Adjuster in ${city.city}, Florida — Claim Remedy Adjusters`,
      description,
      url,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Public Adjuster in ${city.city}, Florida`,
      description,
      images: ["/opengraph-image"],
    },
    alternates: { canonical: url },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  return <CityPageLayout city={city} />;
}
