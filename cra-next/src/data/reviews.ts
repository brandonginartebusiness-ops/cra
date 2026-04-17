export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  timeAgo: string;
  relativeDate: string;
  claimType?: string;
}

export const googleReviewsUrl =
  "https://search.google.com/local/reviews?placeid=ChIJy6vXSOEIMK8RJvzhZzwTlxI";

// Total verified Google reviews on the live business profile.
// Keep this in sync with the actual count on Google — not derived from
// the `allReviews` array (which only holds a curated subset for display).
export const totalGoogleReviewCount = 45;

export const featuredReviews: GoogleReview[] = [
  {
    id: "judy-vasquez",
    author: "Judy Vasquez",
    rating: 5,
    text: "Our Home Insurance company really gave us hell on our claim from the Hurricane damage\u2026Thank God Eddy was there who fought for us and did everything he can to get what we deserved.",
    timeAgo: "6 months ago",
    relativeDate: "6 months ago",
    claimType: "hurricane",
  },
  {
    id: "alexis-torres",
    author: "Alexis Torres",
    rating: 5,
    text: "I recently had the pleasure of working with Claim Remedy Adjuster after a water leak in my house. From the moment they arrived, their professionalism and expertise shone through.",
    timeAgo: "5 months ago",
    relativeDate: "5 months ago",
    claimType: "water",
  },
  {
    id: "charlie-ramos",
    author: "Charlie Ramos",
    rating: 5,
    text: "When the June 2024 rainstorms left my roof in rough shape, I felt overwhelmed until Claim Remedy Adjusters stepped in\u2026He was proactive, thorough, and always on my side.",
    timeAgo: "6 months ago",
    relativeDate: "6 months ago",
    claimType: "roof",
  },
  {
    id: "charles-jacque",
    author: "Charles Jacque",
    rating: 5,
    text: "From getting the plumber and the mold expert to assess the damage, Eddy was on it. He kept me informed of any delays and of everything that was happening.",
    timeAgo: "1 year ago",
    relativeDate: "1 year ago",
    claimType: "mold",
  },
  {
    id: "mayra-peralta",
    author: "Mayra Peralta",
    rating: 5,
    text: "The insurance company was very difficult but Eddy was key in staying on top of them to get us best resolution. The team was very transparent from beginning to end.",
    timeAgo: "6 months ago",
    relativeDate: "6 months ago",
    claimType: "denied",
  },
  {
    id: "bettynas-creative",
    author: "Bettyna's Creative",
    rating: 5,
    text: "They provided us with support from beginning to end, handling all the necessary procedures with the relevant authorities. We obtained a fair and accurate claim fully commensurate with our losses.",
    timeAgo: "1 month ago",
    relativeDate: "1 month ago",
    claimType: "commercial",
  },
];

export const allReviews: GoogleReview[] = [
  ...featuredReviews,
  {
    id: "gisella-alfaro",
    author: "Gisella Alfaro",
    rating: 5,
    text: "Eddy is the type of person that goes above and beyond helping clients with their insurance claims. He truly cares about achieving the best result possible for his clients.",
    timeAgo: "3 months ago",
    relativeDate: "3 months ago",
  },
  {
    id: "roberto-martinez",
    author: "Roberto Martinez",
    rating: 5,
    text: "Excellent service from start to finish. Eddy and his team handled everything professionally and kept us informed throughout the entire process.",
    timeAgo: "4 months ago",
    relativeDate: "4 months ago",
  },
  {
    id: "maria-gonzalez",
    author: "Maria Gonzalez",
    rating: 5,
    text: "I was struggling with my insurance company for months. Claim Remedy stepped in and within weeks had everything resolved. Highly recommend their services.",
    timeAgo: "7 months ago",
    relativeDate: "7 months ago",
  },
  {
    id: "david-chen",
    author: "David Chen",
    rating: 5,
    text: "Professional, responsive, and effective. They recovered significantly more than what my insurance company initially offered. Worth every penny.",
    timeAgo: "8 months ago",
    relativeDate: "8 months ago",
  },
  {
    id: "sandra-lopez",
    author: "Sandra Lopez",
    rating: 5,
    text: "Eddy and his team were incredible. They handled all the paperwork, negotiations, and communication with the insurance company. I didn't have to worry about anything.",
    timeAgo: "9 months ago",
    relativeDate: "9 months ago",
  },
  {
    id: "evolution-glass",
    author: "Evolution Glass and Mirror",
    rating: 5,
    text: "The best service in Miami. Professional, knowledgeable, and dedicated to getting the best results for their clients.",
    timeAgo: "2 years ago",
    relativeDate: "2 years ago",
    claimType: "commercial",
  },
];
