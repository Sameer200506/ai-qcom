"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingDown, TrendingUp, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { competitors } from "@/lib/mock-data";

export default function CompetitorsPage() {
  const [sel, setSel]   = useState(competitors[0]);
  const [tab, setTab]   = useState<"price" | "availability">("price");

  const Tip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: "var(--bg-2)", border: "1px solid var(--border-2)", borderRadius: 8, padding: "8px 12px" }}>
        <div style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#9d5cf6" }}>₹{payload[0].value}</div>
      </div>
    );
  };

  return (
    <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-1)", margin: 0 }}>Competitor Intelligence</h1>
        <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>Track competitor prices, discounts, and availability across platforms</p>
      </div>

      {/* Competitor selector cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        <style>{`@media (max-width: 700px) { .comp-cards { grid-template-columns: 1fr !important; } }`}</style>
        {competitors.map(c => (
          <button key={c.id} onClick={() => setSel(c)}
            style={{
              textAlign: "left", background: "var(--bg-2)", border: `1px solid ${sel.id === c.id ? "var(--purple)" : "var(--border)"}`,
              borderRadius: 12, padding: 16, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
              boxShadow: sel.id === c.id ? "0 0 20px rgba(124,58,237,0.12)" : "none",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9, background: "rgba(124,58,237,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 800, color: "#9d5cf6",
              }}>{c.name[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "var(--text-3)" }}>{c.category}</div>
              </div>
              {sel.id === c.id && <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#7c3aed" }} />}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Products tracked", val: c.products.length, color: "var(--text-1)" },
                {
                  label: "Price alerts", val: c.products.filter(p => p.theirPrice < p.ourPrice).length,
                  color: c.products.filter(p => p.theirPrice < p.ourPrice).length > 0 ? "#ef4444" : "#10b981"
                },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ textAlign: "center", padding: "8px 6px", borderRadius: 8, background: "var(--bg-1)" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color }}>{val}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Detail: table + chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
        <style>{`@media (max-width: 900px) { .comp-detail { grid-template-columns: 1fr !important; } }`}</style>

        {/* Price / availability table */}
        <div className="card">
          {/* Tab bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 2, padding: 3, borderRadius: 9, background: "var(--bg-1)", border: "1px solid var(--border)" }}>
              {(["price","availability"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{
                    padding: "5px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", border: "none", fontFamily: "inherit", textTransform: "capitalize",
                    background: tab === t ? "#7c3aed" : "transparent",
                    color: tab === t ? "white" : "var(--text-3)", transition: "all 0.15s",
                  }}>{t}</button>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>{sel.name}</span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: "right" }}>Our Price</th>
                <th style={{ textAlign: "right" }}>Their Price</th>
                {tab === "price" ? (
                  <><th style={{ textAlign: "right" }}>Our Disc.</th><th style={{ textAlign: "right" }}>Their Disc.</th></>
                ) : (
                  <><th style={{ textAlign: "center" }}>Our Stock</th><th style={{ textAlign: "center" }}>Their Stock</th></>
                )}
                <th style={{ textAlign: "right" }}>Delta</th>
              </tr>
            </thead>
            <tbody>
              {sel.products.map((p, i) => {
                const delta = p.ourPrice - p.theirPrice;
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 12 }}>{p.name}</td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: "var(--text-1)", fontSize: 12 }}>₹{p.ourPrice}</td>
                    <td style={{ textAlign: "right", fontWeight: 700, fontSize: 12, color: p.theirPrice < p.ourPrice ? "#ef4444" : "#10b981" }}>₹{p.theirPrice}</td>
                    {tab === "price" ? (
                      <>
                        <td style={{ textAlign: "right" }}><span className="badge badge-green">{p.ourDiscount}% off</span></td>
                        <td style={{ textAlign: "right" }}><span className="badge badge-yellow">{p.theirDiscount}% off</span></td>
                      </>
                    ) : (
                      <>
                        <td style={{ textAlign: "center" }}>{p.ourStock ? <CheckCircle size={15} color="#10b981" /> : <XCircle size={15} color="#ef4444" />}</td>
                        <td style={{ textAlign: "center" }}>{p.theirStock ? <CheckCircle size={15} color="#10b981" /> : <XCircle size={15} color="#ef4444" />}</td>
                      </>
                    )}
                    <td style={{ textAlign: "right" }}>
                      <span className={delta < 0 ? "stat-up" : "stat-down"} style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                        {delta < 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {delta < 0 ? "−" : "+"}₹{Math.abs(delta)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* AI insight */}
          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <AlertTriangle size={14} color="#9d5cf6" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.5, margin: 0 }}>
                <strong style={{ color: "var(--text-1)" }}>{sel.name}</strong> is cheaper on{" "}
                <strong style={{ color: "#ef4444" }}>{sel.products.filter(p => p.theirPrice < p.ourPrice).length} products</strong>.
                {" "}Consider a targeted discount or bundle to stay competitive.
              </p>
            </div>
          </div>
        </div>

        {/* Right: price history chart */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 2 }}>{sel.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 14 }}>30-day price history</div>
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={sel.priceHistory} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "var(--text-3)", fontSize: 9 }} axisLine={false} tickLine={false} interval={6} />
                <YAxis tick={{ fill: "var(--text-3)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}`} width={42} />
                <Tooltip content={<Tip />} />
                <ReferenceLine y={sel.products[0].ourPrice} stroke="#10b981" strokeDasharray="4 3"
                  label={{ value: "Ours", fill: "#10b981", fontSize: 9, position: "insideTopRight" }} />
                <Line type="monotone" dataKey="price" stroke="#9d5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Availability matrix */}
          <div className="card">
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>Availability Matrix</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {["Blinkit","Zepto","Instamart"].map((plat, i) => {
                const inStock = i < 2;
                return (
                  <div key={plat} style={{
                    textAlign: "center", padding: "10px 6px", borderRadius: 9,
                    background: "var(--bg-1)", border: `1px solid ${inStock ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: inStock ? "#10b981" : "#ef4444", margin: "0 auto 6px" }} />
                    <div style={{ fontSize: 10, color: "var(--text-2)", fontWeight: 500 }}>{plat}</div>
                    <div style={{ fontSize: 9, color: inStock ? "#10b981" : "#ef4444", marginTop: 2 }}>{inStock ? "In Stock" : "OOS"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
