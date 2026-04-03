"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

const facts = [
  { label: "Coverage area", value: "All of Florida" },
  { label: "License", value: "W549958" },
  { label: "Fee structure", value: "No recovery, no fee" },
  {
    label: "Claims handled",
    value: "Hurricane · Water · Fire · Roof · Mold · Commercial",
  },
  { label: "Direct line", value: "(786) 223-7867", href: "tel:+17862237867" },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#0a0a0f] py-24 lg:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: photo + kickers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-8"
          >
            <div className="w-48 shrink-0 rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
              <Image
                src="/brand_assets/eddy_headshot.jpeg"
                alt="Eddy D Gomez, Licensed Public Adjuster"
                width={192}
                height={220}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <SectionHeading
                label="Authority & trust"
                heading="Eddy D Gomez<br/>Public Adjuster"
              />
              <p className="mt-4 text-sm text-[#9999aa] leading-relaxed max-w-xs">
                Licensed by the State of Florida to represent homeowners and
                commercial property owners during the insurance claims process —
                never the insurance company.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Florida License W549958", "No upfront fee", "(786) 223-7867"].map(
                  (k) => (
                    <span
                      key={k}
                      className="text-xs border border-white/10 text-[#9999aa] px-3 py-1 rounded-full"
                    >
                      {k}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: fact table + statement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <p className="font-bebas text-3xl md:text-4xl text-[#9999aa] leading-tight mb-10">
              <strong className="text-[#f0f0f5]">
                Every type of property claim.
              </strong>{" "}
              One dedicated advocate who never works for the insurance company.
            </p>

            <div className="border border-white/8 rounded-2xl overflow-hidden">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex flex-col gap-0.5 px-5 py-4 ${
                    i < facts.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="text-[0.68rem] font-semibold uppercase tracking-widest text-[#666677]">
                    {f.label}
                  </span>
                  {f.href ? (
                    <a
                      href={f.href}
                      className="text-sm font-medium text-[#3b82f6] hover:underline"
                    >
                      {f.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-[#f0f0f5]">
                      {f.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
