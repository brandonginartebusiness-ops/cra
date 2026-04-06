"use client";

// Coordinate transform — real lon/lat → SVG pixels
// viewBox: 400 × 520
// Geographic bounds:
//   Lon: 87.65°W (panhandle west) → 79.97°E (SE coast)  span = 7.68°
//   Lat: 31.00°N (north border)   → 24.40°N (Key West)  span = 6.60°
//
//   x(lon) = 22 + (87.65 - lon) / 7.68 * 356
//   y(lat) = 18 + (31.00 - lat) / 6.60 * 484

function x(lon: number) { return +(22 + (87.65 - lon) / 7.68 * 356).toFixed(1); }
function y(lat: number) { return +(18 + (31.00 - lat) / 6.60 * 484).toFixed(1); }

// ── City data (real coordinates) ──────────────────────────────────────────
const cities = [
  // Panhandle
  { name: "Pensacola",       lon: 87.22, lat: 30.42, highlight: false, anchor: "start"  as const, dx:  7, dy: -7  },
  { name: "Tallahassee",     lon: 84.28, lat: 30.44, highlight: false, anchor: "middle" as const, dx:  0, dy: -8  },
  // North / Central
  { name: "Jacksonville",    lon: 81.66, lat: 30.33, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Gainesville",     lon: 82.33, lat: 29.65, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Daytona Beach",   lon: 81.02, lat: 29.21, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Orlando",         lon: 81.38, lat: 28.54, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  // West coast
  { name: "Tampa",           lon: 82.46, lat: 27.95, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Sarasota",        lon: 82.53, lat: 27.34, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Fort Myers",      lon: 81.87, lat: 26.64, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Naples",          lon: 81.80, lat: 26.14, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  // South Florida
  { name: "West Palm Beach", lon: 80.06, lat: 26.71, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Fort Lauderdale", lon: 80.14, lat: 26.12, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Miami Lakes",     lon: 80.43, lat: 25.91, highlight: true,  anchor: "end"    as const, dx: -9, dy:  5  },
  { name: "Miami",           lon: 80.19, lat: 25.77, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  { name: "Homestead",       lon: 80.48, lat: 25.47, highlight: false, anchor: "end"    as const, dx: -7, dy: -7  },
  // Keys
  { name: "Key West",        lon: 81.78, lat: 24.56, highlight: false, anchor: "middle" as const, dx:  0, dy:  13 },
];

// ── Florida Keys chain (lon/lat dots from Florida City → Key West) ─────────
const keysChain = [
  [80.50, 25.15], // Florida City / Card Sound
  [80.55, 25.08], // Key Largo north
  [80.65, 24.93], // Key Largo south
  [80.80, 24.82], // Islamorada
  [81.00, 24.72], // Marathon
  [81.22, 24.64], // Big Pine Key
  [81.55, 24.58], // Sugarloaf Key
  [81.78, 24.56], // Key West
];

// ── South Florida service-area polygon (Miami-Dade + Broward + Palm Beach) ─
const serviceArea = [
  [80.03, 26.97], // Palm Beach NE
  [80.03, 26.12], // Palm Beach SE coast
  [80.17, 25.15], // Miami-Dade SE tip
  [80.88, 25.13], // Miami-Dade SW
  [80.88, 25.50], // Miami-Dade west mid
  [80.68, 26.33], // Broward west
  [80.68, 26.97], // Palm Beach NW
].map(([lon, lat]) => `${x(lon)},${y(lat)}`).join(" ");

// ── Lake Okeechobee ───────────────────────────────────────────────────────
// Center ~80.80°W, 26.90°N; roughly 25 mi wide × 20 mi tall
const lakeX = x(80.80);
const lakeY = y(26.90);

// ── Florida outline — ~120 points traced from real geography ──────────────
// Panhandle west → Gulf coast → Keys tip → Atlantic coast → north border
const pts: [number, number][] = [
  // NW panhandle corner
  [87.62, 30.24],
  // Panhandle Gulf coast going east
  [87.40, 30.22],
  [87.00, 30.30],
  [86.50, 30.36],
  [86.20, 30.46],
  [85.70, 30.15],
  [85.50, 29.96],
  [85.40, 29.68],
  [85.32, 29.63],
  // Big Bend — coast turns south
  [85.10, 29.72],
  [84.80, 29.84],
  [84.50, 29.94],
  [84.00, 29.76],
  [83.60, 29.53],
  [83.40, 29.19],
  [83.20, 28.98],
  [82.80, 28.86],
  // Nature Coast
  [82.67, 28.75],
  [82.60, 28.55],
  [82.65, 28.35],
  // Tampa Bay north entrance
  [82.78, 28.07],
  [82.75, 27.85],
  // Tampa Bay — indent
  [82.64, 27.74],
  [82.44, 27.56],
  [82.55, 27.37],
  // Sarasota → Charlotte
  [82.58, 27.10],
  [82.40, 26.93],
  [82.12, 26.78],
  // Fort Myers / Cape Coral
  [81.97, 26.62],
  [81.83, 26.44],
  // Lee Island Coast
  [81.74, 26.24],
  [81.80, 26.05],
  // Naples / Ten Thousand Islands
  [81.80, 25.80],
  [81.70, 25.60],
  [81.37, 25.32],
  [81.12, 25.22],
  [80.90, 25.17],
  // Florida City — southern tip
  [80.58, 25.13],
  [80.38, 25.12],
  [80.22, 25.17],
  // SE coast going north — Atlantic side
  [80.12, 25.38],
  [80.10, 25.60],
  [80.14, 25.78],  // Miami
  [80.10, 26.00],
  [80.08, 26.13],  // Fort Lauderdale
  [80.04, 26.35],
  [80.03, 26.71],  // West Palm Beach
  [80.04, 27.00],
  [80.08, 27.35],
  [80.16, 27.56],  // Fort Pierce / Stuart
  [80.25, 27.72],
  [80.28, 28.00],
  [80.36, 28.36],  // Brevard / Cape Canaveral
  [80.54, 28.48],
  [80.63, 28.60],
  [80.60, 28.84],
  [80.72, 29.10],
  [80.90, 29.35],  // Daytona area
  [81.03, 29.48],
  [81.10, 29.66],
  [81.27, 29.90],
  [81.36, 30.10],
  [81.44, 30.23],  // St. Augustine
  [81.46, 30.36],  // Jacksonville area
  [81.52, 30.57],
  [81.50, 30.72],
  // North border going west
  [82.00, 30.57],
  [82.20, 30.54],
  [82.60, 30.57],
  [83.00, 30.64],
  [83.50, 30.64],
  [84.00, 30.68],
  [84.28, 30.68],  // Tallahassee area
  [84.80, 30.68],
  [85.00, 30.99],
  [85.50, 30.99],
  [85.80, 30.99],
  [86.20, 30.99],
  [86.60, 30.99],
  [87.00, 30.99],
  [87.30, 30.83],
  [87.45, 30.55],
  [87.62, 30.24],  // back to start
];

const FLORIDA_PATH = pts
  .map(([lon, lat], i) => `${i === 0 ? "M" : "L"} ${x(lon)},${y(lat)}`)
  .join(" ") + " Z";

const KEYS_PATH = keysChain
  .map(([lon, lat], i) => `${i === 0 ? "M" : "L"} ${x(lon)},${y(lat)}`)
  .join(" ");

export default function FloridaMap() {
  return (
    <svg
      viewBox="0 0 400 520"
      className="w-full max-w-[300px] lg:max-w-[340px] h-auto"
      aria-label="Florida service area map"
    >
      {/* Service area highlight — South Florida */}
      <polygon
        points={serviceArea}
        fill="rgba(59,130,246,0.08)"
        stroke="rgba(59,130,246,0.28)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* State outline */}
      <path
        d={FLORIDA_PATH}
        fill="rgba(59,130,246,0.10)"
        stroke="rgba(59,130,246,0.42)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Florida Keys chain */}
      <path
        d={KEYS_PATH}
        fill="none"
        stroke="rgba(59,130,246,0.35)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      {keysChain.map(([lon, lat], i) => (
        <circle key={i} cx={x(lon)} cy={y(lat)} r={1.8} fill="rgba(59,130,246,0.55)" />
      ))}

      {/* Lake Okeechobee */}
      <ellipse
        cx={lakeX}
        cy={lakeY}
        rx={14}
        ry={11}
        fill="rgba(59,130,246,0.18)"
        stroke="rgba(59,130,246,0.30)"
        strokeWidth="0.8"
      />

      {/* City markers */}
      {cities.map((city) => {
        const cx = x(city.lon);
        const cy = y(city.lat);
        return (
          <g key={city.name}>
            {city.highlight && (
              <circle cx={cx} cy={cy} r={14} fill="rgba(59,130,246,0.14)" className="animate-pulse" />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={city.highlight ? 5 : 2.5}
              fill={city.highlight ? "#3b82f6" : "rgba(59,130,246,0.65)"}
            />
            <text
              x={cx + city.dx}
              y={cy + city.dy}
              textAnchor={city.anchor}
              fontSize="8.5"
              fill="#9999aa"
              fontFamily="sans-serif"
            >
              {city.name}
            </text>
            {city.highlight && (
              <text
                x={cx - 11}
                y={cy + 5}
                textAnchor="end"
                fontSize="7.5"
                fill="#3b82f6"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                HQ
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
