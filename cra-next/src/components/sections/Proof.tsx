"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

const panels = [
  {
    image:
      "https://images.unsplash.com/photo-1601275338399-a41e3a3ec38d?w=1200&auto=format&fit=crop&q=80",
    tag: "Storm damage evidence",
    title: "Storm damage evidence",
    body: "Thorough photo documentation of every affected surface — structural compromise, interior water intrusion, and overlooked secondary damage — captured before repairs begin.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1734328819658-0c3ceef27c46?w=1200&auto=format&fit=crop&q=80",
    tag: "Engineering & estimate depth",
    title: "Claim file depth",
    body: "Engineering reports, moisture mapping, and line-by-line Xactimate estimates that insurers can't easily dispute — the paperwork that drives larger recoveries.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
    tag: "Roof · Water · Mold · Fire · Denial",
    title: "Range of claim types",
    body: "Hurricane, water, mold, fire, denied claims, and commercial losses — every property damage scenario Florida homeowners face, handled under one roof.",
  },
];

export default function Proof() {
  return (
    <section className="bg-[#faf8f5] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mb-14"
        >
          <SectionHeading
            label="Our documentation"
            heading="Evidence that wins claims."
            subheading="We build claim files insurers can't easily dispute — photos, engineering reports, and detailed Xactimate estimates that move the needle."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {panels.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs bg-black/60 text-white border border-white/10 px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#1a1a2e] text-lg mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[#5a5a72] leading-relaxed">{p.body}</p>
              </div>
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
