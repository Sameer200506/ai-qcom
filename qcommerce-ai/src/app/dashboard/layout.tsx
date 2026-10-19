"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Sparkles, Upload, Users2, Bell, FileBarChart,
  Settings, LogOut, Zap, ChevronRight, Menu, X,
} from "lucide-react";
import { alerts } from "@/lib/mock-data";

const NAV = [
  { href: "/dashboard",             icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/copilot",     icon: Sparkles,        label: "AI Copilot" },
  { href: "/dashboard/import",      icon: Upload,          label: "Data Import" },
  { href: "/dashboard/competitors", icon: Users2,           label: "Competitors" },
  { href: "/dashboard/alerts",      icon: Bell,            label: "Alerts",  badge: alerts.filter(a => !a.read).length },
  { href: "/dashboard/reports",     icon: FileBarChart,    label: "Reports" },
  { href: "/dashboard/settings",    icon: Settings,        label: "Settings" },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => { localStorage.removeItem("qc-auth"); router.replace("/login"); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo bar */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="anim-pulse-glow" style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Zap size={15} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-1)", lineHeight: 1.1 }}>QCommerce</div>
            <div className="gradient-text" style={{ fontSize: 11, fontWeight: 600 }}>AI Platform</div>
          </div>
          {onClose && (
            <button onClick={onClose} className="btn-ghost" style={{ marginLeft: "auto", padding: "4px" }}>
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Brand pill */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
          borderRadius: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
          cursor: "pointer"
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6, flexShrink: 0,
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "white"
          }}>M</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)" }}>Mamaearth</div>
            <div style={{ fontSize: 10, color: "var(--text-3)" }}>FMCG · 3 Platforms</div>
          </div>
          <ChevronRight size={12} color="var(--text-3)" />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }} className="scroll-thin">
        <div className="section-label" style={{ marginBottom: 6 }}>Navigation</div>
        {NAV.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => onClose?.()} style={{ display: "block", marginBottom: 2 }}>
              <div className={`nav-item ${active ? "active" : ""}`}>
                <Icon size={15} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13 }}>{label}</span>
                {badge ? (
                  <span style={{
                    background: "var(--red)", color: "white", fontSize: 10, fontWeight: 700,
                    padding: "1px 6px", borderRadius: 9999, lineHeight: 1.4
                  }}>{badge}</span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "10px 10px 12px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
          borderRadius: 8, background: "var(--bg-3)", marginBottom: 4
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "white"
          }}>D</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)" }}>Demo User</div>
            <div style={{ fontSize: 10, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              demo@mamaearth.in
            </div>
          </div>
        </div>
        <button onClick={logout} className="nav-item" style={{ color: "var(--text-3)", width: "100%", fontSize: 12 }}>
          <LogOut size={14} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = alerts.filter(a => !a.read).length;

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("qc-auth")) {
      router.replace("/login");
    }
  }, [router]);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const pageLabel = pathname.split("/").filter(Boolean).pop() || "Dashboard";

  return (
    <div className="app-shell">
      {/* Desktop sidebar */}
      <aside className="sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <div className={`sidebar-mobile-overlay ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-mobile-backdrop" onClick={() => setMobileOpen(false)} />
        <div className="sidebar-mobile-panel">
          <SidebarContent onClose={() => setMobileOpen(false)} />
        </div>
      </div>

      {/* Main area */}
      <div className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Mobile hamburger */}
            <button
              className="icon-btn"
              onClick={() => setMobileOpen(true)}
              style={{ display: "none" }}
              id="mobile-menu-btn"
            >
              <Menu size={16} />
            </button>
            <style>{`@media (max-width: 1023px) { #mobile-menu-btn { display: flex !important; } }`}</style>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>Mamaearth</span>
              <ChevronRight size={12} color="var(--text-3)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-1)", textTransform: "capitalize" }}>
                {pageLabel}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Live indicator */}
            <div style={{
              display: "flex", alignItems: "center", gap: 5, padding: "4px 10px",
              borderRadius: 9999, fontSize: 11, fontWeight: 500,
              background: "rgba(16,185,129,0.1)", color: "#10b981",
              border: "1px solid rgba(16,185,129,0.2)"
            }}>
              <div className="anim-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              Live
            </div>

            {/* Alert bell */}
            <Link href="/dashboard/alerts">
              <div style={{ position: "relative", padding: "6px", borderRadius: 8, cursor: "pointer", color: "var(--text-2)" }}>
                <Bell size={16} />
                {unread > 0 && (
                  <span style={{
                    position: "absolute", top: 0, right: 0,
                    width: 16, height: 16, borderRadius: "50%", background: "var(--red)",
                    color: "white", fontSize: 9, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{unread}</span>
                )}
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content scroll-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
