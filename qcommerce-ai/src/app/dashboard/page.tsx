"use client";
import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts";
import {
  TrendingUp, DollarSign, ShoppingCart, Package, BarChart2,
  Target, AlertTriangle, ArrowUpRight, ArrowDownRight,
  RefreshCw, Zap, Activity,
} from "lucide-react";
import Link from "next/link";
import {
  kpis, platformBreakdown, revenueTrend, weeklyTrend, monthlyTrend,
  topSkus, categoryMix, cityPerformance, forecastData, alerts,
  formatCurrency, formatNumber,
} from "@/lib/mock-data";

type Period = "daily" | "weekly" | "monthly";

/* ── KPI Card ────────────────────────────────────────────────────── */
function KPICard({ title, value, change, unit, icon: Icon, color }: {
  title: string; value: number; change: number; unit: string;
  icon: React.ElementType; color: string;
}) {
  const up = change >= 0;
  const fmtValue =
    unit === "₹" ? formatCurrency(value) :
    unit === "%" ? `${value}%` :
    formatNumber(value);

  return (
    <div className="card" style={{ position: "relative", overflow: "hidden" }}>
      {/* Glow accent */}
      <div style={{
        position: "absolute", top: -20, right: -20, width: 80, height: 80,
        borderRadius: "50%", background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: `${color}18`, border: `1px solid ${color}30`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon size={16} color={color} />
        </div>
        <div className={up ? "stat-up" : "stat-down"}>
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(change)}%
        </div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-1)", letterSpacing: "-0.5px", marginBottom: 4 }}>
        {fmtValue}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}>{title}</div>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}60, transparent)`,
      }} />
    </div>
  );
}

/* ── Tooltip ──────────────────────────────────────────────────────── */
const ChartTip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-2)", border: "1px solid var(--border-2)",
      borderRadius: 10, padding: "10px 14px", minWidth: 140,
    }}>
      <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 8, fontWeight: 600 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "var(--text-2)", flex: 1 }}>{p.name}</span>
          <span style={{ fontSize: 12, color: "var(--text-1)", fontWeight: 700 }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const PieTip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-2)", border: "1px solid var(--border-2)",
      borderRadius: 8, padding: "8px 12px",
    }}>
      <span style={{ color: payload[0].payload.color, fontWeight: 600, fontSize: 12 }}>{payload[0].name} </span>
      <span style={{ color: "var(--text-1)", fontWeight: 700, fontSize: 13 }}>{payload[0].value}%</span>
    </div>
  );
};

/* ── Period toggle ────────────────────────────────────────────────── */
function PeriodToggle({ value, onChange }: { value: Period; onChange: (p: Period) => void }) {
  return (
    <div style={{
      display: "flex", gap: 2, padding: 3, borderRadius: 9, background: "var(--bg-1)",
      border: "1px solid var(--border)",
    }}>
      {(["daily", "weekly", "monthly"] as Period[]).map(p => (
        <button key={p} onClick={() => onChange(p)}
          style={{
            padding: "4px 12px", borderRadius: 7, fontSize: 11, fontWeight: 600,
            cursor: "pointer", border: "none", fontFamily: "inherit",
            background: value === p ? "#7c3aed" : "transparent",
            color: value === p ? "white" : "var(--text-3)",
            transition: "all 0.15s", textTransform: "capitalize",
          }}>
          {p}
        </button>
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("daily");

  const chartData: Record<string, string | number>[] =
    period === "daily" ? revenueTrend.slice(-30) :
    period === "weekly" ? weeklyTrend : monthlyTrend;
  const xKey = period === "daily" ? "date" : period === "weekly" ? "week" : "month";
  const unread = alerts.filter(a => !a.read).slice(0, 3);

  return (
    <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-1)", margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>June 2026 · Blinkit + Zepto + Instamart</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-secondary" style={{ gap: 6, fontSize: 12 }}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button className="btn-primary" style={{ fontSize: 12 }}>
            Jun 2026
          </button>
        </div>
      </div>

      {/* KPI Grid — row 1 */}
      <div className="kpi-grid">
        <KPICard title="Total Revenue"     value={kpis.revenue.value}      change={kpis.revenue.change}      unit="₹" icon={DollarSign}  color="#7c3aed" />
        <KPICard title="Total Orders"      value={kpis.orders.value}       change={kpis.orders.change}       unit=""  icon={ShoppingCart} color="#06b6d4" />
        <KPICard title="Units Sold"        value={kpis.unitsSold.value}    change={kpis.unitsSold.change}    unit=""  icon={Package}      color="#10b981" />
        <KPICard title="GMV"               value={kpis.gmv.value}          change={kpis.gmv.change}          unit="₹" icon={BarChart2}    color="#f59e0b" />
      </div>

      {/* KPI Grid — row 2 */}
      <div className="kpi-grid">
        <KPICard title="Market Share"      value={kpis.marketShare.value}  change={kpis.marketShare.change}  unit="%" icon={Target}       color="#ec4899" />
        <KPICard title="Avg. Sell Price"   value={kpis.avgSellingPrice.value} change={kpis.avgSellingPrice.change} unit="₹" icon={TrendingUp} color="#f97316" />
        <KPICard title="Gross Margin"      value={kpis.margin.value}       change={kpis.margin.change}       unit="%" icon={Activity}    color="#8b5cf6" />
        <KPICard title="Active Stockouts"  value={kpis.stockouts.value}    change={kpis.stockouts.change}    unit=""  icon={AlertTriangle} color="#ef4444" />
      </div>

      {/* Platform breakdown */}
      <div className="platform-grid">
        {platformBreakdown.map(p => (
          <div key={p.platform} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `${p.color}18`, border: `1px solid ${p.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 800, color: p.color,
            }}>
              {p.platform[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 2 }}>{p.platform}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: p.color, letterSpacing: "-0.3px" }}>
                {formatCurrency(p.revenue)}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>
                {p.orders.toLocaleString("en-IN")} orders · {p.share}%
              </div>
            </div>
            {/* mini share bar */}
            <div style={{ width: 40, flexShrink: 0, textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-1)" }}>{p.share}%</div>
              <div style={{
                height: 3, borderRadius: 2, background: "var(--bg-1)",
                marginTop: 4, overflow: "hidden",
              }}>
                <div style={{ height: "100%", width: `${p.share}%`, background: p.color, borderRadius: 2 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue trend chart */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)" }}>Revenue Trend</div>
            <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>Platform-wise breakdown across all channels</div>
          </div>
          <PeriodToggle value={period} onChange={setPeriod} />
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              {[
                { id: "gB", c: "#F7CD2E" }, { id: "gZ", c: "#9B5CF6" }, { id: "gI", c: "#F97316" }
              ].map(({ id, c }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={c} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={c} stopOpacity={0}    />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "var(--text-3)", fontSize: 10 }} interval="preserveStartEnd" />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-3)", fontSize: 10 }} tickFormatter={v => formatCurrency(v)} width={60} />
            <Tooltip content={<ChartTip />} />
            <Legend iconType="circle" iconSize={7} formatter={v => <span style={{ color: "var(--text-2)", fontSize: 11 }}>{v}</span>} />
            <Area type="monotone" dataKey="blinkit"   name="Blinkit"   stroke="#F7CD2E" strokeWidth={2} fill="url(#gB)" dot={false} />
            <Area type="monotone" dataKey="zepto"     name="Zepto"     stroke="#9B5CF6" strokeWidth={2} fill="url(#gZ)" dot={false} />
            <Area type="monotone" dataKey="instamart" name="Instamart" stroke="#F97316" strokeWidth={2} fill="url(#gI)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Main bottom section */}
      <div className="dash-main-grid">
        {/* Left: Top SKUs table */}
        <div className="card" style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)" }}>Top 10 SKUs</div>
            <span className="badge badge-purple">June 2026</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 28 }}>#</th>
                  <th>Product</th>
                  <th style={{ textAlign: "right" }}>Revenue</th>
                  <th style={{ textAlign: "right" }}>Growth</th>
                  <th style={{ textAlign: "right", minWidth: 80 }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {topSkus.map(sku => (
                  <tr key={sku.rank}>
                    <td style={{ color: "var(--text-3)", fontWeight: 700, fontSize: 11 }}>{sku.rank}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 12, marginBottom: 1, maxWidth: 220 }} className="text-truncate">
                        {sku.name}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-3)" }}>{sku.sku} · {sku.category}</div>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: "var(--text-1)", fontSize: 12 }}>
                      {formatCurrency(sku.revenue)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className={sku.growth >= 0 ? "stat-up" : "stat-down"}>
                        {sku.growth >= 0 ? "+" : ""}{sku.growth}%
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                        <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--bg-1)", overflow: "hidden" }}>
                          <div style={{
                            height: "100%", borderRadius: 2,
                            width: `${sku.stockLevel}%`,
                            background: sku.stockLevel < 25 ? "#ef4444" : sku.stockLevel < 50 ? "#f59e0b" : "#10b981",
                          }} />
                        </div>
                        <span style={{
                          fontSize: 10, minWidth: 24, textAlign: "right",
                          color: sku.stockLevel < 25 ? "#ef4444" : sku.stockLevel < 50 ? "#f59e0b" : "var(--text-3)",
                        }}>{sku.stockLevel}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Category donut */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>Category Mix</div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={categoryMix} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {categoryMix.map((c, i) => <Cell key={i} fill={c.color} stroke="none" />)}
                </Pie>
                <Tooltip content={<PieTip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginTop: 8 }}>
              {categoryMix.map(c => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: "var(--text-2)", flex: 1 }} className="text-truncate">{c.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-1)" }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* City performance */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>Top Cities</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cityPerformance.slice(0, 5).map(c => (
                <div key={c.city} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text-2)", width: 72, flexShrink: 0 }} className="text-truncate">{c.city}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--bg-1)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      width: `${(c.revenue / cityPerformance[0].revenue) * 100}%`,
                      background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                    }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-1)", width: 48, textAlign: "right" }}>
                    {formatCurrency(c.revenue)}
                  </span>
                  <span style={{ fontSize: 10, width: 36, textAlign: "right", color: c.growth > 20 ? "#10b981" : "var(--text-3)" }}>
                    +{c.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: forecast + alerts */}
      <div className="dash-bottom">

        {/* Forecast */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Zap size={13} color="#9d5cf6" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>30-Day Revenue Forecast</div>
              <div style={{ fontSize: 10, color: "var(--text-3)" }}>ML-powered prediction with confidence interval</div>
            </div>
            <span className="badge badge-purple" style={{ marginLeft: "auto" }}>AI</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={forecastData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.06} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--text-3)", fontSize: 9 }} interval={5} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-3)", fontSize: 9 }} tickFormatter={v => formatCurrency(v)} width={58} />
              <Tooltip content={<ChartTip />} />
              <Area type="monotone" dataKey="upper"    name="Upper"    stroke="none"    fill="url(#gR)" dot={false} />
              <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#7c3aed" strokeWidth={2} fill="url(#gF)" dot={false} strokeDasharray="5 3" />
              <Area type="monotone" dataKey="lower"    name="Lower"    stroke="none"    fill="none"     dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>Recent Alerts</div>
            <Link href="/dashboard/alerts" style={{ fontSize: 12, fontWeight: 600, color: "#9d5cf6", textDecoration: "none" }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {unread.map(alert => (
              <div key={alert.id} style={{
                display: "flex", gap: 12, padding: "12px 14px",
                borderRadius: 10, background: "var(--bg-1)", border: "1px solid var(--border)",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: alert.severity === "critical" ? "rgba(239,68,68,0.12)" :
                    alert.severity === "warning" ? "rgba(245,158,11,0.12)" : "rgba(99,102,241,0.12)",
                }}>
                  <AlertTriangle size={14} color={
                    alert.severity === "critical" ? "#ef4444" :
                    alert.severity === "warning"  ? "#f59e0b" : "#818cf8"
                  } />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", marginBottom: 3 }} className="text-truncate">
                    {alert.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-3)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {alert.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
