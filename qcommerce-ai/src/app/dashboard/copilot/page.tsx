"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, User, ChevronRight, RotateCcw, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCopilotResponse, BRAND } from "@/lib/mock-data";

interface Msg { id: string; role: "user" | "assistant"; content: string; ts: Date; }

const SUGGESTIONS = [
  "Summarize this month's performance",
  "Which SKU should I restock urgently?",
  "Why did sales decrease last week?",
  "Compare performance vs competitors",
  "What is my 30-day revenue forecast?",
  "Which city has the highest growth?",
  "Recommend a pricing strategy",
  "Generate executive summary",
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Msg[]>([{
    id: "init", role: "assistant", ts: new Date(),
    content: `## 👋 Welcome to AI Copilot\n\nI'm your AI assistant for **${BRAND}** across Blinkit, Zepto, and Swiggy Instamart.\n\nI can help you:\n- **Analyze** sales, inventory, and market share\n- **Explain** why metrics changed\n- **Predict** demand and revenue trends\n- **Recommend** restocking and pricing actions\n\nTry one of the suggestions on the left, or ask me anything.`,
  }]);
  const [input, setInput]     = useState("");
  const [thinking, setThinking] = useState(false);
  const [copied, setCopied]   = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = async (text: string) => {
    if (!text.trim() || thinking) return;
    const id = Date.now().toString();
    setMessages(prev => [...prev, { id, role: "user", content: text.trim(), ts: new Date() }]);
    setInput("");
    setThinking(true);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 700));
    setMessages(prev => [...prev, {
      id: id + "_r", role: "assistant", content: getCopilotResponse(text), ts: new Date()
    }]);
    setThinking(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const copyMsg = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  };

  const fmt = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="copilot-shell">
      {/* ── Suggestions sidebar ──────────────────────────── */}
      <div className="copilot-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Sparkles size={14} color="#9d5cf6" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)" }}>Suggested Questions</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              style={{
                textAlign: "left", padding: "9px 12px", borderRadius: 8,
                fontSize: 12, color: "var(--text-2)", background: "var(--bg-3)",
                border: "1px solid var(--border)", cursor: "pointer",
                transition: "all 0.15s", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--purple)"; (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}>
              <span style={{ flex: 1 }}>{s}</span>
              <ChevronRight size={11} style={{ flexShrink: 0, opacity: 0.4 }} />
            </button>
          ))}
        </div>
        <button onClick={() => setMessages([])}
          style={{
            display: "flex", alignItems: "center", gap: 6, marginTop: 12,
            fontSize: 11, color: "var(--text-3)", background: "none", border: "none",
            cursor: "pointer", fontFamily: "inherit", padding: "4px 0",
          }}>
          <RotateCcw size={12} /> Clear history
        </button>
      </div>

      {/* ── Chat main ────────────────────────────────────── */}
      <div className="copilot-main">
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 20px", borderBottom: "1px solid var(--border)",
          background: "var(--bg-1)", flexShrink: 0,
        }}>
          <div className="anim-pulse-glow" style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sparkles size={15} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>AI Copilot</div>
            <div style={{ fontSize: 10, color: "var(--text-3)" }}>Demo mode · {BRAND}</div>
          </div>
          <div style={{
            marginLeft: "auto", display: "flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 500,
            background: "rgba(16,185,129,0.08)", color: "#10b981",
            border: "1px solid rgba(16,185,129,0.18)",
          }}>
            <div className="anim-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
            Online
          </div>
        </div>

        {/* Messages */}
        <div className="copilot-messages scroll-thin">
          {messages.map(msg => (
            <div key={msg.id} className="anim-fade-in" style={{
              display: "flex", gap: 10,
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-end",
            }}>
              {/* Avatar */}
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: msg.role === "assistant"
                  ? "linear-gradient(135deg, #7c3aed, #06b6d4)"
                  : "var(--bg-3)",
                border: msg.role === "user" ? "1px solid var(--border)" : "none",
              }}>
                {msg.role === "assistant"
                  ? <Sparkles size={13} color="white" />
                  : <User size={13} color="var(--text-2)" />}
              </div>

              {/* Bubble */}
              <div style={{
                maxWidth: "72%", position: "relative",
                background: msg.role === "user" ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "var(--bg-2)",
                border: msg.role === "assistant" ? "1px solid var(--border)" : "none",
                borderRadius: msg.role === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                padding: "10px 14px",
              }}>
                {msg.role === "assistant"
                  ? <div className="md" style={{ fontSize: 13 }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                  : <div style={{ fontSize: 13, color: "white", lineHeight: 1.5 }}>{msg.content}</div>
                }
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginTop: 6,
                }}>
                  <span style={{
                    fontSize: 10, color: msg.role === "user" ? "rgba(255,255,255,0.45)" : "var(--text-3)"
                  }}>{fmt(msg.ts)}</span>
                  {msg.role === "assistant" && (
                    <button onClick={() => copyMsg(msg.id, msg.content)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "var(--text-3)", padding: "2px", borderRadius: 4, display: "flex",
                    }}>
                      {copied === msg.id ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {thinking && (
            <div className="anim-fade-in" style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Sparkles size={13} color="white" />
              </div>
              <div style={{
                padding: "12px 18px", borderRadius: "4px 14px 14px 14px",
                background: "var(--bg-2)", border: "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center", height: 16 }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="typing-dot" style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#9d5cf6",
                      animationDelay: `${i * 0.16}s`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips (small screens) */}
        <div style={{
          padding: "8px 20px", display: "flex", gap: 6,
          overflowX: "auto", flexShrink: 0, borderTop: "1px solid var(--border)",
        }} className="xl-hide scroll-thin">
          <style>{`@media (min-width: 1280px) { .xl-hide { display: none !important; } }`}</style>
          {SUGGESTIONS.slice(0, 4).map(s => (
            <button key={s} onClick={() => send(s)} className="chip" style={{ fontSize: 11 }}>{s}</button>
          ))}
        </div>

        {/* Input area */}
        <div className="copilot-input-area">
          <div style={{
            display: "flex", alignItems: "flex-end", gap: 10,
            background: "var(--bg-2)", border: "1px solid var(--border-2)",
            borderRadius: 12, padding: "8px 8px 8px 14px",
          }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about sales, inventory, competitors, forecasts…"
              rows={1}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                resize: "none", fontSize: 13, color: "var(--text-1)",
                fontFamily: "inherit", lineHeight: 1.5, maxHeight: 120,
                padding: "4px 0",
              }}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || thinking} style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0, border: "none",
              cursor: input.trim() && !thinking ? "pointer" : "default",
              background: input.trim() && !thinking ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "var(--bg-hover)",
              color: input.trim() && !thinking ? "white" : "var(--text-3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>
              <Send size={15} />
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 10, color: "var(--text-3)", marginTop: 8 }}>
            Demo mode · Responses are simulated from your mock data
          </p>
        </div>
      </div>
    </div>
  );
}
