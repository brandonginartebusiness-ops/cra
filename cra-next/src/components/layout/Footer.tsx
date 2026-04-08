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
    <footer className="bg-[#1d1d1f] py-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-1.5 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand_assets/logo.png"
              alt="Claim Remedy Adjusters"
              style={{ height: 44, width: "auto" }}
            />
            <p className="text-[0.7rem] text-[#555566] max-w-[200px] leading-snug">
              Licensed FL Public Adjusting Firm.<br />We represent homeowners only.
            </p>
          </div>

          {/* Nav links — horizontal */}
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
            {NAV_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs text-[#666677] hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="flex flex-col gap-1 text-xs text-[#666677] shrink-0 text-right">
            <a href="tel:+17862237867" className="hover:text-white transition-colors">(786) 223-7867</a>
            <a href="mailto:office@cradjusters.com" className="hover:text-white transition-colors">office@cradjusters.com</a>
            <span>7900 Oak Ln, Suite 400 · Miami Lakes, FL 33016</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 mt-5 pt-4 flex flex-col sm:flex-row justify-between items-center gap-1 text-[0.65rem] text-[#444455]">
          <p>&copy; {new Date().getFullYear()} Claim Remedy Adjusters. All rights reserved.</p>
          <p>License W549958 &mdash; Licensed in all 67 Florida counties</p>
        </div>

      </div>
    </footer>
  );
}
