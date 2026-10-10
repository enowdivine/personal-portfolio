import { ImageResponse } from "next/og";

export const alt =
  "Enow Divine — senior software engineer building payment systems, SaaS products and mobile apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Hex literals rather than the CSS tokens: Satori, the renderer behind
   `next/og`, resolves no custom properties and no `hsl()` from a stylesheet it
   never sees. Each is the sRGB conversion of the matching token in
   app/globals.css — `--color-background`, `--color-foreground`,
   `--color-muted-foreground`, `--color-primary`, `--color-amber` — and they
   are all fully opaque, because Satori's support for 8-digit hex is not
   something an OG image should depend on. If a token changes, change its twin
   here. */
const PAPER = "#FCFBF8";
const INK = "#15232E";
const MUTED = "#55636D";
const BRONZE = "#B05111";
const AMBER = "#FBA441";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: INK,
          position: "relative",
        }}
      >
        {/* The warm corner light the site's hero carries, flattened to one
            radial so Satori can draw it. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(60% 60% at 85% 10%, ${AMBER} 0%, ${PAPER} 68%)`,
            opacity: 0.35,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 44,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: AMBER,
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: BRONZE,
              fontWeight: 700,
            }}
          >
            Senior software engineer · Buea, Cameroon
          </div>
        </div>

        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Enow Divine</span>
          <span
            style={{
              color: MUTED,
              fontSize: 48,
              fontWeight: 600,
              marginTop: 22,
              lineHeight: 1.15,
            }}
          >
            Payment systems, SaaS products and mobile apps that hold up in
            production.
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 20, color: MUTED, fontWeight: 500 }}>
            7+ years · 10+ production platforms · Founder of SaaS Simplified
          </div>
          <div
            style={{
              fontSize: 20,
              color: BRONZE,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            enowdivine.net →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
