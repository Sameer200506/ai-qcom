"use client";
import { useState } from "react";
import { Bell, ShoppingCart, TrendingDown, Zap, Tag, X, CheckCircle } from "lucide-react";
import { alerts as initialAlerts } from "@/lib/mock-data";

const TYPE_META: Record<string, { icon: React.ElementType; color: string }> = {
  stockout:   { icon: ShoppingCart, color: "#ef4444" },
  competitor: { icon: TrendingDown, color: "#f59e0b" },
  revenue:    { icon: Zap,          color: "#9d5cf6" },
  promotion:  { icon: Tag,          color: "#06b6d4" },
};

type Alert = typeof initialAlerts[number];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("all");
  const [rules, setRules]   = useState([
    { id: 0, name: "Stockout Risk Alert",       desc: "Notify when stock < 25%",             on: true  },
    { id: 1, name: "Competitor Price Drop",      desc: "Notify when competitor drops > 10%",  on: true  },
    { id: 2, name: "Revenue Drop Alert",         desc: "Notify when daily revenue drops 15%", on: false },
    { id: 3, name: "Sales Spike Alert",          desc: "On unusual demand surge > 50%",       on: true  },
    { id: 4, name: "Weekend Promotion Prompt",   desc: "Suggest promotions on Fridays",       on: false },
  ]);

  const dismiss  = (id: string) => setAlerts(p => p.filter(a => a.id !== id));
  const markRead = (id: string) => setAlerts(p => p.map(a => a.id === id ? { ...a, read: true } : a));
  const markAll  = ()           => setAlerts(p => p.map(a => ({ ...a, read: true })));
  const toggle   = (id: number) => setRules(p => p.map(r => r.id === id ? { ...r, on: !r.on } : r));

  const filtered = filter === "all" ? alerts : alerts.filter(a => a.type === filter);
  const unread   = alerts.filter(a => !a.read).length;

  const sevColor: Record<string, string> = { critical: "#ef4444", warning: "#f59e0b", info: "#818cf8" };

  return (
    <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-1)", margin: 0 }}>Alerts</h1>
          <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>{unread} unread · {alerts.length} total</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="btn-secondary" style={{ fontSize: 12, gap: 6 }}>
            <CheckCircle size={13} /> Mark all read
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>
        <style>{`@media (max-width: 900px) { .alerts-grid { grid-template-columns: 1fr !important; } }`}</style>

        {/* Alert feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["all","stockout","competitor","revenue","promotion"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`chip ${filter === f ? "active" : ""}`}
                style={{ textTransform: "capitalize" }}>
                {f}{f === "all" && <span style={{ opacity: 0.5 }}>({alerts.length})</span>}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filtered.map(alert => {
            const meta = TYPE_META[alert.type] ?? { icon: Bell, color: "#818cf8" };
            const Icon = meta.icon;
            return (
              <div key={alert.id} className="anim-fade-in"
                onClick={() => markRead(alert.id)}
                style={{
                  display: "flex", gap: 14, padding: "14px 16px",
                  borderRadius: 12, cursor: "pointer", transition: "border-color 0.15s",
                  background: "var(--bg-2)",
                  border: `1px solid ${!alert.read ? "rgba(124,58,237,0.25)" : "var(--border)"}`,
                }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${meta.color}14`, border: `1px solid ${meta.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} color={meta.color} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", flex: 1 }} className="text-truncate">
                      {alert.title}
                    </span>
                    {!alert.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />}
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999,
                      background: `${sevColor[alert.severity]}15`, color: sevColor[alert.severity], flexShrink: 0,
                    }}>{alert.severity}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5, margin: "0 0 8px" }}>{alert.message}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {alert.platform && <span className="badge badge-blue">{alert.platform}</span>}
                    {alert.sku && <span style={{ fontSize: 10, color: "var(--text-3)", fontFamily: "monospace" }}>{alert.sku}</span>}
                    <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--text-3)" }}>
                      {new Date(alert.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>

                <button onClick={e => { e.stopPropagation(); dismiss(alert.id); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: 4, borderRadius: 6, flexShrink: 0, alignSelf: "flex-start" }}>
                  <X size={14} />
                </button>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-3)" }}>
              <Bell size={32} style={{ margin: "0 auto 10px", opacity: 0.25 }} />
              <p style={{ fontSize: 14 }}>No alerts in this category</p>
            </div>
          )}
        </div>

        {/* Rules panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 16 }}>Alert Rules</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {rules.map((r, i) => (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 0", borderBottom: i < rules.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text-3)" }}>{r.desc}</div>
                  </div>
                  <button onClick={() => toggle(r.id)} style={{
                    width: 36, height: 20, borderRadius: 10, flexShrink: 0, border: "none",
                    background: r.on ? "var(--purple)" : "var(--bg-1)", cursor: "pointer",
                    position: "relative", transition: "background 0.2s",
                  }}>
                    <div style={{
                      position: "absolute", top: 2, width: 15, height: 15,
                      borderRadius: "50%", background: "white", transition: "left 0.2s",
                      left: r.on ? "calc(100% - 18px)" : 2,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 14 }}>Notification Channels</div>
            {[{ icon: "📧", name: "Email", active: true }, { icon: "💬", name: "Slack", active: false }, { icon: "📱", name: "WhatsApp", active: false }].map(ch => (
              <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 16 }}>{ch.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-2)", flex: 1 }}>{ch.name}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: ch.active ? "#10b981" : "#ef4444" }}>
                  {ch.active ? "Active" : "Off"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
