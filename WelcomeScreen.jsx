import { useState } from "react";
import { PROFILES } from "../config/profiles";

export default function WelcomeScreen({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f0fdf4 0%,#f8fafc 50%,#f0f9ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      <div style={{ maxWidth: 660, width: "100%", textAlign: "center" }}>
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 24,
              margin: "0 auto 16px",
              background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
              border: "1.5px solid rgba(16,185,129,.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              boxShadow: "0 0 48px rgba(16,185,129,.18),0 4px 16px rgba(0,0,0,.06)",
            }}
          >
            ⚡
          </div>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            Fre<span style={{ color: "#10b981" }}>energia</span>
          </h1>
          <p
            style={{
              fontSize: 11,
              color: "#9ca3af",
              letterSpacing: "0.18em",
              marginBottom: 12,
            }}
          >
            INTELIGÊNCIA PARA O MERCADO LIVRE DE ENERGIA
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#fff",
              border: "1px solid #d1fae5",
              borderRadius: 20,
              padding: "5px 14px",
              fontSize: 11,
              color: "#059669",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }}
            />
            Consulta documentos oficiais da CCEE em tempo real
          </div>
        </div>

        {/* Pergunta */}
        <p style={{ fontSize: 16, color: "#374151", marginBottom: 24, fontWeight: 500 }}>
          Selecione seu perfil para começar:
        </p>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32 }}>
          {Object.values(PROFILES).map((p) => (
            <div
              key={p.id}
              onClick={() => onSelect(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                borderRadius: 18,
                padding: "26px 16px 22px",
                background: hovered === p.id ? `${p.color}0c` : "#fff",
                border: `1.5px solid ${hovered === p.id ? p.color + "70" : "#e5e7eb"}`,
                boxShadow:
                  hovered === p.id
                    ? `0 12px 32px ${p.color}22,0 2px 8px rgba(0,0,0,.04)`
                    : "0 1px 4px rgba(0,0,0,.06)",
                transition: "all .22s cubic-bezier(.4,0,.2,1)",
                transform: hovered === p.id ? "translateY(-5px)" : "none",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: hovered === p.id ? p.color : "#111827",
                  marginBottom: 7,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.label}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.7 }}>{p.tagline}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 10, color: "#d1d5db", letterSpacing: "0.12em" }}>
          BASEADO EXCLUSIVAMENTE EM DOCUMENTOS OFICIAIS · CCEE.ORG.BR
        </p>
      </div>
    </div>
  );
}
