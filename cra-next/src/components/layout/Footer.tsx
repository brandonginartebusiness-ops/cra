import Link from "next/link";

const NAV_LINKS = [
  ["Services", "/services"],
  ["Results", "/results"],
  ["Process", "/process"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-6">

        {/* 3-col grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-8 mb-8">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand_assets/logo.png"
              alt="Claim Remedy Adjusters"
              style={{ height: 36, width: "auto", maxWidth: 160 }}
            />
            <p className="text-xs text-white/40 leading-relaxed max-w-[220px]">
              Licensed Florida public adjusters. We fight for homeowners — never insurance companies. No recovery, no fee.
            </p>
          </div>

          {/* Col 2 — Company */}
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/30 mb-3">Company</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/30 mb-3">Contact</p>
            <ul className="flex flex-col gap-2 text-sm text-white/50">
              <li><a href="tel:+17862237867" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm">(786) 223-7867</a></li>
              <li><a href="mailto:office@cradjusters.com" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm">office@cradjusters.com</a></li>
              <li>7900 Oak Ln, Suite 400</li>
              <li>Miami Lakes, FL 33016</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-1 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Claim Remedy Adjusters. All rights reserved.</p>
          <p>License W549958 &mdash; Licensed in all 67 Florida counties</p>
        </div>

      </div>
    </footer>
  );
}
