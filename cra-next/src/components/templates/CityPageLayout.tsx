import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";
import CityCaseResultCard from "@/components/ui/CityCaseResultCard";
import CityServiceSchema from "@/components/seo/CityServiceSchema";
import { caseResults } from "@/data/results";
import type { CityData } from "@/data/cities";

const SERVICE_LINKS: Record<string, string> = {
  "storm-hurricane": "/services/storm-hurricane",
  "water-damage": "/services/water-damage",
  "fire-smoke": "/services/fire-smoke",
  "roof-claims": "/services/roof-claims",
  appraisal: "/services/appraisal",
  "mold-claims": "/services/mold-claims",
  "commercial-property": "/services/commercial-property",
  "denied-claims": "/services/denied-claims",
};

const DAMAGE_ICONS: Record<string, React.ReactElement> = {
  "storm-hurricane": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
  "water-damage": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  ),
  "roof-claims": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "fire-smoke": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  appraisal: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  "mold-claims": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  "commercial-property": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V5a1 1 0 011-1h8a1 1 0 011 1v16M15 21V9a1 1 0 011-1h2a1 1 0 011 1v12M9 8h2M9 12h2M9 16h2" />
    </svg>
  ),
  "denied-claims": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a1 1 0 001 1h4M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8M14 3l5 5m-8.5 4.5l3 3m0-3l-3 3" />
    </svg>
  ),
};

interface Props {
  city: CityData;
}

