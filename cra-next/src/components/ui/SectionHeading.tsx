interface Props {
  label?: string;
  heading: string;
  subheading?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  heading,
  subheading,
  light = false,
  className,
}: Props) {
  const textColor = light ? "text-[#141314]" : "text-[#f0f0f5]";
  const mutedColor = light ? "text-[#696869]" : "text-[#9999aa]";
  const labelColor = light ? "text-[#3b82f6]" : "text-[#3b82f6]";

  return (
    <div className={className}>
      {label && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.1em] ${labelColor} mb-3`}
        >
          {label}
        </p>
      )}
      <h2
        className={`font-bebas text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight ${textColor}`}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      {subheading && (
        <p className={`mt-4 text-base leading-relaxed ${mutedColor} max-w-xl`}>
          {subheading}
        </p>
      )}
    </div>
  );
}
