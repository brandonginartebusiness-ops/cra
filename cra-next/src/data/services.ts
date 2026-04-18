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
    image: "/images/service-storm-hurricane.png",
    alt: "Aerial view of hurricane damage to Florida neighborhood",
    href: "/services/storm-hurricane",
    ctaLabel: "See a hurricane recovery",
  },
  {
    title: "Water Damage",
    description: "Pipe bursts, flooding, hidden moisture intrusion. Professional assessments that reveal the full scope.",
    image: "/images/service-water-damage.png",
    alt: "Interior water damage with standing water and peeling walls",
    href: "/services/water-damage",
    ctaLabel: "Read a water damage walkthrough",
  },
  {
    title: "Fire & Smoke",
    description: "Structural fire damage, smoke residue, and content loss. We fight for full replacement value, not depreciated guesses.",
    image: "/images/service-fire-smoke.png",
    alt: "Exterior of fire-damaged building with charred structure",
    href: "/services/fire-smoke",
    ctaLabel: "What counts as smoke damage?",
  },
  {
    title: "Roof Claims",
    description: "Age-related wear vs. storm impact: we bring the engineering reports to prove your damage is covered.",
    image: "/images/service-roof-claims.png",
    alt: "Aerial view of storm-damaged roof",
    href: "/services/roof-claims",
    ctaLabel: "How we prove a roof claim",
  },
  {
    title: "Appraisal Services",
    description: "When you and your insurance company cannot agree on the amount of a covered loss, the appraisal process puts valuation in independent hands.",
    image: "/images/service-roof-claims.png",
    alt: "Appraisal services",
    href: "/services/appraisal",
    ctaLabel: "When to invoke appraisal",
  },
];
