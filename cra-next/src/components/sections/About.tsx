"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { slideInLeft, slideInRight } from "@/lib/animations";

const facts = [
  { label: "Coverage area", value: "All of Florida" },
  { label: "Fee structure", value: "No recovery, no fee" },
  {
    label: "Claims handled",
    value: "Hurricane · Water · Fire · Roof · Mold · Commercial",
  },
  { label: "Adjuster license", value: "W549958 (Eddy D Gomez)" },
  { label: "Firm license", value: "G084250 (Claim Remedy Adjusters)" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#1a1a2e] text-[#faf8f5] py-24 lg:py-32 overflow-hidden"
    >
      {/* Ambient gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 20%, rgba(184,137,46,0.10), transparent 70%), radial-gradient(ellipse 60% 60% at 90% 90%, rgba(37,99,235,0.15), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Gold eyebrow */}
        <div className="flex items-center gap-3 mb-10 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#b8892e]">
          <span className="w-8 h-px bg-[#b8892e]" />
          Meet your advocate
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-14 lg:gap-20 items-start">
          {/* Left: portrait, name, title, bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="flex flex-col items-start gap-5 max-w-xs"
          >
            <div
              className="w-56 rounded-2xl overflow-hidden border border-[#b8892e]/30"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            >
              <Image
                src="/brand_assets/eddy_headshot.jpeg"
                alt="Eddy D Gomez, Licensed Public Adjuster"
                width={224}
                height={260}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <h2 className="font-bebas font-extrabold text-[2.2rem] text-[#faf8f5] leading-none tracking-tight">
                Eddy D Gomez
              </h2>
              <p className="font-serif italic text-sm text-[#b8892e] mt-1.5">
                Licensed Public Adjuster
              </p>
            </div>

            <p className="text-sm text-[#c9c9d6] leading-relaxed">
              Licensed by the State of Florida to represent homeowners and
              commercial property owners during the insurance claims process —
              never the insurance company.
            </p>
          </motion.div>

          {/* Right: statement + ledger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <p className="font-bebas font-extrabold text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] text-white/40 mb-12 max-w-2xl tracking-tight">
              <strong className="text-[#faf8f5] font-extrabold">
                Every type of property claim.
              </strong>{" "}
              <em className="font-serif italic font-medium text-[#b8892e] not-italic" style={{ fontStyle: "italic" }}>
                One dedicated advocate
              </em>{" "}
              who never works for the insurance company.
            </p>

            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`grid grid-cols-[auto_1fr] gap-6 px-6 py-4 ${
                    i < facts.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#b8892e] min-w-[140px]">
                    {f.label}
                  </span>
                  <span className="text-sm font-medium text-[#faf8f5]">
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
