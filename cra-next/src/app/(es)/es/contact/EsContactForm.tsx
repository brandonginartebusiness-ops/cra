"use client";

import { m } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";
import StarRating from "@/components/ui/StarRating";
import { totalGoogleReviewCount } from "@/data/reviews";
import { getDict } from "@/i18n/dictionaries";

const t = getDict("es").contact;

export default function EsContactForm() {
  return (
    <section className="bg-[#f0ede8] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
      <div className="max-w-xl mx-auto px-6">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <StarRating />
            <span className="text-sm font-semibold text-[#5a5a72]">{totalGoogleReviewCount}+ reseñas en Google</span>
          </div>
          <h2 className="font-bebas text-4xl md:text-5xl text-[#1a1a2e] leading-none tracking-tight mb-3">
            {t.formHeading}
          </h2>
          <p className="text-base text-[#5a5a72]">
            {t.formSub}
          </p>
        </m.div>

        <LeadCaptureForm servicePage="es-contact" locale="es" />
      </div>
    </section>
  );
}
