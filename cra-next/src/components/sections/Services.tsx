"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Services() {
  return (
    <section id="services" className="bg-[#111118] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mb-14"
        >
          <SectionHeading
            label="Our services"
            heading="Property damage claims handled<br/>with Florida-specific experience."
            subheading="We focus exclusively on property damage insurance claims in Florida. Claim Remedy is built to move quickly, document thoroughly, and fight for the recovery your policy should support."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={fadeInUp}>
              <Link
                href={s.href}
                className="group block bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/8 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(96,165,250,0.1)] hover:border-[#60a5fa]/20 transition-[transform,box-shadow,border-color] duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#f0f0f5] text-base mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#9999aa] leading-relaxed mb-3">
                    {s.description}
                  </p>
                  <span className="text-sm text-[#60a5fa] font-medium group-hover:underline">
                    Learn More
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#60a5fa] hover:underline"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
