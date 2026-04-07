"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

const facts = [
  { label: "Coverage area", value: "All of Florida" },
  { label: "Fee structure", value: "No recovery, no fee" },
  {
    label: "Claims handled",
    value: "Hurricane · Water · Fire · Roof · Mold · Commercial",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#0a0a0f] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: photo → name → title → bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="flex flex-col items-start gap-5"
          >
            <div className="w-48 rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
              <Image
                src="/brand_assets/eddy_headshot.jpeg"
                alt="Eddy D Gomez, Licensed Public Adjuster"
                width={192}
                height={220}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <h2 className="font-bebas text-4xl md:text-5xl text-[#f0f0f5] leading-none tracking-tight">
                Eddy D Gomez
              </h2>
              <p className="font-bebas text-base text-[#3b82f6] tracking-[0.2em] mt-1">
                Public Adjuster
              </p>
            </div>

            <p className="text-sm text-[#9999aa] leading-relaxed max-w-xs">
              Licensed by the State of Florida to represent homeowners and
              commercial property owners during the insurance claims process —
              never the insurance company.
            </p>
          </motion.div>

          {/* Right: statement + fact table */}
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
                    i < facts.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <span className="text-[0.68rem] font-semibold uppercase tracking-widest text-[#666677]">
                    {f.label}
                  </span>
                  <span className="text-sm font-medium text-[#f0f0f5]">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
