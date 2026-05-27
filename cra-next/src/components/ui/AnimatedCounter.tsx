"use client";

import { useEffect, useRef, useState } from "react";

type Format = "currency" | "integer" | "decimal";

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** "currency" formats $X / $X.YK (default — keeps existing callers unchanged).
   *  "integer" formats whole numbers with thousands separators.
   *  "decimal" formats with `decimals` digits after the point. */
  format?: Format;
  /** Only used when format === "decimal" (default 1) */
  decimals?: number;
}

function formatCurrency(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n.toLocaleString()}`;
}

export default function AnimatedCounter({
  value,
  duration = 1500,
  prefix = "",
  suffix = "",
  className,
  format = "currency",
  decimals = 1,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the real value so the server-rendered HTML, search crawlers, and
  // the first client paint always show the true number — never $0. The count-up
  // is a progressive enhancement that runs only when an element scrolls into
  // view from below the fold.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible on load (above the fold): keep the real value in place.
    // Resetting to zero here would flash the number on first paint.
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    let raf = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();
        // Reset to zero off-screen, then count up as the user scrolls to it.
        setDisplay(0);
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(eased * value);
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  let rendered: string;
  if (format === "currency") {
    rendered = formatCurrency(Math.round(display));
  } else if (format === "decimal") {
    rendered = display.toFixed(decimals);
  } else {
    rendered = Math.round(display).toLocaleString();
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}
