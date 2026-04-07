"use client";

import { motion } from "framer-motion";
import { slideInLeft, staggerContainer, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

const WA_LINK =
  "https://wa.me/17862237867?text=Hi%20Claim%20Remedy%2C%20I%27d%20like%20to%20book%20a%20free%20consultation.";

export default function Contact() {
  return (
    <section id="connect" className="bg-[#0a0a0f] py-24 lg:py-32 border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
          >
            <SectionHeading
              label="Contact us"
              heading="Choose the fastest way<br/>to reach Claim Remedy."
              subheading="Reach the Claim Remedy team directly and get clear guidance on the next step for your claim."
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            {/* WhatsApp */}
            <motion.a
              variants={fadeInUp}
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#0a0a0f] border border-white/8 rounded-2xl p-6 hover:border-[#25d366]/30 hover:shadow-[0_0_24px_rgba(37,211,102,0.08)] transition-[border-color,box-shadow] group"
            >
              <div className="w-11 h-11 rounded-full bg-[#25d366]/10 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#f0f0f5] group-hover:text-[#25d366] transition-colors">
                  Message on WhatsApp
                </p>
                <p className="text-sm text-[#9999aa]">
                  Start a free, pressure-free conversation
                </p>
              </div>
            </motion.a>

            {/* Call */}
            <motion.a
              variants={fadeInUp}
              href="tel:+17862237867"
              className="flex items-center gap-4 bg-[#0a0a0f] border border-white/8 rounded-2xl p-6 hover:border-[#3b82f6]/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] transition-[border-color,box-shadow] group"
            >
              <div className="w-11 h-11 rounded-full bg-[#3b82f6]/10 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#f0f0f5] group-hover:text-[#3b82f6] transition-colors">
                  Call (786) 223-7867
                </p>
                <p className="text-sm text-[#9999aa]">Speak directly with the team</p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 bg-[#0a0a0f] border border-white/8 rounded-2xl p-6"
            >
              <div className="w-11 h-11 rounded-full bg-[#111118] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9999aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#f0f0f5]">Miami Lakes Office</p>
                <p className="text-sm text-[#9999aa]">7900 Oak Ln, Suite 400, Miami Lakes, FL 33016</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
