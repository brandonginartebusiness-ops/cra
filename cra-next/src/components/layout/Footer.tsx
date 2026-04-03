import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Image
              src="/brand_assets/logo-transparent.png"
              alt="Claim Remedy Adjusters"
              width={130}
              height={40}
              className="mb-4"
            />
            <p className="text-sm text-[#666677] leading-relaxed max-w-xs">
              Licensed Florida Public Adjusters. We represent homeowners —
              never insurance companies.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#666677] mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ["Services", "#services"],
                ["Results", "#results"],
                ["Process", "#process"],
                ["About", "#about"],
                ["Reviews", "#testimonials"],
                ["FAQ", "#faq"],
                ["Contact", "#connect"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[#9999aa] hover:text-[#f0f0f5] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#666677] mb-4">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#9999aa]">
              <li>
                <a
                  href="tel:+17862237867"
                  className="hover:text-[#f0f0f5] transition-colors"
                >
                  (786) 223-7867
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@cradjusters.com"
                  className="hover:text-[#f0f0f5] transition-colors"
                >
                  office@cradjusters.com
                </a>
              </li>
              <li>7900 Oak Ln, Suite 400</li>
              <li>Miami Lakes, FL 33016</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#666677]">
          <p>
            &copy; {new Date().getFullYear()} Claim Remedy Adjusters. All rights
            reserved.
          </p>
          <p>Florida License W549958 — Eddy D Gomez, Public Adjuster</p>
        </div>
      </div>
    </footer>
  );
}
