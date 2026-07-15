import { ImageResponse } from "next/og";

export const alt = "CalcNest — Free online calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #0f1c22 0%, #0c2b32 45%, #0e7c6b 140%)",
          color: "#f3fbf9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#14967f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>CalcNest</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            Free online calculators
          </div>
          <div style={{ fontSize: 26, opacity: 0.85, maxWidth: 800 }}>
            EMI · BMI · Age · GST · Currency · Scientific & more
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
