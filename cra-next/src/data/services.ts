export interface Service {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  /** Per-service CTA verb — replaces generic "Learn More" */
  ctaLabel: string;
}

export const services: Service[] = [
  {
    title: "Storm & Hurricane",
    description: "Wind damage, missing shingles, structural compromise. We thoroughly document what insurers overlook.",
    image: "https://images.unsplash.com/photo-1662372597168-09d57440a9e5?w=1200&auto=format&fit=crop&q=80",
    alt: "Aerial view of hurricane damage to Florida neighborhood",
    href: "/services/storm-hurricane",
    ctaLabel: "See a hurricane recovery",
  },
  {
    title: "Water Damage",
    description: "Pipe bursts, flooding, hidden moisture intrusion. Professional assessments that reveal the full scope.",
    image: "https://images.unsplash.com/photo-1657069344364-db3781b8dcf1?w=1200&auto=format&fit=crop&q=80",
    alt: "Interior water damage with standing water and peeling walls",
    href: "/services/water-damage",
    ctaLabel: "Read a water damage walkthrough",
  },
  {
    title: "Fire & Smoke",
    description: "Structural fire damage, smoke residue, and content loss. We fight for full replacement value, not depreciated guesses.",
    image: "https://images.unsplash.com/photo-1657139218034-525cc80e707e?w=1200&auto=format&fit=crop&q=80",
    alt: "Exterior of fire-damaged building with charred structure",
    href: "/services/fire-smoke",
    ctaLabel: "What counts as smoke damage?",
  },
  {
    title: "Roof Claims",
    description: "Age-related wear vs. storm impact: we bring the engineering reports to prove your damage is covered.",
    image: "https://images.unsplash.com/photo-1658798105979-b6f06529fbd0?w=1200&auto=format&fit=crop&q=80",
    alt: "Aerial view of storm-damaged roof",
    href: "/services/roof-claims",
    ctaLabel: "How we prove a roof claim",
  },
  {
    title: "Appraisal Services",
    description: "When you and your insurance company cannot agree on the amount of a covered loss, the appraisal process puts valuation in independent hands.",
    image: "https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?w=1200&auto=format&fit=crop&q=80",
    alt: "Insurance appraisal paperwork and documentation",
    href: "/services/appraisal",
    ctaLabel: "When to invoke appraisal",
  },
];
