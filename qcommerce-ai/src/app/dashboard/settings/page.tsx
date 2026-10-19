"use client";
import { useState } from "react";
import { Building2, Users, Key, Bell, CreditCard, Shield, Copy, Check } from "lucide-react";

const TABS = [
  { id:"org",    icon: Building2,   label: "Organization"  },
  { id:"team",   icon: Users,       label: "Team & Roles"  },
  { id:"api",    icon: Key,         label: "API Keys"      },
  { id:"notifs", icon: Bell,        label: "Notifications" },
  { id:"billing",icon: CreditCard,  label: "Billing"       },
  { id:"security",icon: Shield,     label: "Security"      },
];

const TEAM = [
  { name:"Demo User",    email:"demo@mamaearth.in",  role:"Owner",            avatar:"D", active:"Now"  },
  { name:"Priya Sharma", email:"priya@mamaearth.in", role:"Admin",            avatar:"P", active:"2h ago" },
  { name:"Rahul Gupta",  email:"rahul@mamaearth.in", role:"Category Manager", avatar:"R", active:"1d ago" },
  { name:"Ananya Patel", email:"ananya@mamaearth.in",role:"Analyst",          avatar:"A", active:"3d ago" },
];
const ROLE_COLOR: Record<string,string> = { Owner:"#7c3aed", Admin:"#06b6d4", "Category Manager":"#10b981", Analyst:"#f59e0b" };

