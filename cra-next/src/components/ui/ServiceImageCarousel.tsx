"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  images: string[];
  alt: string;
  /** Card position — used to slightly desync autoplay so the grid doesn't pulse in unison. */
  index?: number;
  /** Eager-load the first slide (use for above-the-fold cards). */
  priority?: boolean;
}

export default function ServiceImageCarousel({
  images,
  alt,
  index = 0,
  priority = false,
}: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // honor reduced-motion: hold on the first image
    }
    const interval = 4200 + (index % 4) * 400; // stagger per card
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % images.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [images.length, index]);

  return (
    <div className="absolute inset-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
      <AnimatePresence initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: "6%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-6%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[active]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority && active === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* gradient scrim so the dots stay legible over bright photos */}
      {images.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute bottom-2.5 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${
                  i === active ? "w-4 bg-white" : "w-1.5 bg-white/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
