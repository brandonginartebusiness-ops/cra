import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

const COMPANY_LINKS: [string, string][] = [
  ["Process", "/process"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Do I Need a Public Adjuster?", "/do-i-need-a-public-adjuster"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

const LEGAL_LINKS: [string, string][] = [
  ["Privacy Policy", "/privacy"],
];

// Top service areas surfaced in the footer (full list lives on /areas).
const FOOTER_CITY_SLUGS = [
  "miami",
  "miami-lakes",
  "hialeah",
  "fort-lauderdale",
  "hollywood",
  "coral-gables",
  "pembroke-pines",
  "west-palm-beach",
];
const footerCities = FOOTER_CITY_SLUGS.map((slug) =>
  cities.find((c) => c.slug === slug)
).filter((c): c is (typeof cities)[number] => Boolean(c));

const linkClass =
  "text-sm text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm break-words";
const headingClass =
  "text-[0.65rem] font-semibold uppercase tracking-widest text-white/55 mb-3";

function FooterColumn({
  heading,
  links,
  allHref,
  allLabel,
}: {
  heading: string;
  links: [string, string][];
  allHref?: string;
  allLabel?: string;
}) {
  return (
    <div className="min-w-0">
      <p className={headingClass}>{heading}</p>
      <ul className="flex flex-col gap-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className={linkClass}>
              {label}
            </Link>
          </li>
        ))}
        {allHref && (
          <li>
            <Link
              href={allHref}
              className="text-sm font-semibold text-[#60a5fa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
            >
              {allLabel} &rarr;
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  const serviceLinks = services.map((s) => [s.title, s.href] as [string, string]);
  const areaLinks = footerCities.map(
    (c) => [c.city, `/areas/${c.slug}`] as [string, string]
  );

  return (
    <footer className="bg-[#1a1a2e] pt-12 pb-20 sm:pb-5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand + link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
            <Image
              src="/brand_assets/logo.png"
              alt="Claim Remedy Adjusters"
              width={160}
              height={36}
              style={{ height: 36, width: "auto", maxWidth: 160 }}
            />
            <p className="text-xs text-white/55 leading-relaxed max-w-[220px]">
              Licensed Florida public adjusters. We fight for homeowners — never insurance companies. No recovery, no fee.
            </p>
          </div>

          <FooterColumn
            heading="Services"
            links={serviceLinks}
            allHref="/services"
            allLabel="All services"
          />
          <FooterColumn
            heading="Service Areas"
            links={areaLinks}
            allHref="/areas"
            allLabel="All areas"
          />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />

          {/* Contact + Legal */}
          <div className="min-w-0 flex flex-col gap-6">
            <div>
              <p className={headingClass}>Contact</p>
              <ul className="flex flex-col gap-2 text-sm text-white/50">
                <li>
                  <a href="tel:+13057331670" className={linkClass}>
                    (305) 733-1670
                  </a>
                </li>
                <li>
                  <a href="mailto:office@cradjusters.com" className={`${linkClass} break-all`}>
                    office@cradjusters.com
                  </a>
                </li>
                <li>7900 Oak Ln, Suite 400</li>
                <li>Miami Lakes, FL 33016</li>
              </ul>
            </div>
            <FooterColumn heading="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="https://instagram.com/claimremedyadjusters"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/55 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            className="text-white/55 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
          <p className="text-[11px] text-white/55 leading-relaxed max-w-4xl">
            <strong className="text-white/60">Disclaimer:</strong> Case results referenced on this website (including any specific recovery amounts) describe outcomes for individual clients in specific circumstances. Individual case results vary based on the facts of the claim, the insurance policy, applicable law, and other factors. Past results do not guarantee future outcomes. This website does not provide legal advice. No attorney-client relationship is created by use of this site.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1 text-xs text-white/55">
            <p>&copy; {new Date().getFullYear()} Claim Remedy Adjusters. All rights reserved.</p>
            <p>License W549958 &mdash; Licensed Florida Public Adjuster</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
