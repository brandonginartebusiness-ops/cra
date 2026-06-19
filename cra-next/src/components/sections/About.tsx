"use client";

import { m } from "framer-motion";
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
      className="relative py-16 lg:py-32"
    >

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Blue eyebrow */}
        <div className="flex items-center gap-3 mb-10 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
          <span className="w-8 h-px bg-[#2563eb]" />
          Meet your advocate
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-14 lg:gap-20 items-start">
          {/* Left: portrait, name, title, bio */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="flex flex-col items-start gap-5 max-w-xs"
          >
            <div
              className="w-56 rounded-2xl overflow-hidden border border-[#1a1a2e]/8"
              style={{ boxShadow: "0 12px 40px rgba(26,26,46,0.12)" }}
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
              <h2 className="font-bebas font-extrabold text-[2.2rem] text-[#f0f0f5] leading-none tracking-tight">
                Eddy D Gomez
              </h2>
              <p className="font-serif italic text-sm text-[#60a5fa] mt-1.5">
                Licensed Public Adjuster
              </p>
            </div>

            <p className="text-sm text-[#c0c0d0] leading-relaxed">
              Licensed by the State of Florida to represent homeowners and
              commercial property owners during the insurance claims process —
              never the insurance company.
            </p>
          </m.div>

          {/* Right: statement + ledger */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <p className="font-bebas font-extrabold text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] text-white/70 mb-12 max-w-2xl tracking-tight">
              <strong className="text-[#f0f0f5] font-extrabold">
                Every type of property claim.
              </strong>{" "}
              <em className="font-serif italic font-medium text-[#60a5fa] not-italic" style={{ fontStyle: "italic" }}>
                One dedicated advocate
              </em>{" "}
              who never works for the insurance company.
            </p>

            <div className="border border-[#1a1a2e]/8 rounded-2xl overflow-hidden bg-[#ffffff]">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`grid grid-cols-[auto_1fr] gap-6 px-6 py-4 ${
                    i < facts.length - 1 ? "border-b border-[#1a1a2e]/8" : ""
                  }`}
                >
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#2563eb] min-w-[140px]">
                    {f.label}
                  </span>
                  <span className="text-sm font-medium text-[#1a1a2e]">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
