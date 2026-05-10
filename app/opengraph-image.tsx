import { ImageResponse } from "next/og";

export const alt = "Enow Divine — Senior Software Engineer · SaaS & Payments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0f0f0f",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ededed",
          position: "relative",
        }}
      >
        {/* subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(#ededed 1px, transparent 1px), linear-gradient(90deg, #ededed 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              background: "#22e0d4",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#22e0d4",
              fontWeight: 700,
            }}
          >
            Portfolio · SaaS & Payments
          </div>
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#ededed",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Enow Divine.</span>
          <span style={{ color: "#888888", fontSize: 56, fontWeight: 700, marginTop: 16 }}>
            Senior software engineer.
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              color: "#888888",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            7+ years · Stripe · Mobile Money · Microservices
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              color: "#22e0d4",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 700,
            }}
          >
            enowdivine.com →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
