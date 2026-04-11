"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { processSteps } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="bg-[#f0ede8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#f0ede8] border border-[#1a1a2e]/8 rounded-2xl overflow-hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.step}
              variants={fadeInUp}
              className="bg-[#ffffff] p-8 flex flex-col gap-4"
            >
              <motion.div
                className="font-bebas text-6xl text-[#2563eb]/12 leading-none"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {step.step}
              </motion.div>
              <h3 className="font-semibold text-[#1a1a2e] text-lg">
                {step.title}
              </h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-[opacity,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
          >
            Get Your Free Claim Review
          </a>
        </div>
      </div>
    </section>
  );
}
