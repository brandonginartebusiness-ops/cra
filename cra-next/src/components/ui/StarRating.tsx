interface Props {
  count?: number;
  className?: string;
}

export default function StarRating({ count = 5, className }: Props) {
  return (
    <span className={className} aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#d4a853" }}>
          ★
        </span>
      ))}
    </span>
  );
}
