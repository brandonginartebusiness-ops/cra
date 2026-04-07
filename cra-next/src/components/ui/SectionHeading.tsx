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
  const labelColor = accent === "teal" ? "text-[#0d9488]" : "text-[#3b82f6]";

  return (
    <div className={className}>
      {label && (
        <p className={`font-serif text-sm ${labelColor} mb-3 tracking-wide`}>
          {label}
        </p>
      )}
      <h2
        className="font-bebas text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-[#f0f0f5]"
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      {subheading && (
        <p className="mt-4 text-base leading-relaxed text-[#9999aa] max-w-xl">
          {subheading}
        </p>
      )}
    </div>
  );
}
