import type { ReactNode } from "react";

interface Props {
  label?: string;
  /** Pass a string for plain text, or JSX for styled content (e.g. gradient spans). */
  heading: string | ReactNode;
  subheading?: string;
  accent?: "blue" | "teal";
  className?: string;
  /** Set to true when the section background is dark */
  dark?: boolean;
  /** @deprecated — kept for backwards compat; light is always true now */
  light?: boolean;
}

export default function SectionHeading({
  label,
  heading,
  subheading,
  accent = "blue",
  className,
  dark = false,
}: Props) {
  const labelColor = accent === "teal" ? "text-[#0d9488]" : "text-[#2563eb]";
  const headingColor = dark ? "text-[#f0f0f5]" : "text-[#1a1a2e]";
  const subheadingColor = dark ? "text-[#9999aa]" : "text-[#3a3a52]";

  return (
    <div className={`text-center ${className ?? ""}`}>
      {label && (
        <p className={`font-serif font-semibold text-4xl md:text-5xl ${labelColor} mb-2 tracking-wide`}>
          {label}
        </p>
      )}
      <h2 className={`font-bebas font-extrabold text-2xl md:text-3xl leading-snug tracking-tight ${headingColor}`}>
        {typeof heading === "string" ? (
          /* Internal-only strings may contain <br/> and <span> for styling.
             All values are hardcoded in our own components — never user input. */
          <span dangerouslySetInnerHTML={{ __html: heading }} />
        ) : (
          heading
        )}
      </h2>
      {subheading && (
        <p className={`mt-4 text-lg md:text-xl leading-relaxed ${subheadingColor} max-w-2xl mx-auto`}>
          {subheading}
        </p>
      )}
    </div>
  );
}
