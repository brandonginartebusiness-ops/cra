"use client";

import { m } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { Variants } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  variants = fadeInUp,
}: Props) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
