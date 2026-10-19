"use client";
import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, CloudUpload, X } from "lucide-react";
import { importHistory } from "@/lib/mock-data";

const FILE_TYPES = ["Sales Report","Inventory Report","Settlement Report","Advertising Report","Product Master","Returns Report","Purchase Orders"];
const PLATFORMS  = ["Blinkit","Zepto","Instamart","All"];
const STEPS      = ["Parsing columns…","Validating data…","Detecting duplicates…","Mapping to schema…"];

type ImportStatus = "idle" | "processing" | "done";
type MockImport   = typeof importHistory[number];

export default function ImportPage() {
  const [dragging, setDragging]   = useState(false);
  const [file, setFile]           = useState<File | null>(null);
  const [fileType, setFileType]   = useState(FILE_TYPES[0]);
  const [platform, setPlatform]   = useState(PLATFORMS[0]);
  const [status, setStatus]       = useState<ImportStatus>("idle");
  const [progress, setProgress]   = useState(0);
  const [history, setHistory]     = useState<MockImport[]>(importHistory);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const process = async () => {
    if (!file) return;
    setStatus("processing"); setProgress(0);
    for (let p = 0; p <= 100; p += 10) {
      await new Promise(r => setTimeout(r, 130));
      setProgress(Math.min(p, 100));
    }
    setHistory(prev => [{
      id: `i${Date.now()}`, filename: file.name, type: fileType, platform,
      rows: Math.floor(300 + Math.random() * 4700), status: "success",
      uploadedAt: new Date().toISOString(),
    }, ...prev]);
    setStatus("done");
  };

  const reset = () => { setFile(null); setStatus("idle"); setProgress(0); };

  const S: Record<string, string> = { success: "#10b981", warning: "#f59e0b", error: "#ef4444" };

  return (
    <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-1)", margin: 0 }}>Data Import Hub</h1>
        <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>Upload reports from Blinkit, Zepto, and Swiggy Instamart</p>
      </div>

      {/* Top section: upload + info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>
        <style>{`@media (max-width: 900px) { .import-grid { grid-template-columns: 1fr !important; } }`}</style>
        <div className="import-grid" style={{ display: "contents" }}>

        {/* Upload area */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Drop zone */}
          <div
            style={{
              border: `2px dashed ${dragging ? "#7c3aed" : file ? "#10b981" : "var(--border-2)"}`,
              borderRadius: 14, minHeight: 190, cursor: file ? "default" : "pointer",
              background: dragging ? "rgba(124,58,237,0.04)" : "var(--bg-2)",
              transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => !file && document.getElementById("file-inp")?.click()}>
            <input id="file-inp" type="file" accept=".csv,.xlsx,.xls" style={{ display: "none" }}
              onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />

            {file ? (
              <div style={{ textAlign: "center", padding: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, margin: "0 auto 12px",
                  background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <FileText size={22} color="#10b981" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 4 }}>{file.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 12 }}>
                  {(file.size / 1024).toFixed(1)} KB · {file.name.split(".").pop()?.toUpperCase()}
                </div>
                <button onClick={e => { e.stopPropagation(); reset(); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", fontSize: 12, display: "flex", alignItems: "center", gap: 4, margin: "0 auto", fontFamily: "inherit" }}>
                  <X size={12} /> Remove
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 28 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16, margin: "0 auto 14px",
                  background: "rgba(124,58,237,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CloudUpload size={26} color="#9d5cf6" />
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 5 }}>Drop your file here</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 12 }}>or click to browse</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  {[".csv", ".xlsx", ".xls"].map(e => <span key={e} className="badge badge-purple">{e}</span>)}
                </div>
              </div>
            )}
          </div>

          {/* Selectors */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Report Type</label>
              <select className="input" value={fileType} onChange={e => setFileType(e.target.value)}>
                {FILE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Platform</label>
              <select className="input" value={platform} onChange={e => setPlatform(e.target.value)}>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Progress */}
          {status === "processing" && (
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div className="anim-spin" style={{ width: 14, height: 14, border: "2px solid #7c3aed", borderTopColor: "transparent", borderRadius: "50%" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)" }}>Processing…</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-3)" }}>{progress}%</span>
              </div>
              <div className="progress-track" style={{ marginBottom: 14 }}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {STEPS.map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: progress > i * 25 ? "var(--text-1)" : "var(--text-3)" }}>
                    {progress > (i + 1) * 25
                      ? <CheckCircle size={13} color="#10b981" />
                      : progress > i * 25
                      ? <div className="anim-spin" style={{ width: 12, height: 12, border: "2px solid #7c3aed", borderTopColor: "transparent", borderRadius: "50%" }} />
                      : <div style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid var(--border-2)" }} />
                    }
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {status === "done" && (
            <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <CheckCircle size={16} color="#10b981" />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)" }}>Import successful!</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 12 }}>
                Data processed and added to your warehouse. Dashboard will update shortly.
              </p>
              <button onClick={reset} className="btn-secondary" style={{ fontSize: 12 }}>Import another file</button>
            </div>
          )}

          {status === "idle" && (
            <button onClick={process} disabled={!file} className="btn-primary" style={{ fontSize: 13, height: 40 }}>
              <Upload size={15} /> Import File
            </button>
          )}
        </div>

        {/* Right info column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", marginBottom: 14 }}>Supported Platforms</div>
            {[
              { n: "Blinkit", c: "#f7cd2e" }, { n: "Zepto", c: "#9b5cf6" }, { n: "Instamart", c: "#f97316" }
            ].map(({ n, c }) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c}18`, border: `1px solid ${c}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: c }}>
                  {n[0]}
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-1)", flex: 1 }}>{n}</span>
                <span className="badge badge-green">Ready</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>Report Types</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FILE_TYPES.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle size={12} color="#10b981" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "var(--text-2)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Import History */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 16 }}>Import History</div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>File</th><th>Type</th><th>Platform</th>
                <th style={{ textAlign: "right" }}>Rows</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "right" }}>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {history.map(imp => (
                <tr key={imp.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText size={13} color="var(--text-3)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{imp.filename}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12 }}>{imp.type}</td>
                  <td>
                    <span className={`badge ${imp.platform === "Blinkit" ? "badge-yellow" : imp.platform === "Zepto" ? "badge-purple" : imp.platform === "Instamart" ? "badge-orange" : "badge-blue"}`}>
                      {imp.platform}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontSize: 12, fontWeight: 700, color: "var(--text-1)" }}>{imp.rows.toLocaleString()}</td>
                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                      {imp.status === "success" ? <CheckCircle size={13} color="#10b981" /> : <AlertCircle size={13} color="#f59e0b" />}
                      <span style={{ fontSize: 11, color: S[imp.status] ?? "var(--text-3)" }}>{imp.status}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "right", fontSize: 11, color: "var(--text-3)" }}>
                    {new Date(imp.uploadedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
