import { useState, useRef, useEffect } from "react";
import { PROFILES } from "../config/profiles";
import { SUGGESTED } from "../config/suggestions";
import { sendMessage } from "../services/anthropic";

export default function ChatScreen({ profileId, onReset }) {
  const p = PROFILES[profileId];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const txt = (text || input).trim();
    if (!txt || loading) return;
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";

    const msgs = [...messages, { role: "user", content: txt }];
    setMessages(msgs);
    setLoading(true);

    try {
      const reply = await sendMessage({
        systemPrompt: p.system,
        messages: msgs,
      });
      setMessages([...msgs, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Freenergia error:", err);
      setMessages([
        ...msgs,
        { role: "assistant", content: `❌ Erro ao consultar: ${err.message}. Tente novamente.` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,.97)",
          backdropFilter: "blur(12px)",
          padding: "13px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
              border: "1px solid rgba(16,185,129,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ⚡
          </div>
          <div>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#111827", letterSpacing: "-0.01em" }}>
              Fre<span style={{ color: "#10b981" }}>energia</span>
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 10, letterSpacing: "0.06em" }}>
              {p.icon} {p.label.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          onClick={onReset}
          style={{
            background: "none",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            color: "#6b7280",
            fontSize: 11,
            cursor: "pointer",
            padding: "5px 12px",
            transition: "all .15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#fca5a5";
            e.currentTarget.style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          ← trocar perfil
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 8px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {messages.length === 0 && (
            <div>
              <div
                style={{
                  border: `1px solid ${p.color}28`,
                  borderRadius: 16,
                  padding: "20px 22px",
                  background: `${p.color}07`,
                  marginBottom: 24,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: p.color, marginBottom: 8 }}>
                  Olá, time {p.label}! 👋
                </div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.85, margin: 0 }}>
                  Consulto exclusivamente os{" "}
                  <strong style={{ color: "#111827" }}>documentos oficiais da CCEE</strong> em tempo
                  real. Nunca invento respostas — se não encontrar a informação, te digo exatamente
                  onde buscar.
                </p>
              </div>
              <div
                style={{ fontSize: 10, color: "#d1d5db", letterSpacing: "0.12em", marginBottom: 10 }}
              >
                SUGESTÕES PARA O SEU PERFIL
              </div>
              {SUGGESTED[profileId].map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 16px",
                    marginBottom: 8,
                    border: `1px solid ${p.color}22`,
                    borderRadius: 11,
                    textAlign: "left",
                    color: "#374151",
                    fontSize: 13,
                    cursor: "pointer",
                    background: "#fff",
                    fontFamily: "inherit",
                    lineHeight: 1.5,
                    transition: "transform .15s",
                    boxShadow: "0 1px 3px rgba(0,0,0,.04)",
                  }}
                >
                  <span style={{ color: p.color, marginRight: 10, fontWeight: 700 }}>→</span>
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              {msg.role === "user" ? (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      maxWidth: "72%",
                      padding: "12px 16px",
                      borderRadius: "16px 16px 4px 16px",
                      background: `linear-gradient(135deg,${p.color}1a,${p.color}0a)`,
                      border: `1px solid ${p.color}30`,
                      fontSize: 13,
                      color: "#111827",
                      lineHeight: 1.8,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                      border: "1px solid rgba(16,185,129,.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      marginTop: 2,
                    }}
                  >
                    ⚡
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: "4px 16px 16px 16px",
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      fontSize: 13,
                      color: "#374151",
                      lineHeight: 1.9,
                      whiteSpace: "pre-wrap",
                      boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
                  border: "1px solid rgba(16,185,129,.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px 16px 16px 16px",
                  fontSize: 12,
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                }}
              >
                <span style={{ letterSpacing: "0.06em" }}>consultando ccee.org.br</span>
                <span style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2].map((n) => (
                    <span
                      key={n}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: p.color,
                        display: "inline-block",
                        animation: "blink 1.4s infinite",
                        animationDelay: `${n * 0.2}s`,
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}

          <style>{`@keyframes blink{0%,80%,100%{opacity:.15}40%{opacity:1}}`}</style>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          background: "rgba(255,255,255,.98)",
          backdropFilter: "blur(12px)",
          padding: "12px 20px 16px",
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 13,
              padding: "10px 12px",
              transition: "border-color .2s,box-shadow .2s",
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = p.color;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${p.color}18`;
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={`Sua dúvida sobre procedimentos CCEE (${p.label})...`}
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "#111827",
                fontSize: 13,
                lineHeight: 1.6,
                fontFamily: "inherit",
                resize: "none",
                maxHeight: 120,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                background:
                  input.trim() && !loading
                    ? `linear-gradient(135deg,${p.accent},${p.color})`
                    : "#e5e7eb",
                border: "none",
                color: input.trim() && !loading ? "#fff" : "#9ca3af",
                borderRadius: 9,
                padding: "8px 18px",
                fontSize: 12,
                fontWeight: 700,
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                flexShrink: 0,
                transition: "all .2s",
                fontFamily: "inherit",
              }}
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>
          <p
            style={{
              marginTop: 6,
              fontSize: 9,
              color: "#d1d5db",
              textAlign: "center",
              letterSpacing: "0.1em",
            }}
          >
            FREENERGIA · DOCUMENTOS OFICIAIS CCEE · VERIFIQUE SEMPRE A VERSÃO VIGENTE
          </p>
        </div>
      </div>
    </div>
  );
}
