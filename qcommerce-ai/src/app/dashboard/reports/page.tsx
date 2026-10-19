"use client";
import { useState } from "react";
import { FileBarChart, Download, Calendar, Clock, CheckCircle, RefreshCw } from "lucide-react";

const REPORT_TYPES = ["Weekly Performance","Monthly Executive Summary","SKU Analysis","Competitor Intelligence","Inventory Health","Platform Comparison"];
const FORMATS      = ["PDF","Excel","CSV","PowerPoint"];
const PERIODS      = ["Last 7 days","Last 30 days","Last Quarter","Custom Range"];
const SECTIONS     = ["KPI Summary","Revenue Charts","Top SKUs","Platform Breakdown","Competitor Analysis","AI Insights"];

const HISTORY = [
  { id:"r1", name:"Weekly Performance Report",  format:"PDF",        period:"Jun 16–22, 2026", size:"2.4 MB", generatedAt:"2026-06-23T09:00:00Z" },
  { id:"r2", name:"Monthly Executive Summary",  format:"PowerPoint", period:"May 2026",        size:"5.1 MB", generatedAt:"2026-06-01T08:00:00Z" },
  { id:"r3", name:"SKU Analysis",               format:"Excel",      period:"Q2 2026",         size:"1.8 MB", generatedAt:"2026-05-31T18:00:00Z" },
  { id:"r4", name:"Competitor Intelligence",    format:"PDF",        period:"Jun 2026",        size:"3.2 MB", generatedAt:"2026-06-25T10:00:00Z" },
];
const FMT_ICON: Record<string,string> = { PDF:"📄", Excel:"📊", CSV:"📋", PowerPoint:"📑" };

export default function ReportsPage() {
  const [type, setType]          = useState(REPORT_TYPES[0]);
  const [format, setFormat]      = useState(FORMATS[0]);
  const [period, setPeriod]      = useState(PERIODS[0]);
  const [generating, setGen]     = useState(false);
  const [done, setDone]          = useState(false);
  const [history, setHistory]    = useState(HISTORY);
  const [sections, setSections]  = useState<Record<string,boolean>>(Object.fromEntries(SECTIONS.map(s => [s, true])));

  const generate = async () => {
    setGen(true); setDone(false);
    await new Promise(r => setTimeout(r, 2000));
    setGen(false); setDone(true);
    setHistory(prev => [{
      id: `r${Date.now()}`, name: type, format, period,
      size: `${(1 + Math.random() * 4).toFixed(1)} MB`,
      generatedAt: new Date().toISOString(),
    }, ...prev]);
  };

  return (
    <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-1)", margin: 0 }}>Reports</h1>
        <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>Generate and export analytics reports in multiple formats</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>
        <style>{`@media (max-width: 860px) { .reports-grid { grid-template-columns: 1fr !important; } }`}</style>

        {/* Builder */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>Generate Report</div>

          {[
            { label: "Report Type", value: type,   opts: REPORT_TYPES, onChange: setType   },
            { label: "Time Period", value: period,  opts: PERIODS,      onChange: setPeriod },
          ].map(({ label, value, opts, onChange }) => (
            <div key={label}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>{label}</label>
              <select className="input" value={value} onChange={e => onChange(e.target.value)}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 8 }}>Format</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {FORMATS.map(f => (
                <button key={f} onClick={() => setFormat(f)} style={{
                  padding: "8px 4px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit", outline: "none",
                  background: format === f ? "#7c3aed" : "var(--bg-1)",
                  color: format === f ? "white" : "var(--text-3)",
                  boxShadow: format === f ? "0 0 0 1px #7c3aed" : "0 0 0 1px var(--border)",
                  transition: "all 0.15s", border: "none",
                }}>{f}</button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 8 }}>Sections</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SECTIONS.map(s => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 12, color: "var(--text-2)" }}>
                  <input type="checkbox" checked={sections[s]} onChange={() => setSections(p => ({ ...p, [s]: !p[s] }))}
                    style={{ accentColor: "#7c3aed", width: 14, height: 14 }} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {done ? (
            <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <CheckCircle size={16} color="#10b981" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>Report Ready!</span>
              </div>
              <button className="btn-primary" style={{ width: "100%", gap: 6, fontSize: 13 }}>
                <Download size={14} /> Download {format}
              </button>
            </div>
          ) : (
            <button onClick={generate} className="btn-primary" style={{ width: "100%", fontSize: 13 }} disabled={generating}>
              {generating ? <><div className="anim-spin" style={{ width: 14, height: 14, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%" }} />Generating…</>
                : <><FileBarChart size={14} />Generate Report</>}
            </button>
          )}
        </div>

        {/* Right: history + scheduled */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>Report History</div>
              <span style={{ fontSize: 11, color: "var(--text-3)" }}>{history.length} reports</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {history.map(r => (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "12px 14px",
                  borderRadius: 10, background: "var(--bg-1)", border: "1px solid var(--border)",
                }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{FMT_ICON[r.format] ?? "📄"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", marginBottom: 3 }} className="text-truncate">{r.name}</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 10, color: "var(--text-3)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={10} />{r.period}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={10} />{new Date(r.generatedAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}</span>
                      <span>{r.size}</span>
                    </div>
                  </div>
                  <span className="badge badge-blue">{r.format}</span>
                  <button className="btn-secondary" style={{ fontSize: 11, gap: 5, padding: "0 10px", height: 30 }}>
                    <Download size={12} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled */}
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", marginBottom: 14 }}>Scheduled Reports</div>
            {[
              { name: "Weekly Performance", schedule: "Every Monday 9:00 AM", format: "PDF",        next: "Jul 7, 2026" },
              { name: "Monthly Summary",    schedule: "1st of every month",   format: "PowerPoint", next: "Jul 1, 2026" },
            ].map(s => (
              <div key={s.name} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                borderRadius: 9, background: "var(--bg-1)", marginBottom: 8,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)" }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{s.schedule}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>Next: {s.next}</div>
                  <div style={{ fontSize: 10, color: "var(--text-3)" }}>{s.format}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
