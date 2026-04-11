interface Props {
  label?: string;
  heading: string;
  subheading?: string;
  accent?: "blue" | "teal";
  className?: string;
  /** @deprecated — kept for backwards compat; light is always true now */
  light?: boolean;
}

export default function SectionHeading({
  label,
  heading,
  subheading,
  accent = "blue",
  className,
}: Props) {
  const labelColor = accent === "teal" ? "text-[#0d9488]" : "text-[#2563eb]";

  return (
    <div className={`text-center ${className ?? ""}`}>
      {label && (
        <p className={`font-serif font-semibold text-3xl md:text-4xl ${labelColor} mb-3 tracking-wide`}>
          {label}
        </p>
      )}
      <h2
        className="font-bebas font-extrabold text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-[#1a1a2e]"
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      {subheading && (
        <p className="mt-4 text-sm leading-relaxed text-[#5a5a72] max-w-xl mx-auto">
          {subheading}
        </p>
      )}
    </div>
  );
}
