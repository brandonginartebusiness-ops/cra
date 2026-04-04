"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import FloridaMap from "@/components/ui/FloridaMap";

const cities = [
  "Jacksonville", "Tallahassee", "Gainesville", "Ocala",
  "Daytona Beach", "Orlando", "Tampa", "St. Petersburg",
  "Clearwater", "Sarasota", "Fort Myers", "Naples",
  "West Palm Beach", "Boca Raton", "Fort Lauderdale",
  "Hollywood", "Miami", "Miami Lakes", "Hialeah",
  "Homestead", "Key West",
];

export default function ServiceAreaMap() {
  return (
    <section className="bg-[#111118] py-20 lg:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="flex justify-center"
          >
            <FloridaMap />
          </motion.div>

          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#3b82f6] mb-3">
              Service Area
            </span>
            <h2 className="font-bebas text-4xl md:text-5xl text-[#f0f0f5] leading-none tracking-tight mb-4">
              Statewide Coverage
            </h2>
            <p className="text-base text-[#9999aa] leading-relaxed mb-8">
              Licensed to represent homeowners and businesses across all 67
              Florida counties.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mb-8">
              {cities.map((city) => (
                <span
                  key={city}
                  className={`text-sm ${
                    city === "Miami" || city === "Miami Lakes"
                      ? "text-[#3b82f6] font-semibold"
                      : "text-[#9999aa]"
                  }`}
                >
                  {city}
                </span>
              ))}
            </div>

            <p className="text-sm text-[#666677] mb-4">
              Serving all of Florida
            </p>
            <a
              href="tel:+17862237867"
              className="inline-flex items-center gap-3 bg-[#16161f] border border-white/10 text-[#f0f0f5] font-semibold px-7 py-3.5 rounded-full hover:border-[#3b82f6]/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] transition-all duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call (786) 223-7867
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
