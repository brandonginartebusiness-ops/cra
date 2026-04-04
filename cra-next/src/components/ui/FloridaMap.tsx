"use client";

// Coordinate transform — maps real lon/lat to SVG coordinates.
// Bounds: lon 88.0°W–79.7°W (8.3° span), lat 31.2°N–24.3°N (6.9° span)
// Usable area: 290×390 px with 15px padding in a 320×420 viewBox.
//   x = 15 + (88.0 - lon) / 8.3 * 290
//   y = 15 + (31.2 - lat) / 6.9 * 390

const cities = [
  // Tallahassee  (84.3°W, 30.4°N)  → x=144, y=60
  { name: "Tallahassee", x: 144, y: 60, anchor: "start" as const, dx: 8,  dy: -8,  highlight: false },
  // Jacksonville (81.7°W, 30.3°N)  → x=235, y=66
  { name: "Jacksonville", x: 235, y: 66, anchor: "end"   as const, dx: -8, dy: -8,  highlight: false },
  // Orlando      (81.4°W, 28.5°N)  → x=246, y=168
  { name: "Orlando",      x: 244, y: 168, anchor: "end"   as const, dx: -8, dy: -8,  highlight: false },
  // Tampa        (82.5°W, 27.9°N)  → x=207, y=201
  { name: "Tampa",        x: 204, y: 201, anchor: "end"   as const, dx: -8, dy: -8,  highlight: false },
  // Fort Lauderdale (80.1°W, 26.1°N) → x=291, y=302
  { name: "Fort Lauderdale", x: 289, y: 302, anchor: "end" as const, dx: -8, dy: -8, highlight: false },
  // Miami        (80.2°W, 25.8°N)  → x=288, y=320
  { name: "Miami",        x: 288, y: 320, anchor: "end"   as const, dx: -8, dy:  5,  highlight: true  },
  // Key West     (81.8°W, 24.5°N)  → x=232, y=394
  { name: "Key West",     x: 232, y: 394, anchor: "middle" as const, dx: 0,  dy:  13, highlight: false },
];

// Florida outline path — 41 points traced clockwise from the NW panhandle
// corner, south along the Gulf coast, around the southern tip, north along
// the Atlantic coast, and back west along the north border.
const FLORIDA_PATH = `
  M 29,26
  L 29,60  L 21,70  L 32,76
  L 48,68  L 68,72
  L 95,82
  L 108,104 L 120,100
  L 132,92  L 148,76
  L 155,84  L 163,100
  L 179,116 L 190,133
  L 204,147
  L 198,182 L 198,200
  L 202,222
  L 206,234 L 210,250
  L 222,258 L 229,274
  L 232,292 L 232,303
  L 236,314
  L 248,338
  L 256,358 L 254,368
  L 264,358 L 272,344 L 280,338
  L 290,322
  L 291,303 L 292,270
  L 282,218
  L 274,168
  L 260,128
  L 248,88
  L 246,62  L 244,44  L 242,26
  L 29,26 Z
`.replace(/\s+/g, " ").trim();

export default function FloridaMap() {
  return (
    <svg
      viewBox="0 0 320 420"
      className="w-full max-w-[300px] lg:max-w-[320px] h-auto"
      aria-label="Florida service area map"
    >
      {/* State outline */}
      <path
        d={FLORIDA_PATH}
        fill="rgba(59, 130, 246, 0.12)"
        stroke="rgba(59, 130, 246, 0.45)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Subtle Keys arc from south tip toward Key West */}
      <path
        d="M 254,368 Q 245,382 232,394"
        fill="none"
        stroke="rgba(59, 130, 246, 0.25)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* City markers */}
      {cities.map((city) => (
        <g key={city.name}>
          {city.highlight && (
            <circle
              cx={city.x}
              cy={city.y}
              r={13}
              fill="rgba(59, 130, 246, 0.15)"
              className="animate-pulse"
            />
          )}
          <circle
            cx={city.x}
            cy={city.y}
            r={city.highlight ? 5 : 3}
            fill={city.highlight ? "#3b82f6" : "rgba(59, 130, 246, 0.7)"}
          />
          <text
            x={city.x + city.dx}
            y={city.y + city.dy}
            textAnchor={city.anchor}
            fontSize="9"
            fill="#9999aa"
            fontFamily="sans-serif"
          >
            {city.name}
          </text>
          {city.highlight && (
            <text
              x={city.x - 8}
              y={city.y + 5}
              textAnchor="end"
              fontSize="7"
              fill="#3b82f6"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              HQ
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
