import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Operations Studio | Intégration IA pour l'Immobilier";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #03050c 0%, #090e24 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(79,70,229,0.25)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(14,165,233,0.2)",
            filter: "blur(120px)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "99px",
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.1)",
            color: "#0ea5e9",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          ⚡ Automatisation IA · Immobilier
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          AI Operations{" "}
          <span style={{ color: "#0ea5e9" }}>Studio</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
            marginBottom: "48px",
          }}
        >
          Qualifiez vos leads automatiquement · Gagnez 10 à 20h/semaine
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          {[
            { value: "< 5 min", label: "Réponse prospect" },
            { value: "+30%", label: "Taux de conversion" },
            { value: "10-20h", label: "Gagné par semaine" },
          ].map((s) => (
            <div
              key={s.value}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "20px 32px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ fontSize: "32px", fontWeight: 800, color: "white" }}>
                {s.value}
              </span>
              <span style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            fontSize: "20px",
            color: "#64748b",
            fontWeight: 600,
          }}
        >
          aioperations.studio
        </div>
      </div>
    ),
    { ...size }
  );
}
