"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import FloridaMap from "@/components/ui/FloridaMap";
import { cities, citiesByRegion, regionOrder } from "@/data/cities";

const REGION_LABELS: Record<string, string> = {
  "South Florida — Miami-Dade": "South Florida — Miami-Dade County",
  "South Florida — Broward": "South Florida — Broward County",
  "South Florida — Palm Beach": "South Florida — Palm Beach County",
  "Gulf Coast": "Gulf Coast",
  "Central Florida": "Central Florida",
  "North Florida": "North Florida",
  "Florida Keys": "Florida Keys",
};

export default function AreasContent() {
  const byRegion = citiesByRegion();

  return (
    <div className="pt-24 bg-[#faf8f5]">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-4">
              Statewide Coverage
            </span>
            <h1 className="font-bebas font-extrabold text-5xl md:text-6xl lg:text-7xl text-[#1a1a2e] leading-none tracking-tight mb-5">
              Public Adjusters<br />Across Florida
            </h1>
            <p className="text-lg text-[#5a5a72] leading-relaxed max-w-xl">
              Licensed to represent homeowners and businesses in all 67 Florida
              counties. Find your city below for local claim expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Map + Stats ───────────────────────────────────────────── */}
      <section className="bg-[#ffffff] py-20 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="flex justify-center"
            >
              <FloridaMap />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
            >
              <SectionHeading
                label="Our reach"
                heading="All of Florida.<br/>Every county."
              />
              <p className="text-base text-[#5a5a72] leading-relaxed mt-4 mb-8">
                Claim Remedy Adjusters is a licensed Florida public adjusting firm
                based in Miami Lakes. We represent property owners from Pensacola
                to Key West — wherever your property is, we can fight for your
                claim.
              </p>
              <div className="grid grid-cols-3 gap-5 mb-8">
                <div className="bg-[#faf8f5] border border-[#1a1a2e]/8 rounded-xl p-5 text-center">
                  <p className="font-bebas font-bold text-3xl text-[#2563eb]">{cities.length}</p>
                  <p className="text-xs text-[#8888a0] mt-1">Cities Covered</p>
                </div>
                <div className="bg-[#faf8f5] border border-[#1a1a2e]/8 rounded-xl p-5 text-center">
                  <p className="font-bebas font-bold text-3xl text-[#2563eb]">67</p>
                  <p className="text-xs text-[#8888a0] mt-1">FL Counties</p>
                </div>
                <div className="bg-[#faf8f5] border border-[#1a1a2e]/8 rounded-xl p-5 text-center">
                  <p className="font-bebas font-bold text-3xl text-[#2563eb]">5.0★</p>
                  <p className="text-xs text-[#8888a0] mt-1">Google Rating</p>
                </div>
              </div>
              <a
                href="tel:+17862237867"
                className="inline-flex items-center gap-3 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-full hover:border-[#2563eb]/30 hover:shadow-[0_0_24px_rgba(37,99,235,0.08)] transition-[border-color,box-shadow] duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call (786) 223-7867
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── City Grid by Region ───────────────────────────────────── */}
      <section className="bg-[#f0ede8] py-20 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-14"
          >
            <SectionHeading
              label="Find your city"
              heading="Browse by region."
            />
          </motion.div>

          <div className="flex flex-col gap-14">
            {regionOrder.map((region) => {
              const regionCities = byRegion.get(region) ?? [];
              if (regionCities.length === 0) return null;
              return (
                <motion.div
                  key={region}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                >
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-6">
                    {REGION_LABELS[region] ?? region}
                  </h2>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {regionCities.map((city) => (
                      <motion.div key={city.slug} variants={fadeInUp}>
                        <Link
                          href={`/areas/${city.slug}`}
                          className="flex flex-col bg-[#ffffff] border border-[#1a1a2e]/8 rounded-xl p-5 hover:border-[#2563eb]/25 hover:shadow-[0_4px_24px_rgba(37,99,235,0.08)] transition-[border-color,box-shadow] duration-300 group h-full"
                        >
                          <p className="text-xs text-[#8888a0] mb-1">{city.county}</p>
                          <p className="text-base font-semibold text-[#1a1a2e] group-hover:text-[#2563eb] transition-colors mb-3">
                            {city.city}
                          </p>
                          <p className="text-xs text-[#8888a0] leading-relaxed flex-1 line-clamp-2">
                            {city.commonDamageTypes.map((d) => d.label).join(" · ")}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs text-[#2563eb] mt-3 group-hover:gap-2 transition-[gap] duration-200">
                            Learn more
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-16 lg:py-20 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
          >
            <h2 className="font-bebas font-extrabold text-3xl md:text-4xl text-[#1a1a2e] leading-none tracking-tight mb-3">
              Don&apos;t see your city?
            </h2>
            <p className="text-base text-[#5a5a72] mb-7">
              We&apos;re licensed statewide. Call us — we serve all 67 Florida counties.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,99,235,0.3)] transition-[opacity,box-shadow] duration-300"
              >
                Get Your Free Claim Review
              </Link>
              <a
                href="tel:+17862237867"
                className="inline-flex items-center gap-3 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-full hover:border-[#2563eb]/30 transition-[border-color] duration-300"
              >
                Call (786) 223-7867
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
