"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import LangToggle from "@/components/layout/LangToggle";

// Featured cities surfaced directly in the Areas dropdown (the rest live on /areas).
const FEATURED_CITY_SLUGS = [
  "miami",
  "miami-lakes",
  "hialeah",
  "fort-lauderdale",
  "hollywood",
  "coral-gables",
  "pembroke-pines",
  "west-palm-beach",
];

const featuredCities = FEATURED_CITY_SLUGS.map((slug) =>
  cities.find((c) => c.slug === slug)
).filter((c): c is (typeof cities)[number] => Boolean(c));

const serviceLinks = services.map((s) => ({ label: s.title, href: s.href }));
const areaLinks = featuredCities.map((c) => ({ label: c.city, href: `/areas/${c.slug}` }));

// Simple top-level links (no dropdown).
const simpleLinks = [
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
  const [mobileGroup, setMobileGroup] = useState<string | null>(null); // mobile accordion
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);
  const pathname = usePathname();

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    if (open) setOpen(false);
    if (openMenu) setOpenMenu(null);
    if (mobileGroup) setMobileGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active ? "text-white" : "text-white/60 hover:text-white"
    }`;

  // Desktop dropdown group: opens on hover or keyboard focus-within.
  const Dropdown = ({
    id,
    label,
    items,
    allHref,
    allLabel,
  }: {
    id: string;
    label: string;
    items: { label: string; href: string }[];
    allHref: string;
    allLabel: string;
  }) => {
    const groupActive = isActive(allHref);
    const isOpen = openMenu === id;
    return (
      <li
        className="relative"
        onMouseEnter={() => setOpenMenu(id)}
        onMouseLeave={() => setOpenMenu((cur) => (cur === id ? null : cur))}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setOpenMenu((cur) => (cur === id ? null : cur));
          }
        }}
      >
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setOpenMenu((cur) => (cur === id ? null : id))}
          className={`flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm ${linkClass(
            groupActive
          )}`}
        >
          {label}
          <Chevron open={isOpen} />
        </button>

        <div
          className={`absolute left-0 top-full pt-3 transition-[opacity,transform] duration-200 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <div className="min-w-[230px] bg-[#1f1f33] border border-white/10 rounded-xl shadow-2xl p-2">
            <ul className="flex flex-col">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={isActive(it.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 ${
                      isActive(it.href)
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-white/10 pt-1">
                <Link
                  href={allHref}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#60a5fa] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
                >
                  {allLabel} &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  };

  // Mobile accordion group.
  const MobileGroup = ({
    id,
    label,
    items,
    allHref,
    allLabel,
  }: {
    id: string;
    label: string;
    items: { label: string; href: string }[];
    allHref: string;
    allLabel: string;
  }) => {
    const expanded = mobileGroup === id;
    return (
      <li>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setMobileGroup((cur) => (cur === id ? null : id))}
          className="flex items-center gap-2 text-2xl font-semibold text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
        >
          {label}
          <Chevron open={expanded} />
        </button>
        {expanded && (
          <ul className="mt-3 ml-3 flex flex-col gap-3 border-l border-white/10 pl-4">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  aria-current={isActive(it.href) ? "page" : undefined}
                  className={`text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm ${
                    isActive(it.href) ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={allHref}
                className="text-lg font-semibold text-[#60a5fa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm"
              >
                {allLabel} &rarr;
              </Link>
            </li>
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow] duration-300 ${
          scrolled ? "bg-[#1a1a2e] shadow-lg py-3" : "bg-[#1a1a2e] py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" aria-label="Home">
            <Image
              src="/brand_assets/logo.png"
              alt="Claim Remedy Adjusters"
              width={120}
              height={35}
              style={{ height: 35, width: "auto" }}
              priority
              fetchPriority="high"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            <Dropdown
              id="services"
              label="Services"
              items={serviceLinks}
              allHref="/services"
              allLabel="All services"
            />
            <Dropdown
              id="areas"
              label="Areas"
              items={areaLinks}
              allHref="/areas"
              allLabel="View all 35 areas"
            />
            {simpleLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={linkClass(isActive(l.href))}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#2563eb] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
            >
              Free Claim Review
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-40 bg-[#1a1a2e] flex flex-col justify-center px-8 overflow-y-auto py-24 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-6">
          <MobileGroup
            id="services"
            label="Services"
            items={serviceLinks}
            allHref="/services"
            allLabel="All services"
          />
          <MobileGroup
            id="areas"
            label="Areas"
            items={areaLinks}
            allHref="/areas"
            allLabel="View all 35 areas"
          />
          {simpleLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-2xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60 rounded-sm ${
                  isActive(l.href) ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Hidden below md, where the StickyMobileCTA already pins a Call button
            to the bottom of the screen (avoids the duplicate "Call" the audit
            flagged on phones). Shown 768–1023px, where the sticky bar is hidden
            but this drawer still renders, so tablet users keep a call action. */}
        <a
          href="tel:+13057331670"
          className="mt-10 hidden md:inline-flex items-center justify-center bg-[#2563eb] text-white font-semibold py-4 rounded-full text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/60"
        >
          Call Now
        </a>
      </div>
    </>
  );
}
