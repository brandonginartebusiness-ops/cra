"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";

export default function ContactForm() {
  return (
    <section className="bg-[#111118] py-20 lg:py-28 border-t border-white/8">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <h2 className="font-bebas text-4xl md:text-5xl text-[#f0f0f5] leading-none tracking-tight mb-3">
            Or Submit a Claim Review Request
          </h2>
          <p className="text-base text-[#9999aa]">
            Fill out the form below and our team will call you within the hour.
          </p>
        </motion.div>

        <LeadCaptureForm servicePage="contact" />
      </div>
    </section>
  );
}