const MOCK_KEY = "qc_live_sk_7f2c8e1a4b9d3f6c2e8a1b4d7f9c3e6a";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{
      width: 36, height: 20, borderRadius: 10, border: "none", flexShrink: 0,
      background: on ? "var(--purple)" : "var(--bg-1)", cursor: "pointer",
      position: "relative", transition: "background 0.2s",
    }}>
      <div style={{
        position: "absolute", top: 2, width: 15, height: 15,
        borderRadius: "50%", background: "white", transition: "left 0.2s",
        left: on ? "calc(100% - 18px)" : 2, boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }} />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab]     = useState("org");
  const [copied, setCopied] = useState(false);
  const [notifs, setNotifs] = useState([
    { id:0, label:"Stockout Alerts",        desc:"When any SKU falls below threshold",          on:true  },
    { id:1, label:"Competitor Price Drops", desc:"When competitor drops price significantly",    on:true  },
    { id:2, label:"Revenue Reports",        desc:"Daily and weekly revenue summaries",           on:false },
    { id:3, label:"AI Insights",            desc:"Weekly AI-generated business insights",        on:true  },
    { id:4, label:"Import Completed",       desc:"When a data import finishes processing",       on:false },
    { id:5, label:"Alert Digest",           desc:"Daily digest of all triggered alerts",         on:true  },
  ]);
  const [security, setSecurity] = useState([
    { id:0, label:"Two-Factor Authentication", desc:"Add an extra layer of security",            on:false },
    { id:1, label:"Session Timeout",           desc:"Auto-logout after 8h of inactivity",        on:true  },
    { id:2, label:"Login Notifications",       desc:"Email on new device sign-in",               on:true  },
    { id:3, label:"IP Allowlist",              desc:"Restrict access to specific IPs",           on:false },
  ]);

  const copyKey = () => { navigator.clipboard.writeText(MOCK_KEY); setCopied(true); setTimeout(() => setCopied(false), 1400); };

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>{label}</label>
      <input className="input" defaultValue={value} />
    </div>
  );

  return (
    <div className="anim-fade-up">
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-1)", margin: 0 }}>Settings</h1>
        <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>Manage organization, team, integrations and preferences</p>
      </div>

      <div className="settings-layout">
        {/* Tab sidebar */}
        <div className="settings-sidebar">
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {TABS.map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setTab(id)}
                className={`nav-item ${tab === id ? "active" : ""}`}
                style={{ borderLeft: `2px solid ${tab === id ? "var(--purple)" : "transparent"}` }}>
                <Icon size={14} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Organization ───────────────────────────────── */}
          {tab === "org" && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                Organization Settings
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16, flexShrink: 0,
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 800, color: "white",
                }}>M</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>Mamaearth</div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 6 }}>FMCG · D2C Brand</div>
                  <button style={{ fontSize: 11, color: "var(--purple-l)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                    Change logo
                  </button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <FieldRow label="Company Name" value="Mamaearth" />
                <FieldRow label="Industry"     value="FMCG / Personal Care" />
                <FieldRow label="GST Number"   value="27AABCH1234A1Z5" />
                <FieldRow label="Timezone"     value="Asia/Kolkata (IST)" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 10 }}>Connected Platforms</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ n:"Blinkit",c:"#f7cd2e" },{ n:"Zepto",c:"#9b5cf6" },{ n:"Instamart",c:"#f97316" }].map(({ n, c }) => (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8, background: `${c}12`, border: `1px solid ${c}35` }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: c }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start", fontSize: 13 }}>Save Changes</button>
            </div>
          )}

          {/* ── Team ────────────────────────────────────────── */}
          {tab === "team" && (
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>Team Members</div>
                <button className="btn-primary" style={{ fontSize: 12 }}>+ Invite User</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TEAM.map(m => (
                  <div key={m.email} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: "var(--bg-1)" }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: "white",
                    }}>{m.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)" }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-3)" }}>{m.email}</div>
                    </div>
                    <span style={{ padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 600, background: `${ROLE_COLOR[m.role] ?? "#6b7280"}18`, color: ROLE_COLOR[m.role] ?? "#6b7280" }}>
                      {m.role}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text-3)", minWidth: 48, textAlign: "right" }}>{m.active}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── API Keys ────────────────────────────────────── */}
          {tab === "api" && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>API Keys</div>
              <div style={{ padding: "10px 14px", borderRadius: 9, background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 12, color: "#fbbf24" }}>
                ⚠️ Keep your API keys secret. Never share them publicly.
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", marginBottom: 8 }}>Live API Key</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <code style={{
                    flex: 1, padding: "9px 12px", borderRadius: 9, fontSize: 11,
                    background: "var(--bg-1)", border: "1px solid var(--border)",
                    color: "#9d5cf6", fontFamily: "JetBrains Mono, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{MOCK_KEY}</code>
                  <button onClick={copyKey} className="btn-secondary" style={{ fontSize: 12, gap: 6, flexShrink: 0 }}>
                    {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 6 }}>Last used: 2 hours ago</div>
              </div>
              <button className="btn-secondary" style={{ alignSelf: "flex-start", fontSize: 12 }}>Regenerate Key</button>
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", marginBottom: 10 }}>Webhook Endpoint</div>
                <input className="input" placeholder="https://your-app.com/webhook" />
                <button className="btn-secondary" style={{ fontSize: 12, marginTop: 10 }}>Add Webhook</button>
              </div>
            </div>
          )}

          {/* ── Notifications ───────────────────────────────── */}
          {tab === "notifs" && (
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", paddingBottom: 14, marginBottom: 4, borderBottom: "1px solid var(--border)" }}>
                Notification Preferences
              </div>
              {notifs.map((n, i) => (
                <div key={n.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < notifs.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)", marginBottom: 2 }}>{n.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>{n.desc}</div>
                  </div>
                  <Toggle on={n.on} onChange={() => setNotifs(p => p.map(x => x.id === n.id ? { ...x, on: !x.on } : x))} />
                </div>
              ))}
            </div>
          )}

          {/* ── Billing ─────────────────────────────────────── */}
          {tab === "billing" && (
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                Billing & Subscription
              </div>
              <div style={{ padding: "18px 20px", borderRadius: 14, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div className="gradient-text" style={{ fontSize: 17, fontWeight: 800 }}>Growth Plan</div>
                  <span className="badge badge-purple">Active</span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text-1)", marginBottom: 4 }}>
                  ₹24,999<span style={{ fontSize: 13, fontWeight: 400, color: "var(--text-3)" }}>/month</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>Next billing: July 1, 2026</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[{ l:"Platforms",u:"3 / 5" },{ l:"Users",u:"4 / 10" },{ l:"SKUs",u:"156 / 500" }].map(({ l, u }) => (
                  <div key={l} style={{ textAlign: "center", padding: "14px 8px", borderRadius: 12, background: "var(--bg-1)", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-1)" }}>{u}</div>
                    <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start", fontSize: 13 }}>Upgrade Plan</button>
            </div>
          )}

          {/* ── Security ────────────────────────────────────── */}
          {tab === "security" && (
            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", paddingBottom: 14, marginBottom: 4, borderBottom: "1px solid var(--border)" }}>
                Security Settings
              </div>
              {security.map((s, i) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < security.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-1)", marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>{s.desc}</div>
                  </div>
                  <Toggle on={s.on} onChange={() => setSecurity(p => p.map(x => x.id === s.id ? { ...x, on: !x.on } : x))} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
