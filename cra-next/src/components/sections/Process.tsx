"use client";

import { m } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { processSteps } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="py-16 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mb-14"
        >
          <SectionHeading
            label="How it works"
            heading="Damage to recovery<br/>in four steps."
          />
        </m.div>

        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-2xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {processSteps.map((step) => (
            <m.div
              key={step.step}
              variants={fadeInUp}
              className="relative bg-white/[0.03] p-10 min-h-[320px] flex flex-col overflow-hidden"
            >
              {/* Oversized background numeral */}
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute font-bebas font-extrabold leading-none text-[#60a5fa] tracking-tighter"
                style={{
                  top: "-0.18em",
                  right: "-0.05em",
                  fontSize: "clamp(140px, 16vw, 220px)",
                  opacity: 0.14,
                  letterSpacing: "-0.04em",
                }}
              >
                {step.step}
              </span>

              {/* Content sits bottom-left, on top of numeral */}
              <div className="relative mt-auto flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#60a5fa]">
                  <span className="w-5 h-px bg-[#60a5fa]" />
                  Step {step.step}
                </div>
                <h3 className="font-semibold text-[#f0f0f5] text-lg leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#c0c0d0] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-[opacity,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
          >
            Get My Free Claim Review
          </a>
          <p className="text-xs text-[#8888a0] -mt-1">No recovery, no fee.</p>
          <a
            href="/do-i-need-a-public-adjuster"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60a5fa] hover:text-[#93c5fd] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            Not sure you need a public adjuster? See if you do
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
