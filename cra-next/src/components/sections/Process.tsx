"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { processSteps } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="bg-[#0a0a0f] py-24 lg:py-32 border-t border-white/8">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111118] border border-white/8 rounded-2xl overflow-hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {processSteps.map((step) => (
            <motion.div
              key={step.step}
              variants={fadeInUp}
              className="bg-[#0a0a0f] p-8 flex flex-col gap-4"
            >
              <motion.div
                className="font-bebas text-6xl text-[#3b82f6]/10 leading-none"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {step.step}
              </motion.div>
              <h3 className="font-semibold text-[#f0f0f5] text-lg">
                {step.title}
              </h3>
              <p className="text-sm text-[#9999aa] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
