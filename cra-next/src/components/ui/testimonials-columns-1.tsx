"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  image?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, loopIndex) => (
          <React.Fragment key={loopIndex}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-[#1a1a2e]/10 bg-[#ffffff] shadow-lg shadow-[#2563eb]/5 max-w-xs w-full"
              >
                <div className="text-sm text-[#3a3a52] leading-relaxed">
                  &ldquo;{text}&rdquo;
                </div>
                <div className="flex items-center gap-3 mt-5">
                  {image ? (
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-sm font-semibold text-[#2563eb]"
                    >
                      {name.trim().charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="font-semibold tracking-tight leading-5 text-[#1a1a2e]">
                      {name}
                    </div>
                    <div className="text-xs leading-5 text-[#8888a0] tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
