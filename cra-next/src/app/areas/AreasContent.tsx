"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import FloridaMap from "@/components/ui/FloridaMap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { cities, type CityData } from "@/data/cities";

// Preferred county display order — South Florida first, then by region tier
const COUNTY_ORDER = [
  "Miami-Dade County",
  "Broward County",
  "Palm Beach County",
  "Hillsborough County",
  "Pinellas County",
  "Sarasota County",
  "Lee County",
  "Collier County",
  "Orange County",
  "Duval County",
  "Leon County",
  "Alachua County",
  "Volusia County",
  "Marion County",
  "Monroe County",
];

function groupByCounty(list: CityData[]): Map<string, CityData[]> {
  const map = new Map<string, CityData[]>();
  for (const c of list) {
    const existing = map.get(c.county) ?? [];
    existing.push(c);
    map.set(c.county, existing);
  }
  // Sort each county's cities alphabetically
  for (const arr of map.values()) {
    arr.sort((a, b) => a.city.localeCompare(b.city));
  }
  return map;
}

export default function AreasContent() {
  const byCounty = useMemo(() => groupByCounty(cities), []);

  // Order: COUNTY_ORDER first, then anything else alphabetically
  const orderedCounties = useMemo(() => {
    const known = COUNTY_ORDER.filter((c) => byCounty.has(c));
    const extras = Array.from(byCounty.keys())
      .filter((c) => !COUNTY_ORDER.includes(c))
      .sort();
    return [...known, ...extras];
  }, [byCounty]);

  // Miami-Dade open by default — HQ county
  const [openCounties, setOpenCounties] = useState<Set<string>>(
    () => new Set(["Miami-Dade County"]),
  );

  const toggle = (county: string) => {
    setOpenCounties((prev) => {
      const next = new Set(prev);
      if (next.has(county)) next.delete(county);
      else next.add(county);
      return next;
    });
  };

  return (
    <div className="pt-24">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#60a5fa] mb-4">
              Statewide Coverage
            </span>
            <h1 className="font-bebas font-extrabold text-5xl md:text-6xl lg:text-7xl text-[#f0f0f5] leading-none tracking-tight mb-5">
              Public Adjusters<br />Across Florida
            </h1>
            <p className="text-lg text-[#c0c0d0] leading-relaxed max-w-xl">
              Licensed to represent homeowners and businesses in all 67 Florida
              counties. Find your county below for local claim expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Map + Stats ───────────────────────────────────────────── */}
      <section className="py-14 lg:py-28 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="flex justify-center lg:col-span-3"
            >
              <FloridaMap />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="lg:col-span-2"
            >
              <SectionHeading
                label="Our reach"
                heading="All of Florida.<br/>Every county."
              />
              <p className="text-base text-[#c0c0d0] leading-relaxed mt-4 mb-8">
                Claim Remedy Adjusters is a licensed Florida public adjusting
                firm based in Miami Lakes. We represent property owners from
                Pensacola to Key West — wherever your property is, we can
                fight for your claim.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-[#ffffff] rounded-xl p-4 text-center">
                  <AnimatedCounter
                    value={cities.length}
                    format="integer"
                    className="font-bebas font-bold text-3xl text-[#60a5fa]"
                  />
                  <p className="text-[0.65rem] uppercase tracking-wider text-[#a0a0b0] mt-1">Cities</p>
                </div>
                <div className="bg-[#ffffff] rounded-xl p-4 text-center">
                  <AnimatedCounter
                    value={orderedCounties.length}
                    format="integer"
                    className="font-bebas font-bold text-3xl text-[#60a5fa]"
                  />
                  <p className="text-[0.65rem] uppercase tracking-wider text-[#a0a0b0] mt-1">Counties</p>
                </div>
                <div className="bg-[#ffffff] rounded-xl p-4 text-center">
                  <AnimatedCounter
                    value={5.0}
                    format="decimal"
                    decimals={1}
                    suffix="★"
                    className="font-bebas font-bold text-3xl text-[#60a5fa]"
                  />
                  <p className="text-[0.65rem] uppercase tracking-wider text-[#a0a0b0] mt-1">Google</p>
                </div>
              </div>
              <a
                href="tel:+13057331670"
                className="inline-flex items-center gap-3 bg-white/5 border border-white/12 text-[#f0f0f5] font-semibold px-7 py-3.5 rounded-full hover:border-[#2563eb]/40 hover:bg-white/8 hover:shadow-[0_0_24px_rgba(37,99,235,0.18)] transition-[border-color,box-shadow,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call (305) 733-1670
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── County Accordions ─────────────────────────────────────── */}
      <section className="py-14 lg:py-28 border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="mb-14"
          >
            <SectionHeading
              label="Find your area"
              heading="Browse by county."
            />
          </motion.div>

          <div className="flex flex-col gap-3">
            {orderedCounties.map((county) => {
              const countyCities = byCounty.get(county) ?? [];
              const isOpen = openCounties.has(county);

              return (
                <motion.div
                  key={county}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                  className="bg-[#ffffff] rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(county)}
                    aria-expanded={isOpen}
                    aria-controls={`county-${county.replace(/\s+/g, "-")}`}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563eb]/60"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#2563eb]/15 border border-[#2563eb]/30 text-[#60a5fa] text-sm font-semibold tabular-nums flex-shrink-0"
                        aria-hidden="true"
                      >
                        {countyCities.length}
                      </span>
                      <div className="min-w-0">
                        <p className="text-base md:text-lg font-semibold text-[#f0f0f5] truncate">
                          {county}
                        </p>
                        <p className="text-xs text-[#a0a0b0] truncate">
                          {countyCities.length} {countyCities.length === 1 ? "city" : "cities"} served
                        </p>
                      </div>
                    </div>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#60a5fa] flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={`county-${county.replace(/\s+/g, "-")}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/8">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-4">
                            {countyCities.map((city) => (
                              <Link
                                key={city.slug}
                                href={`/areas/${city.slug}`}
                                className="group flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white/[0.03] border border-white/8 hover:border-[#2563eb]/35 hover:bg-white/[0.06] transition-[border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
                              >
                                <span className="text-sm font-medium text-[#f0f0f5] group-hover:text-[#60a5fa] transition-colors">
                                  {city.city}
                                </span>
                                <svg
                                  className="w-3.5 h-3.5 text-[#a0a0b0] group-hover:text-[#60a5fa] group-hover:translate-x-0.5 transition-[color,transform] duration-200 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  aria-hidden="true"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
          >
            <h2 className="font-bebas font-extrabold text-3xl md:text-4xl text-[#f0f0f5] leading-none tracking-tight mb-3">
              Don&apos;t see your county?
            </h2>
            <p className="text-base text-[#c0c0d0] mb-7">
              We&apos;re licensed statewide. Call us — we serve all 67 Florida counties.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,99,235,0.3)] transition-[opacity,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
              >
                Get Your Free Claim Review
              </Link>
              <a
                href="tel:+13057331670"
                className="inline-flex items-center gap-3 bg-white/5 border border-white/12 text-[#f0f0f5] font-semibold px-7 py-3.5 rounded-full hover:border-[#2563eb]/40 hover:bg-white/8 transition-[border-color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
              >
                Call (305) 733-1670
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
