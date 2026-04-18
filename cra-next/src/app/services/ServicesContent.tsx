"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceAreaMap from "@/components/sections/ServiceAreaMap";
import PageTransition from "@/components/ui/PageTransition";
import { services } from "@/data/services";

export default function ServicesContent() {
  return (
    <PageTransition>
      <div className="pt-24 bg-[#0a0a0f]">
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
                dark
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {services.map((s) => (
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
                      <span className="text-sm text-[#3b82f6] font-medium group-hover:underline inline-flex items-center gap-1.5">
                        {s.ctaLabel}
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
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
