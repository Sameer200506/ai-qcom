"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Sparkles, TrendingUp, Shield, Zap, ChevronRight, Eye, EyeOff } from "lucide-react";

const DEMO = { email: "demo@mamaearth.in", password: "demo123" };

const FEATURES = [
  { icon: BarChart3,  label: "Unified Dashboard",       desc: "Revenue, orders & KPIs across all platforms" },
  { icon: Sparkles,   label: "AI Copilot",               desc: "Natural language insights & recommendations" },
  { icon: TrendingUp, label: "Demand Forecasting",       desc: "30-day ML-powered revenue predictions" },
  { icon: Shield,     label: "Competitor Intelligence",  desc: "Real-time price & availability tracking" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState(DEMO.email);
  const [password, setPassword] = useState(DEMO.password);
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (localStorage.getItem("qc-auth")) router.replace("/dashboard");
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 850));
    if (email === DEMO.email && password === DEMO.password) {
      localStorage.setItem("qc-auth", "1");
      router.replace("/dashboard");
    } else {
      setError("Invalid credentials. Use the pre-filled demo account.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-0)" }}>

      {/* ── Left hero panel ───────────────────────────────────── */}
      <div style={{
        display: "none", flex: "none", width: "48%", flexDirection: "column",
        justifyContent: "space-between", padding: "40px 48px",
        background: "linear-gradient(155deg, #0d0e1c 0%, #130f2a 50%, #0a0b0f 100%)",
        position: "relative", overflow: "hidden",
        ['@media (min-width: 1024px)' as string]: { display: "flex" },
      }}
        className="login-hero">
        <style>{`@media (min-width: 900px) { .login-hero { display: flex !important; } }`}</style>

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: -80, left: -80, width: 420, height: 420,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -60, right: -60, width: 320, height: 320,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 56 }}>
            <div className="anim-pulse-glow" style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Zap size={18} color="white" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
              QCommerce <span className="gradient-text">AI</span>
            </span>
          </div>

          <h1 style={{
            fontSize: 36, fontWeight: 800, color: "white",
            lineHeight: 1.15, margin: "0 0 14px",
          }}>
            Quick Commerce<br />
            <span className="gradient-text">Intelligence</span><br />
            Platform
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 40, lineHeight: 1.6 }}>
            AI-powered analytics for FMCG & D2C brands on Blinkit,<br />Zepto, and Swiggy Instamart.
          </p>

          {/* Feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="anim-fade-up" style={{
                display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
                borderRadius: 12, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: "rgba(124,58,237,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} color="#a78bfa" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 1 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 20, fontSize: 11, color: "var(--text-3)" }}>
          {["200+ brands", "₹500 Cr+ GMV tracked", "SOC2 Ready"].map((s, i) => (
            <span key={s}>{i > 0 && <span style={{ marginRight: 20 }}>·</span>}{s}</span>
          ))}
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────────── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px 24px",
      }}>
        <div className="anim-fade-up" style={{ width: "100%", maxWidth: 400 }}>

          {/* Mobile logo */}
          <div className="login-mobile-logo" style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 32,
          }}>
            <style>{`@media (min-width: 900px) { .login-mobile-logo { display: none !important; } }`}</style>
            <div style={{
              width: 36, height: 36, borderRadius: 9,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-1)" }}>
              QCommerce <span className="gradient-text">AI</span>
            </span>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-1)", margin: "0 0 6px" }}>Welcome back</h2>
          <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 28 }}>Sign in to your brand dashboard</p>

          {/* Demo hint */}
          <div style={{
            padding: "10px 14px", borderRadius: 10, marginBottom: 24, fontSize: 12,
            background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.18)",
            color: "#22d3ee",
          }}>
            🎯 <strong>Demo mode</strong> — credentials pre-filled. Just click Sign In.
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>
                Email address
              </label>
              <input className="input" type="email" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input className="input" style={{ paddingRight: 40 }}
                  type={showPw ? "text" : "password"}
                  value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: 2,
                }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: "10px 14px", borderRadius: 8, fontSize: 12,
                background: "rgba(239,68,68,0.08)", color: "#f87171",
                border: "1px solid rgba(239,68,68,0.18)",
              }}>{error}</div>
            )}

            <button type="submit" className="btn-primary"
              style={{ height: 42, fontSize: 14, fontWeight: 700 }} disabled={loading}>
              {loading
                ? <div style={{ width: 16, height: 16, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%" }} className="anim-spin" />
                : <><span>Sign In</span><ChevronRight size={15} /></>
              }
            </button>
          </form>

          <div style={{
            marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)",
            textAlign: "center", fontSize: 11, color: "var(--text-3)",
          }}>
            Powered by AI · Built for FMCG &amp; D2C brands
          </div>
        </div>
      </div>
    </div>
  );
}
