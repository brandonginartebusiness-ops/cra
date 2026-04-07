"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";
import PageTransition from "@/components/ui/PageTransition";

const serviceCards = [
  {
    title: "Storm & Hurricane",
    description:
      "Hurricane-force winds, tropical storms, and severe weather events cause some of the most extensive property damage Florida homeowners face.",
    image: "",
    alt: "Aerial view of hurricane damage to Florida neighborhood",
    href: "/services/storm-hurricane",
  },
  {
    title: "Water Damage",
    description:
      "A burst pipe, a slow leak behind a wall, or flooding from a failed appliance can saturate drywall, subfloor, and insulation in hours.",
    image: "",
    alt: "Interior water damage with standing water and peeling walls",
    href: "/services/water-damage",
  },
  {
    title: "Fire & Smoke",
    description:
      "Fire and smoke damage extends far beyond the burn zone. Smoke particles penetrate HVAC systems, embed in soft furnishings, and corrode fixtures.",
    image: "",
    alt: "Exterior of fire-damaged building with charred structure",
    href: "/services/fire-smoke",
  },
  {
    title: "Roof Claims",
    description:
      "Roof claims are the most contested category in Florida. Without independent engineering evidence, homeowners are fighting blind.",
    image: "",
    alt: "Aerial view of storm-damaged roof",
    href: "/services/roof-claims",
  },
  {
    title: "Appraisal Services",
    description:
      "When you and your insurance company cannot agree on the amount of a covered loss, the appraisal process puts valuation in independent hands.",
    image: "",
    alt: "Appraisal services",
    href: "/services/appraisal",
  },
];

export default function ServicesContent() {
  return (
    <PageTransition>
      <div className="pt-24">
        <section className="bg-[#0a0a0f] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-14"
            >
              <SectionHeading
                label="Our services"
                heading="Property damage claims handled<br/>with Florida-specific experience."
                subheading="We focus exclusively on property damage insurance claims in Florida. Claim Remedy is built to move quickly, document thoroughly, and fight for the recovery your policy should support."
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {serviceCards.map((s) => (
                <motion.div
                  key={s.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={s.href}
                    className="group block bg-[#0a0a0f] border border-white/8 rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] hover:border-[#3b82f6]/20 transition-shadow transition-colors duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-white flex items-center justify-center">
                          <span className="font-bebas text-2xl text-[#3b82f6]/40">
                            {s.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-[#f0f0f5] text-base mb-1.5">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[#9999aa] leading-relaxed mb-3">
                        {s.description}
                      </p>
                      <span className="text-sm text-[#3b82f6] font-medium group-hover:underline">
                        Learn More &rarr;
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <ServiceAreaMap />
      </div>
    </PageTransition>
  );
}
