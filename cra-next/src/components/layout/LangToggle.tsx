"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Table-mapped EN↔ES toggle. Only the pages that have a Spanish equivalent are
// listed; anything unmapped falls back to the other locale's homepage (correct
// while the /es subtree is just home + contact). Additive — does not touch the
// existing nav arrays or active-state logic.
const EN_TO_ES: Record<string, string> = {
  "/": "/es",
  "/contact": "/es/contact",
};
const ES_TO_EN: Record<string, string> = {
  "/es": "/",
  "/es/contact": "/contact",
};

export default function LangToggle() {
  const pathname = usePathname();
  const isEs = pathname === "/es" || pathname.startsWith("/es/");

  const href = isEs ? ES_TO_EN[pathname] ?? "/" : EN_TO_ES[pathname] ?? "/es";
  const label = isEs ? "EN" : "ES";
  const aria = isEs ? "View in English" : "Ver en español";
  const target = isEs ? "en" : "es";

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={aria}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
      {label}
    </Link>
  );
}
