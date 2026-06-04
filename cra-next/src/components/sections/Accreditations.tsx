import Image from "next/image";

/**
 * Professional accreditations / memberships trust strip.
 *
 * To show the official seal for a badge, drop the PNG/SVG into
 * `public/brand_assets/badges/` and set `logo` to its path. Until then each
 * badge renders as a clean text seal so nothing is ever broken or fabricated.
 *
 * `href` should point to the verifying body (the association page, or — for BBB —
 * the firm's own BBB Accredited Business profile). Leave undefined to render a
 * non-linked seal.
 */
interface Badge {
  abbr: string;
  name: string;
  logo?: string;
  href?: string;
}

const BADGES: Badge[] = [
  {
    abbr: "FAPIA",
    name: "Florida Association of Public Insurance Adjusters",
    logo: "/brand_assets/badges/fapia.png",
  },
  {
    abbr: "AAPIA",
    name: "American Association of Public Insurance Adjusters",
    // Official free-web logo is a white knockout (invisible on a light chip) —
    // using the text seal until the official color logo is supplied.
  },
  {
    abbr: "NAPIA",
    name: "National Association of Public Insurance Adjusters",
    logo: "/brand_assets/badges/napia.png",
  },
  {
    abbr: "BBB",
    name: "Better Business Bureau Accredited",
    // BBB Accredited seal should come from the firm's BBB account (account-tied,
    // links to the profile) — text seal until that's supplied.
  },
];

function BadgeInner({ badge }: { badge: Badge }) {
  // Every badge sits on a uniform white chip: a logo where we have a clean one,
  // otherwise the abbreviation set in brand navy so the row stays consistent.
  return (
    <>
      <div className="flex h-14 w-full items-center justify-center rounded-lg bg-white px-3">
        {badge.logo ? (
          <div className="relative h-9 w-full">
            <Image
              src={badge.logo}
              alt={badge.name}
              fill
              sizes="160px"
              className="object-contain"
            />
          </div>
        ) : (
          <span className="font-bebas font-bold text-2xl tracking-wide text-[#1a1a2e]">
            {badge.abbr}
          </span>
        )}
      </div>
      <span className="text-[0.7rem] leading-tight text-[#5a5a72] max-w-[170px]">
        {badge.name}
      </span>
    </>
  );
}

export default function Accreditations() {
  return (
    <section className="py-16 lg:py-20 border-t border-[#1a1a2e]/8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-8 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#2563eb]">
          <span className="w-8 h-px bg-[#2563eb]" />
          Member &amp; accredited
          <span className="w-8 h-px bg-[#2563eb]" />
        </div>

        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {BADGES.map((badge) => {
            const cardClass =
              "group flex w-[160px] flex-col items-center justify-center gap-2 bg-[#ffffff] rounded-2xl border border-[#1a1a2e]/8 px-6 py-6 text-center hover:border-cra-blue/30 transition-[border-color,box-shadow] duration-300";
            return badge.href ? (
              <a
                key={badge.abbr}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:shadow-[0_0_24px_rgba(37,99,235,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cra-blue/60`}
                aria-label={`${badge.name} — verify`}
              >
                <BadgeInner badge={badge} />
              </a>
            ) : (
              <div key={badge.abbr} className={cardClass}>
                <BadgeInner badge={badge} />
              </div>
            );
          })}
        </div>

        <p className="mt-7 text-xs text-[#8888a0] max-w-2xl mx-auto leading-relaxed">
          Claim Remedy Adjusters maintains active membership and accreditation
          with leading public-adjusting associations and the Better Business
          Bureau.
        </p>
      </div>
    </section>
  );
}
