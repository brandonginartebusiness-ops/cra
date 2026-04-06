export interface CaseResult {
  type: string;
  initial?: number;
  initialLabel?: string;
  recovered: number;
  review: {
    text: string;
    author: string;
    timeAgo: string;
  };
}

export const caseResults: CaseResult[] = [
  {
    type: "Hurricane Claim",
    initial: 18400,
    recovered: 147000,
    review: {
      text: "Our Home Insurance company really gave us hell on our claim from the Hurricane damage\u2026Thank God Eddy was there who fought for us and did everything he can to get what we deserved.",
      author: "Judy Vasquez",
      timeAgo: "6 months ago",
    },
  },
  {
    type: "Water Claim",
    initial: 5200,
    recovered: 42800,
    review: {
      text: "They provided us with support from beginning to end, handling all the necessary procedures with the relevant authorities. The most wonderful outcome was that we obtained a fair and accurate claim fully commensurate with our losses.",
      author: "Bettyna's Creative",
      timeAgo: "1 month ago",
    },
  },
  {
    type: "Roof Claim",
    initial: 12600,
    recovered: 89400,
    review: {
      text: "When the June 2024 rainstorms left my roof in rough shape, I felt overwhelmed until Claim Remedy Adjusters stepped in\u2026He was proactive, thorough, and always on my side.",
      author: "Charlie Ramos",
      timeAgo: "6 months ago",
    },
  },
  {
    type: "Mold Claim",
    initial: 3800,
    recovered: 28500,
    review: {
      text: "From getting the plumber and the mold expert to assess the damage, Eddy was on it. He kept me informed of any delays and of everything that was happening.",
      author: "Charles Jacque",
      timeAgo: "1 year ago",
    },
  },
  {
    type: "Denied Claim",
    initialLabel: "$0 denied",
    recovered: 67200,
    review: {
      text: "The insurance company was very difficult but Eddy was key in staying on top of them to get us best resolution. The team was very transparent from beginning to end.",
      author: "Mayra Peralta",
      timeAgo: "6 months ago",
    },
  },
  {
    type: "Commercial Loss",
    initial: 22100,
    recovered: 156800,
    review: {
      text: "Excellent service from start to finish. Eddy and his team handled everything professionally and kept us informed throughout the entire process. They recovered significantly more than what our insurance company initially offered.",
      author: "Roberto Martinez",
      timeAgo: "4 months ago",
    },
  },
];
