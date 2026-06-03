export interface Service {
  title: string;
  description: string;
  /** Primary image — kept for the /services index grid. */
  image: string;
  /** Carousel images for the homepage cards. First entry should match `image`.
   *  NOTE: these are on-theme stock photos — replace with real CRA job photos
   *  (before/after) as they come in; first-party photos also boost local SEO E-E-A-T. */
  images: string[];
  alt: string;
  href: string;
  /** Per-service CTA verb — replaces generic "Learn More" */
  ctaLabel: string;
}

// Unsplash URL helper — all IDs below are verified-resolving (HTTP 200).
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&auto=format&fit=crop&q=80`;

// Verified on-theme image pool
const IMG = {
  hurricane: "1662372597168-09d57440a9e5",
  water: "1657069344364-db3781b8dcf1",
  fire: "1657139218034-525cc80e707e",
  roof: "1658798105979-b6f06529fbd0",
  docs: "1637763723578-79a4ca9225f7",
  denial: "1450101499163-c8848c66ca85",
  commercial: "1486406146926-c627a92ad1ab",
} as const;

export const services: Service[] = [
  {
    title: "Storm & Hurricane",
    description: "Wind damage, missing shingles, structural compromise. We thoroughly document what insurers overlook.",
    image: u(IMG.hurricane),
    images: [u(IMG.hurricane), u(IMG.roof), u(IMG.water)],
    alt: "Hurricane and storm damage to a Florida property",
    href: "/services/storm-hurricane",
    ctaLabel: "See a hurricane recovery",
  },
  {
    title: "Water Damage",
    description: "Pipe bursts, flooding, hidden moisture intrusion. Professional assessments that reveal the full scope.",
    image: u(IMG.water),
    images: [u(IMG.water), u(IMG.roof), u(IMG.docs)],
    alt: "Interior water damage with standing water and peeling walls",
    href: "/services/water-damage",
    ctaLabel: "Read a water damage walkthrough",
  },
  {
    title: "Fire & Smoke",
    description: "Structural fire damage, smoke residue, and content loss. We fight for full replacement value, not depreciated guesses.",
    image: u(IMG.fire),
    images: [u(IMG.fire), u(IMG.docs), u(IMG.denial)],
    alt: "Exterior of fire-damaged building with charred structure",
    href: "/services/fire-smoke",
    ctaLabel: "What counts as smoke damage?",
  },
  {
    title: "Roof Claims",
    description: "Age-related wear vs. storm impact: we bring the engineering reports to prove your damage is covered.",
    image: u(IMG.roof),
    images: [u(IMG.roof), u(IMG.hurricane), u(IMG.docs)],
    alt: "Aerial view of storm-damaged roof",
    href: "/services/roof-claims",
    ctaLabel: "How we prove a roof claim",
  },
  {
    title: "Appraisal Services",
    description: "When you and your insurance company cannot agree on the amount of a covered loss, the appraisal process puts valuation in independent hands.",
    image: u(IMG.docs),
    images: [u(IMG.docs), u(IMG.commercial), u(IMG.denial)],
    alt: "Insurance appraisal paperwork and documentation",
    href: "/services/appraisal",
    ctaLabel: "When to invoke appraisal",
  },
  {
    title: "Mold Damage",
    description: "Hidden moisture often leads to mold that insurers try to exclude. We tie the mold back to a covered water event so it isn't denied as maintenance.",
    image: u(IMG.water),
    images: [u(IMG.water), u(IMG.docs), u(IMG.roof)],
    alt: "Interior wall with moisture and mold damage",
    href: "/services/mold-claims",
    ctaLabel: "Get a mold claim review",
  },
  {
    title: "Denied Claims",
    description: "A denial isn't the end. We pull apart the carrier's reasoning, re-document the loss, and re-present the claim with the evidence the first submission lacked.",
    image: u(IMG.denial),
    images: [u(IMG.denial), u(IMG.docs), u(IMG.water)],
    alt: "Insurance denial letter and paperwork on a desk",
    href: "/services/denied-claims",
    ctaLabel: "Challenge a denial",
  },
  {
    title: "Commercial Property",
    description: "Business interruption, complex valuations, and carrier forensic teams. We document the physical damage and the financial loss together — end to end.",
    image: u(IMG.commercial),
    images: [u(IMG.commercial), u(IMG.hurricane), u(IMG.fire)],
    alt: "Commercial office building exterior",
    href: "/services/commercial-property",
    ctaLabel: "Review a commercial loss",
  },
];
