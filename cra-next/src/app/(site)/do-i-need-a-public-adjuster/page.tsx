import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import LeadCaptureForm from "@/components/ui/LeadCaptureForm";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const CANONICAL = "https://claimremedyadjusters.com/do-i-need-a-public-adjuster";

export const metadata: Metadata = {
  title: "Do I Need a Public Adjuster in FL?",
  description:
    "Honest guide to whether you need a public adjuster in Florida — the signs that you do, when you may not, and exactly what it costs. Florida fee caps explained (20% / 10% post-emergency). No recovery, no fee.",
  openGraph: {
    title: "Do I Need a Public Adjuster? Cost & When to Hire One in Florida",
    description:
      "When hiring a Florida public adjuster is worth it, when it isn't, and what it costs under Florida's fee caps. A licensed public adjuster explains.",
    url: CANONICAL,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Do I Need a Public Adjuster? Cost & When to Hire One in Florida",
    description:
      "When a Florida public adjuster is worth it, when it isn't, and what it costs under Florida's 20% / 10% fee caps.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: CANONICAL },
};

// ── Page content data ────────────────────────────────────────────────────────
const SIGNS: { title: string; body: string; href?: string; cta?: string }[] = [
  {
    title: "Your claim was denied",
    body: "A denial letter is rarely the final word. Carriers deny for predictable, often beatable reasons — wear-and-tear, disputed cause of loss, or a technicality.",
    href: "/services/denied-claims",
    cta: "Denied claim help",
  },
  {
    title: "The offer feels like a lowball",
    body: "If the payout won't come close to covering real repair costs, an independent estimate and re-documentation can change the number.",
    href: "/services/denied-claims",
    cta: "Underpaid claims",
  },
  {
    title: "The loss is large or complex",
    body: "Hurricane, fire, major water damage, or a commercial loss involves layered coverage and big dollars — exactly where documentation expertise pays for itself.",
    href: "/services/storm-hurricane",
    cta: "Hurricane & storm claims",
  },
  {
    title: "You're overwhelmed by the process",
    body: "Inventories, deadlines, adjuster calls, and proof-of-loss paperwork are a full-time job. We carry that load so you can focus on getting your home back.",
    href: "/process",
    cta: "How the process works",
  },
  {
    title: "There's a dispute over the cause or scope",
    body: "When the insurer says 'pre-existing' or 'maintenance' and you disagree, the difference is worth thousands. We document what's storm-caused and what's covered.",
    href: "/services/water-damage",
    cta: "Water damage claims",
  },
  {
    title: "You suspect damage was missed",
    body: "Hidden damage behind walls, under roofs, or inside slabs is routinely overlooked on a first inspection — and left unpaid unless someone finds it.",
    href: "/services/roof-claims",
    cta: "Roof claims",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much does a public adjuster cost in Florida?",
    answer:
      "Florida law caps public adjuster fees at 20% of the claim payment you recover. For claims caused by an event the Governor has declared a state of emergency — such as a hurricane — the cap is 10% of the payment for the first year after the declaration (Fla. Stat. 626.854). Claim Remedy Adjusters works on a contingency basis: there is no upfront cost, and you pay nothing unless we recover money on your claim. Fees are exclusive of attorney fees and costs.",
  },
  {
    question: "Is hiring a public adjuster worth it?",
    answer:
      "It depends on your claim. A 2010 Florida state study (OPPAGA Report 10-06) found that policyholders who used a public adjuster recovered substantially more on their claims, on average, than those who did not. A public adjuster is most worth it when your claim has been denied, underpaid, or is large and complex. For a small, straightforward claim your insurer has already paid in full, you may not need one. Individual results vary by policy, coverage, and the facts of each claim.",
  },
  {
    question: "Can I hire a public adjuster after I've already filed or been paid?",
    answer:
      "Yes. You can bring in a public adjuster at any open stage of a claim — including after a denial, after a lowball offer, or to reopen an underpaid claim — as long as you are within your policy's deadlines. We review the carrier's basis for its decision, re-document the loss, and re-present the claim with the evidence the first submission may have lacked.",
  },
  {
    question: "What's the difference between a public adjuster and the insurance company's adjuster?",
    answer:
      "The insurance company's adjuster works for the insurer and is paid to settle your claim for as little as possible. A public adjuster is licensed by the State of Florida to represent you, the policyholder, and works only for you — documenting the full scope of your loss and negotiating for the payment you are owed.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function DoINeedAPublicAdjusterPage() {
  const waLink =
    "https://wa.me/13057331670?text=Hi%20Claim%20Remedy%2C%20I%27d%20like%20to%20know%20if%20I%20need%20a%20public%20adjuster.";

  return (
    <div className="pt-24 bg-[#faf8f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Do I Need a Public Adjuster?", path: "/do-i-need-a-public-adjuster" },
        ]}
      />

      {/* ── Section 1: Hero ──────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-2 text-xs text-[#8888a0] mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-cra-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#5a5a72]">Do I Need a Public Adjuster?</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cra-blue mb-4">
              The honest answer
            </span>
            <h1 className="font-bebas font-extrabold text-5xl md:text-6xl lg:text-7xl text-[#1a1a2e] leading-none tracking-tight mb-5">
              Do I Need a Public Adjuster?
            </h1>
            <p className="text-lg text-[#5a5a72] leading-relaxed mb-8 max-w-xl">
              Not every claim needs one — but the right claim, in the right hands,
              can mean thousands more in your pocket. Here&apos;s how to tell which
              one you have, and exactly what it costs in Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-cra-blue text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-[opacity,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cra-blue/60"
              >
                Get a Free Claim Review
              </Link>
              <a
                href="tel:+13057331670"
                className="inline-flex items-center justify-center gap-2 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-full hover:border-cra-blue/40 transition-[border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cra-blue/60"
              >
                Call (305) 733-1670
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Signs you need one ────────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              label="When it makes sense"
              heading="Signs you should hire<br/>a public adjuster."
            />
            <p className="mt-6 text-base text-[#5a5a72] leading-relaxed">
              If any of these describe your situation, a licensed public adjuster
              is likely worth a conversation. Each one is a place insurers
              routinely underpay — and a place documentation changes the outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIGNS.map((sign) => (
              <div
                key={sign.title}
                className="flex flex-col bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-7"
              >
                <span className="text-cra-blue mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h3 className="font-semibold text-lg text-[#1a1a2e] mb-2">{sign.title}</h3>
                <p className="text-sm text-[#5a5a72] leading-relaxed mb-4">{sign.body}</p>
                {sign.href && (
                  <Link
                    href={sign.href}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-cra-blue hover:gap-2.5 transition-[gap] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cra-blue/60 rounded-sm w-fit"
                  >
                    {sign.cta}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: When you may NOT need one (trust / E-E-A-T) ────── */}
      <section className="bg-[#f0ede8] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            label="The honest part"
            heading="When you may not<br/>need one."
          />
          <p className="mt-6 text-base text-[#3a3a52] leading-relaxed mb-6">
            A good public adjuster will tell you when it isn&apos;t worth it. You
            probably don&apos;t need to hire one if:
          </p>
          <ul className="flex flex-col gap-4">
            {[
              "Your damage is small and likely below — or barely above — your deductible.",
              "Your insurer already paid the claim in full and you agree with the amount.",
              "The loss is simple and well-documented, with no dispute over cause or scope.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-[#3a3a52] leading-relaxed">
                <svg className="w-5 h-5 text-cra-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-[#5a5a72] leading-relaxed">
            When in doubt, a free claim review costs nothing and tells you quickly
            whether there&apos;s money being left on the table.
          </p>
        </div>
      </section>

      {/* ── Section 4: What it costs in Florida ──────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionHeading
              label="What it costs"
              heading="Public adjuster cost<br/>in Florida."
              className="text-center"
            />
            <p className="mt-6 text-base text-[#5a5a72] leading-relaxed max-w-xl mx-auto">
              Public adjusters in Florida work on contingency — a percentage of
              what they recover for you. State law sets firm caps on that fee.
            </p>
          </div>

          {/* Fee cap cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-8 text-center">
              <div className="font-bebas font-bold text-6xl text-cra-blue leading-none mb-3">20%</div>
              <p className="font-semibold text-[#1a1a2e] mb-2">Standard claims</p>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                The maximum fee on most claims — a share of the payment we recover
                for you.
              </p>
            </div>
            <div className="bg-[#ffffff] border border-cra-blue/30 rounded-2xl p-8 text-center shadow-[0_0_40px_rgba(37,99,235,0.10)]">
              <div className="font-bebas font-bold text-6xl text-cra-blue leading-none mb-3">10%</div>
              <p className="font-semibold text-[#1a1a2e] mb-2">Declared-emergency claims</p>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                The cap drops to 10% for claims tied to a Governor-declared state
                of emergency (e.g. a hurricane), for one year after the
                declaration.
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] rounded-2xl border border-cra-blue/30 shadow-[0_0_40px_rgba(37,99,235,0.12)] p-8 text-center mb-6">
            <p className="font-bebas font-bold text-3xl text-cra-blue tracking-tight mb-2">
              $0 upfront. No recovery, no fee.
            </p>
            <p className="text-sm text-[#5a5a72] leading-relaxed max-w-lg mx-auto">
              You pay nothing out of pocket to get started, and nothing at all
              unless we recover money on your claim. The fee comes out of the
              settlement — never your wallet first.
            </p>
          </div>

          <p className="text-xs text-[#8888a0] leading-relaxed">
            Fee caps are set by Fla. Stat. 626.854(11) and are exclusive of
            attorney fees and costs. A 2010 Florida state study (OPPAGA Report
            10-06) found policyholders who used a public adjuster recovered
            substantially more on their claims, on average, than those who did
            not. Individual results vary by policy, coverage, and the facts of
            each claim — past results do not guarantee future outcomes.
          </p>
        </div>
      </section>

      {/* ── Section 5: Who does what (comparison) ────────────────────── */}
      <section className="bg-[#f0ede8] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <SectionHeading
              label="Know the difference"
              heading="Public adjuster vs. company<br/>adjuster vs. attorney."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#ffffff] border border-cra-blue/30 rounded-2xl p-7 shadow-[0_0_40px_rgba(37,99,235,0.10)]">
              <p className="text-xs font-semibold uppercase tracking-widest text-cra-blue mb-3">Public adjuster</p>
              <p className="font-semibold text-[#1a1a2e] mb-2">Works for you</p>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                State-licensed to represent the policyholder. Documents the full
                loss, files and negotiates the claim, and is paid a capped
                percentage only if you recover.
              </p>
            </div>
            <div className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8888a0] mb-3">Company adjuster</p>
              <p className="font-semibold text-[#1a1a2e] mb-2">Works for the insurer</p>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                Employed or hired by your insurance company. Their job is to
                evaluate — and settle — your claim for as little as the carrier
                can justify.
              </p>
            </div>
            <div className="bg-[#ffffff] border border-[#1a1a2e]/8 rounded-2xl p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8888a0] mb-3">Attorney</p>
              <p className="font-semibold text-[#1a1a2e] mb-2">For legal disputes</p>
              <p className="text-sm text-[#5a5a72] leading-relaxed">
                Steps in when a claim becomes a legal fight — bad-faith,
                litigation, or lawsuit. Many claims are resolved by a public
                adjuster long before that stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: FAQ ───────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <SectionHeading
              label="Common questions"
              heading="Still deciding?"
            />
          </div>
          <dl className="flex flex-col divide-y divide-[#1a1a2e]/8">
            {FAQS.map((faq) => (
              <div key={faq.question} className="py-6 first:pt-0">
                <dt className="font-semibold text-lg text-[#1a1a2e] mb-3">{faq.question}</dt>
                <dd className="text-base text-[#5a5a72] leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-[#5a5a72]">
            More answers on our{" "}
            <Link href="/faq" className="font-semibold text-cra-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cra-blue/60 rounded-sm">
              full FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Section 7: Lead form ─────────────────────────────────────── */}
      <section className="bg-[#faf8f5] py-14 lg:py-28 border-t border-[#1a1a2e]/8">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-bebas font-extrabold text-4xl md:text-5xl text-[#1a1a2e] leading-none tracking-tight mb-3">
              Find Out in One Free Call
            </h2>
            <p className="text-base text-[#3a3a52]">
              Tell us about your claim and we&apos;ll tell you, honestly, whether
              you need us. No recovery, no fee.
            </p>
          </div>
          <LeadCaptureForm servicePage="do-i-need-a-public-adjuster" ctaText="Get My Free Claim Review" />
        </div>
      </section>

      {/* ── Section 8: CTA + compliance ──────────────────────────────── */}
      <section className="bg-[#faf8f5] py-16 lg:py-20 border-t border-[#1a1a2e]/8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-bebas font-extrabold text-3xl md:text-4xl text-[#1a1a2e] leading-none tracking-tight mb-6">
            Talk to a Licensed Florida Public Adjuster
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25d366] text-cra-bg font-semibold px-7 py-3.5 rounded-full hover:opacity-90 hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] transition-[opacity,box-shadow] duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+13057331670"
              className="inline-flex items-center gap-3 bg-[#f0ede8] border border-[#1a1a2e]/12 text-[#1a1a2e] font-semibold px-7 py-3.5 rounded-full hover:border-cra-blue/40 hover:shadow-[0_0_24px_rgba(37,99,235,0.08)] transition-[border-color,box-shadow] duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call (305) 733-1670
            </a>
          </div>
          <p className="text-xs text-[#8888a0] leading-relaxed max-w-2xl mx-auto">
            Claim Remedy Adjusters &middot; Eddy D. Gomez, Licensed Florida Public
            Adjuster, License W549958. This page is general information, not legal
            advice, and does not create an attorney-client relationship.
          </p>
        </div>
      </section>
    </div>
  );
}
