import Link from "next/link";

const NAV_LINKS = [
  ["Services", "/services"],
  ["Process", "/process"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] pt-10 pb-20 sm:pb-5">
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

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="https://instagram.com/claimremedyadjusters"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/claimremedyadjusters"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="TikTok"
            className="text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
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
