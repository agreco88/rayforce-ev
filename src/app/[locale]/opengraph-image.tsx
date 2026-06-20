import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rayforce – Cargadores Wallbox en Uruguay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle green glow */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "60%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 80% 40%, rgba(0,201,80,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            color: "#00c950",
            fontSize: 13,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          Rayforce
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 700,
          }}
        >
          Cargadores Wallbox en Uruguay
        </div>

        {/* Subline */}
        <div
          style={{
            display: "flex",
            color: "#a3a3a3",
            fontSize: 22,
            lineHeight: 1.4,
            marginBottom: 52,
            maxWidth: 560,
          }}
        >
          Venta e instalación certificada por UTE y URSEA.
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            background: "#00c950",
            color: "#000000",
            fontSize: 18,
            fontWeight: 700,
            padding: "14px 28px",
            borderRadius: 10,
          }}
        >
          Ver modelos y precios →
        </div>
      </div>
    ),
    { ...size },
  );
}
