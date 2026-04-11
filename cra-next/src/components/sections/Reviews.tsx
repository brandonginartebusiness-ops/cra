"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import StarRating from "@/components/ui/StarRating";

// Static subset of reviews for the React build
const reviews = [
  { author: "Judy Vasquez", text: "Our Home Insurance company really gave us hell on our claim from the Hurricane damage…Thank God Eddy was there who fought for us.", time: "6 months ago" },
  { author: "Alexis Torres", text: "From the moment they arrived, their professionalism and expertise shone through. Highly recommend Claim Remedy.", time: "5 months ago" },
  { author: "Charlie Ramos", text: "He was proactive, thorough, and always on my side. When the rainstorms left my roof in rough shape they stepped in immediately.", time: "6 months ago" },
  { author: "Charles Jacque", text: "From getting the plumber and the mold expert to assess the damage, Eddy was on it. He kept me informed every step.", time: "1 year ago" },
  { author: "Mayra Peralta", text: "The insurance company was very difficult but Eddy was key in staying on top of them to get us the best resolution.", time: "6 months ago" },
  { author: "Bettyna's Creative", text: "They provided support from beginning to end. We obtained a fair and accurate claim fully commensurate with our losses.", time: "1 month ago" },
];

export default function Reviews() {
  return (
    <section id="testimonials" className="bg-[#ffffff] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b8892e] mb-4">
            <StarRating /> Google Reviews
          </span>
          <h2 className="font-bebas text-7xl md:text-8xl lg:text-9xl text-[#1a1a2e] leading-none">
            What homeowners say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.author}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
            >
              <StarRating className="text-sm" />
              <p className="text-sm text-[#5a5a72] italic leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-[#1a1a2e]">
                  {r.author}
                </p>
                <p className="text-[0.7rem] text-[#8888a0]">
                  Google Review &middot; {r.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#2563eb] hover:underline"
          >
            See all reviews on Google
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
