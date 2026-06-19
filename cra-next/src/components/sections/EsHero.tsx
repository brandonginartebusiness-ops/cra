import AnimatedCounter from "@/components/ui/AnimatedCounter";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";
import { getDict } from "@/i18n/dictionaries";

// Spanish hero. Mirrors the English Hero.tsx layout/CSS (.hero-fade entrance,
// server-rendered LCP) exactly — only the copy differs (from the es dictionary).
// Kept as a separate file so the live English hero carries zero risk.
const t = getDict("es").hero;

type ScoreItem =
  | { kind: "decimal"; value: number; decimals: number; suffix: string; label: string; emphasis?: boolean }
  | { kind: "static"; val: string; suffix: string; label: string; emphasis?: boolean };

const scorecard: ScoreItem[] = [
  { kind: "decimal", value: 5.0, decimals: 1, suffix: "/ 5", label: t.scRating },
  { kind: "static", val: "FL", suffix: "", label: t.scStatewide, emphasis: true },
  { kind: "static", val: "$0", suffix: "", label: t.scUpfront, emphasis: true },
];

export default function EsHero() {
  return (
    <section id="hero" className="relative min-h-screen">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-16 min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* LEFT — copy + trust */}
        <div className="flex flex-col items-start text-left">
          <div className="hero-fade inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/5 border border-white/12 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#c0c0d0]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <span>{t.badgePre} <span className="text-[#f0f0f5]">{t.badgeLicense}</span></span>
          </div>

          <h1 className="hero-fade hero-fade-delay-1 font-bebas font-extrabold leading-[0.95] tracking-tight text-[#f0f0f5]">
            <span className="block text-[clamp(0.78rem,1.3vw,1rem)] font-bold tracking-[0.22em] text-[#60a5fa] mb-3 font-body">
              {t.eyebrow}
            </span>
            <span className="block text-[clamp(2.25rem,4.8vw,4.75rem)]">
              {t.headlineLine1}
              <br />
              {t.headlineLine2}{" "}
              <span className="text-gradient">{t.headlineAccent}</span>
            </span>
          </h1>

          <p className="hero-fade hero-fade-delay-2 mt-6 text-sm md:text-base text-[#c0c0d0] leading-relaxed max-w-lg">
            {t.subPre}{" "}
            <em className="font-serif not-italic text-[#f0f0f5] font-medium italic">
              {t.subEm}
            </em>{" "}
            {t.subPost}
          </p>

          <p className="hero-fade hero-fade-delay-3 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f0f0f5]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {t.positioning}
          </p>

          <div className="hero-fade hero-fade-delay-4 mt-7 flex flex-wrap gap-3">
            <a
              href="tel:+13057331670"
              className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-[#f0f0f5] font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/12 hover:border-white/25 transition-[background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              {t.phoneCta}
            </a>
          </div>

          <div className="hero-fade hero-fade-delay-5 mt-10 w-full max-w-lg border-t border-white/15 pt-6 grid grid-cols-3 gap-4">
            {scorecard.map((c) => (
              <div key={c.label} className="flex flex-col items-start text-left">
                <div className="font-bebas font-extrabold text-[1.7rem] leading-none tabular-nums text-[#f0f0f5]">
                  {c.kind === "decimal" ? (
                    <AnimatedCounter
                      value={c.value}
                      format="decimal"
                      decimals={c.decimals}
                      className={c.emphasis ? "text-[#60a5fa]" : ""}
                    />
                  ) : (
                    <span className={c.emphasis ? "text-[#60a5fa]" : ""}>{c.val}</span>
                  )}
                  {c.suffix && (
                    <span className="text-[#8888a0] font-semibold ml-1">{c.suffix}</span>
                  )}
                </div>
                <div className="mt-1.5 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#c0c0d0]">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — lead form */}
        <div className="hero-fade hero-fade-delay-2 w-full">
          <LeadCaptureForm
            servicePage="es-homepage"
            locale="es"
            ctaText={t.cta}
          />
        </div>
      </div>
    </section>
  );
}
