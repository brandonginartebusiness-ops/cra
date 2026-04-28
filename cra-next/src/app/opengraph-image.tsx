import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Claim Remedy Adjusters — Your Claim. Our Fight.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 55%, #0d2847 100%)",
          color: "#f0f0f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#60a5fa",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#3b82f6",
              boxShadow: "0 0 24px #3b82f6",
            }}
          />
          Claim Remedy Adjusters
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "108px",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Your Claim.
          </div>
          <div
            style={{
              fontSize: "108px",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #60a5fa 0%, #2dd4bf 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Our Fight.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "20px",
            color: "#9999aa",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ color: "#f0f0f5", fontSize: "24px", fontWeight: 600 }}>
              Licensed Florida Public Adjusters
            </div>
            <div>No recovery, no fee · License W549958</div>
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#f0f0f5",
              borderLeft: "2px solid #3b82f6",
              paddingLeft: "20px",
            }}
          >
            claimremedyadjusters.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