export default function CityPageLayout({ city }: Props) {
  const caseResult =
    caseResults.find((r) =>
      city.featuredCaseType ? r.type === city.featuredCaseType : r.type === "Hurricane Claim"
    ) ?? caseResults[0];

  const waLink = `https://wa.me/13057331670?text=Hi%20Claim%20Remedy%2C%20I%27d%20like%20to%20discuss%20a%20claim%20in%20${encodeURIComponent(city.city)}%2C%20Florida.`;

  return (
    <div className="pt-24 bg-[#faf8f5]">
      <CityServiceSchema city={city} />

      {/* ── Section 1: Hero ──────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-2 text-xs text-[#8888a0] mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#1a1a2e] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/areas" className="hover:text-[#1a1a2e] transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-[#5a5a72]">{city.city}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cra-blue mb-4">
              {city.county} · {city.region}
            </span>
            <h1 className="font-bebas font-extrabold text-5xl md:text-6xl lg:text-7xl text-[#1a1a2e] leading-none tracking-tight mb-5">
              {`Public Adjuster in ${city.city}, Florida`}
            </h1>
            <p className="text-lg text-[#5a5a72] leading-relaxed mb-8 max-w-xl">
              Licensed public adjusters serving {city.city} homeowners and businesses.
              Your claim. Our fight.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 bg-cra-blue text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-[opacity,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cra-blue/60"
              >
                Get My Free Claim Review
              </Link>
              <a
                href="tel:+13057331670"
                className="inline-flex items-center justify-center gap-2 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-full hover:border-[#1a1a2e]/25 transition-[border-color] duration-200"
              >
                Call (305) 733-1670
              </a>
            </div>
            <p className="text-xs text-[#8888a0] mt-3">No recovery, no fee.</p>
          </div>
        </div>
      </section>

      {/* ── Section 2: City-Specific Content ─────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            <div>
              <SectionHeading
                label={`${city.city} Claims`}
                heading={`Insurance claims in<br/>${city.city}.`}
              />
              <div className="mt-8 flex flex-col gap-5">
                {city.description.map((para, i) => (
                  <p key={i} className="text-base text-[#3a3a52] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 h-fit">
                <h2 className="font-bebas font-bold text-2xl text-[#1a1a2e] mb-6 tracking-tight">
                  {city.city} Property Facts
                </h2>
                <dl className="flex flex-col gap-5">
                  {city.localFacts.population && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[#5a5a72] mb-1">Population</dt>
                      <dd className="text-sm text-[#1a1a2e]">{city.localFacts.population}</dd>
                    </div>
                  )}
                  {city.localFacts.commonPropertyTypes && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[#5a5a72] mb-1">Common Property Types</dt>
                      <dd className="text-sm text-[#3a3a52] leading-relaxed">{city.localFacts.commonPropertyTypes}</dd>
                    </div>
                  )}
                  {city.localFacts.stormHistory && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[#5a5a72] mb-1">Storm History</dt>
                      <dd className="text-sm text-[#3a3a52] leading-relaxed">{city.localFacts.stormHistory}</dd>
                    </div>
                  )}
                  {city.localFacts.floodZone && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[#5a5a72] mb-1">Flood Zone</dt>
                      <dd className="text-sm text-[#3a3a52] leading-relaxed">{city.localFacts.floodZone}</dd>
                    </div>
                  )}
                  {city.localFacts.uniqueRisks && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[#5a5a72] mb-1">Unique Risks</dt>
                      <dd className="text-sm text-[#3a3a52] leading-relaxed">{city.localFacts.uniqueRisks}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Damage Types ───────────────────────────────────── */}
      <section className="bg-[#f0ede8] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeading
              label="What we handle"
              heading={`Common claims in<br/>${city.city}.`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {city.commonDamageTypes.map((dt) => (
              <Link
                key={dt.label}
                href={SERVICE_LINKS[dt.slug] ?? "/services"}
                className="flex items-center gap-4 bg-[#ffffff] border border-[#1a1a2e]/8 rounded-xl p-5 hover:border-cra-blue/25 hover:shadow-[0_4px_24px_rgba(37,99,235,0.08)] transition-[border-color,box-shadow] duration-300 group min-h-[72px]"
              >
                <span className="text-cra-blue shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {DAMAGE_ICONS[dt.slug] ?? DAMAGE_ICONS["roof-claims"]}
                </span>
                <span className="text-sm font-semibold text-[#1a1a2e]">{dt.label}</span>
                <svg className="w-3.5 h-3.5 ml-auto text-cra-blue/50 group-hover:text-cra-blue transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Case Result ────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionHeading
              label="Proven result"
              heading="Real recovery.<br/>Real review."
              className="text-center"
            />
          </div>

          <CityCaseResultCard
            citySlug={city.slug}
            caseResult={{
              type: caseResult.type,
              initial: caseResult.initial,
              initialLabel: caseResult.initialLabel,
              recovered: caseResult.recovered,
              review: {
                text: caseResult.review.text,
                author: caseResult.review.author,
                timeAgo: caseResult.review.timeAgo,
              },
            }}
          />

          <p className="mt-8 text-center text-xs text-[#8888a0] leading-relaxed">
            Recovery shown is an illustrative outcome from an individual client
            case. Individual results vary by policy, coverage, and the facts of
            each claim. Past results do not guarantee future outcomes.
          </p>
        </div>
      </section>

      {/* ── Section 5: Lead Form ──────────────────────────────────────── */}
      <section id="lead-form" className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-bebas font-extrabold text-4xl md:text-5xl text-[#1a1a2e] leading-none tracking-tight mb-3">
              Free Claim Review in {city.city}
            </h2>
            <p className="text-base text-[#3a3a52]">
              Our team will call you within the hour. No recovery, no fee.
            </p>
          </div>
          <LeadCaptureForm servicePage={city.slug} ctaText="Get My Free Claim Review" />
        </div>
      </section>

      {/* ── Section 6: Nearby Areas ───────────────────────────────────── */}
      {city.nearbyAreas.length > 0 && (
        <section className="bg-[#f0ede8] py-16 lg:py-20 border-t border-[#1a1a2e]/8">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5a72] mb-5">
              We also serve nearby areas
            </p>
            <div className="flex flex-wrap gap-3">
              {city.nearbyAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#ffffff] border border-[#1a1a2e]/8 text-sm text-[#3a3a52] px-4 py-2 rounded-full hover:border-cra-blue/30 hover:text-[#1a1a2e] transition-[border-color,color] duration-200"
                >
                  {area.name}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              <Link
                href="/areas"
                className="inline-flex items-center gap-1.5 bg-[#ffffff] border border-[#1a1a2e]/8 text-sm text-cra-blue px-4 py-2 rounded-full hover:border-cra-blue/30 transition-[border-color] duration-200"
              >
                All service areas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Section 7: CTA Banner ─────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-16 lg:py-20 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-bebas font-extrabold text-3xl md:text-4xl text-[#1a1a2e] leading-none tracking-tight mb-6">
            Need a Public Adjuster in {city.city}? Call (305) 733-1670
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25d366] text-cra-bg font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] transition-[opacity,box-shadow] duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+13057331670"
              className="inline-flex items-center gap-3 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-full hover:border-cra-blue/30 hover:shadow-[0_0_24px_rgba(37,99,235,0.08)] transition-[border-color,box-shadow] duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call (305) 733-1670
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
