// ─── QCommerce AI — Mock Data ───────────────────────────────────────────────
// ponytail: all data is static demo data; replace with API calls when backend is ready

export const BRAND = "Mamaearth";

// ─── KPIs ────────────────────────────────────────────────────────────────────
export const kpis = {
  revenue: { value: 4_82_35_000, change: 18.4, unit: "₹" },
  orders: { value: 1_24_308, change: 12.1, unit: "" },
  unitsSold: { value: 3_18_492, change: 9.7, unit: "" },
  gmv: { value: 5_96_40_000, change: 15.2, unit: "₹" },
  marketShare: { value: 14.6, change: 2.3, unit: "%" },
  avgSellingPrice: { value: 151.4, change: 7.8, unit: "₹" },
  margin: { value: 28.4, change: -1.2, unit: "%" },
  stockouts: { value: 23, change: -34.2, unit: "" },
};

// ─── Platform Breakdown ──────────────────────────────────────────────────────
export const platformBreakdown = [
  { platform: "Blinkit", revenue: 2_20_00_000, orders: 56_200, share: 45.6, color: "#F7CD2E" },
  { platform: "Zepto", revenue: 1_54_00_000, orders: 39_100, share: 31.9, color: "#9B5CF6" },
  { platform: "Instamart", revenue: 1_08_35_000, orders: 29_008, share: 22.5, color: "#F97316" },
];

// ─── Revenue Trend (90 days) ─────────────────────────────────────────────────
function generateRevenueTrend() {
  const data = [];
  const base = new Date("2026-04-01");
  let blinkit = 680_000;
  let zepto = 450_000;
  let instamart = 320_000;

  for (let i = 0; i < 90; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const spike = isWeekend ? 1.25 : 1.0;
    const noise = () => 0.88 + Math.random() * 0.28;

    blinkit = Math.round(blinkit * (1 + 0.004 + (Math.random() - 0.5) * 0.05) * spike * noise());
    zepto = Math.round(zepto * (1 + 0.003 + (Math.random() - 0.5) * 0.06) * spike * noise());
    instamart = Math.round(instamart * (1 + 0.002 + (Math.random() - 0.5) * 0.07) * spike * noise());

    data.push({
      date: d.toISOString().slice(0, 10),
      blinkit: Math.max(blinkit, 400_000),
      zepto: Math.max(zepto, 280_000),
      instamart: Math.max(instamart, 180_000),
      total: blinkit + zepto + instamart,
    });
  }
  return data;
}
export const revenueTrend = generateRevenueTrend();

// ─── Weekly Aggregated ───────────────────────────────────────────────────────
export const weeklyTrend = (() => {
  const weeks: { week: string; blinkit: number; zepto: number; instamart: number; total: number }[] = [];
  for (let w = 0; w < 13; w++) {
    const slice = revenueTrend.slice(w * 7, (w + 1) * 7);
    if (!slice.length) break;
    weeks.push({
      week: `W${w + 1}`,
      blinkit: slice.reduce((s, d) => s + d.blinkit, 0),
      zepto: slice.reduce((s, d) => s + d.zepto, 0),
      instamart: slice.reduce((s, d) => s + d.instamart, 0),
      total: slice.reduce((s, d) => s + d.total, 0),
    });
  }
  return weeks;
})();

// ─── Monthly ─────────────────────────────────────────────────────────────────
export const monthlyTrend = [
  { month: "Jan", blinkit: 58_00_000, zepto: 41_00_000, instamart: 28_00_000, total: 1_27_00_000 },
  { month: "Feb", blinkit: 62_00_000, zepto: 44_00_000, instamart: 31_00_000, total: 1_37_00_000 },
  { month: "Mar", blinkit: 71_00_000, zepto: 49_00_000, instamart: 35_00_000, total: 1_55_00_000 },
  { month: "Apr", blinkit: 79_00_000, zepto: 53_00_000, instamart: 38_00_000, total: 1_70_00_000 },
  { month: "May", blinkit: 88_00_000, zepto: 60_00_000, instamart: 43_00_000, total: 1_91_00_000 },
  { month: "Jun", blinkit: 96_00_000, zepto: 66_00_000, instamart: 46_00_000, total: 2_08_00_000 },
];

// ─── Top SKUs ─────────────────────────────────────────────────────────────────
export const topSkus = [
  { rank: 1, sku: "MH-FC-001", name: "Vitamin C Face Wash 100ml", category: "Face Care", revenue: 42_80_000, units: 28_400, growth: 34.2, platform: "Blinkit", stockLevel: 82 },
  { rank: 2, sku: "MH-HC-012", name: "Onion Hair Oil 250ml", category: "Hair Care", revenue: 38_50_000, units: 22_650, growth: 28.7, platform: "Zepto", stockLevel: 67 },
  { rank: 3, sku: "MH-BC-034", name: "Ubtan Face Pack 100g", category: "Face Care", revenue: 31_20_000, units: 18_200, growth: 19.4, platform: "Blinkit", stockLevel: 91 },
  { rank: 4, sku: "MH-HC-019", name: "Argan Shampoo 200ml", category: "Hair Care", revenue: 27_90_000, units: 16_400, growth: 22.1, platform: "Instamart", stockLevel: 45 },
  { rank: 5, sku: "MH-SC-007", name: "Aloe Vera Gel 200ml", category: "Skin Care", revenue: 24_60_000, units: 19_680, growth: 15.8, platform: "Zepto", stockLevel: 73 },
  { rank: 6, sku: "MH-FC-088", name: "Tea Tree Face Scrub 75g", category: "Face Care", revenue: 21_30_000, units: 12_540, growth: -3.2, platform: "Blinkit", stockLevel: 18 },
  { rank: 7, sku: "MH-HC-055", name: "Bhringraj Hair Mask 200g", category: "Hair Care", revenue: 18_70_000, units: 9_800, growth: 41.3, platform: "Blinkit", stockLevel: 88 },
  { rank: 8, sku: "MH-SC-022", name: "Niacinamide Serum 30ml", category: "Skin Care", revenue: 17_20_000, units: 6_220, growth: 67.8, platform: "Zepto", stockLevel: 52 },
  { rank: 9, sku: "MH-BC-091", name: "Cocoa Butter Lip Balm", category: "Body Care", revenue: 14_80_000, units: 24_600, growth: 11.2, platform: "Instamart", stockLevel: 96 },
  { rank: 10, sku: "MH-HC-033", name: "Keratin Conditioner 200ml", category: "Hair Care", revenue: 13_40_000, units: 7_900, growth: 8.4, platform: "Blinkit", stockLevel: 34 },
];

// ─── Category Mix ─────────────────────────────────────────────────────────────
export const categoryMix = [
  { name: "Hair Care", value: 38, color: "#8B5CF6" },
  { name: "Face Care", value: 31, color: "#EC4899" },
  { name: "Skin Care", value: 18, color: "#06B6D4" },
  { name: "Body Care", value: 9, color: "#F97316" },
  { name: "Others", value: 4, color: "#6B7280" },
];

// ─── City Performance ─────────────────────────────────────────────────────────
export const cityPerformance = [
  { city: "Mumbai", revenue: 1_18_40_000, growth: 22.1, orders: 30_200 },
  { city: "Delhi NCR", revenue: 98_70_000, growth: 18.4, orders: 25_100 },
  { city: "Bengaluru", revenue: 84_20_000, growth: 31.2, orders: 21_400 },
  { city: "Hyderabad", revenue: 52_30_000, growth: 14.7, orders: 13_300 },
  { city: "Chennai", revenue: 44_80_000, growth: 9.3, orders: 11_400 },
  { city: "Pune", revenue: 38_10_000, growth: 27.6, orders: 9_700 },
  { city: "Kolkata", revenue: 28_40_000, growth: 6.2, orders: 7_200 },
  { city: "Ahmedabad", revenue: 17_35_000, growth: 42.8, orders: 5_000 },
];

// ─── Competitor Intelligence ──────────────────────────────────────────────────
export const competitors = [
  {
    id: "c1",
    name: "Plum Goodness",
    category: "Face Care",
    products: [
      { name: "Vitamin C Face Wash", ourPrice: 249, theirPrice: 229, ourDiscount: 10, theirDiscount: 18, ourStock: true, theirStock: true },
      { name: "Aloe Vera Gel", ourPrice: 199, theirPrice: 215, ourDiscount: 5, theirDiscount: 8, ourStock: true, theirStock: false },
      { name: "Niacinamide Serum", ourPrice: 599, theirPrice: 649, ourDiscount: 12, theirDiscount: 5, ourStock: true, theirStock: true },
    ],
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10),
      price: 229 + Math.round((Math.random() - 0.5) * 20),
    })),
  },
  {
    id: "c2",
    name: "Wow Skin Science",
    category: "Hair Care",
    products: [
      { name: "Onion Hair Oil", ourPrice: 349, theirPrice: 299, ourDiscount: 15, theirDiscount: 25, ourStock: true, theirStock: true },
      { name: "Argan Shampoo", ourPrice: 399, theirPrice: 419, ourDiscount: 10, theirDiscount: 5, ourStock: true, theirStock: true },
      { name: "Bhringraj Hair Mask", ourPrice: 349, theirPrice: 379, ourDiscount: 8, theirDiscount: 12, ourStock: false, theirStock: true },
    ],
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10),
      price: 299 + Math.round((Math.random() - 0.5) * 30),
    })),
  },
  {
    id: "c3",
    name: "Minimalist",
    category: "Skin Care",
    products: [
      { name: "Niacinamide 10%", ourPrice: 599, theirPrice: 399, ourDiscount: 12, theirDiscount: 0, ourStock: true, theirStock: true },
      { name: "Vitamin C Serum", ourPrice: 699, theirPrice: 459, ourDiscount: 10, theirDiscount: 5, ourStock: true, theirStock: true },
      { name: "AHA BHA Toner", ourPrice: 449, theirPrice: 349, ourDiscount: 8, theirDiscount: 10, ourStock: true, theirStock: false },
    ],
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10),
      price: 399 + Math.round((Math.random() - 0.5) * 40),
    })),
  },
];

// ─── Alerts ──────────────────────────────────────────────────────────────────
export const alerts = [
  { id: "a1", type: "stockout", severity: "critical", title: "Stockout Risk: Tea Tree Face Scrub", message: "Tea Tree Face Scrub 75g on Blinkit has only 18% stock remaining. Estimated stockout in 2 days at current velocity.", sku: "MH-FC-088", platform: "Blinkit", createdAt: "2026-06-29T06:30:00Z", read: false },
  { id: "a2", type: "competitor", severity: "warning", title: "Wow Skin Science dropped Onion Hair Oil by 25%", message: "Competitor WOW Skin Science has reduced Onion Hair Oil price by ₹75 (25%) on Zepto. Your price is now ₹50 higher.", sku: "MH-HC-012", platform: "Zepto", createdAt: "2026-06-29T04:15:00Z", read: false },
  { id: "a3", type: "revenue", severity: "info", title: "Revenue Spike: Bengaluru +31%", message: "Bengaluru GMV grew 31.2% WoW driven by Niacinamide Serum and Vitamin C Face Wash. Consider increasing inventory allocation.", sku: null, platform: "All", createdAt: "2026-06-28T22:00:00Z", read: true },
  { id: "a4", type: "stockout", severity: "warning", title: "Low Stock: Keratin Conditioner", message: "Keratin Conditioner 200ml on Blinkit at 34% stock level. Reorder recommended within 3 days.", sku: "MH-HC-033", platform: "Blinkit", createdAt: "2026-06-28T18:00:00Z", read: true },
  { id: "a5", type: "promotion", severity: "info", title: "Promotion Opportunity: Weekend Surge", message: "Historical data shows 25% higher demand on weekends for Hair Care. Consider running a flash sale this Saturday.", sku: null, platform: "All", createdAt: "2026-06-28T12:00:00Z", read: true },
  { id: "a6", type: "competitor", severity: "warning", title: "Minimalist gaining market share in Skin Care", message: "Minimalist's Niacinamide Serum gained 3.2% market share this week at a ₹200 lower price point. Review pricing strategy.", sku: "MH-SC-022", platform: "All", createdAt: "2026-06-27T09:00:00Z", read: true },
  { id: "a7", type: "revenue", severity: "critical", title: "Sales Drop: Tea Tree Face Scrub -3.2%", message: "Tea Tree Face Scrub showed negative growth this month. Possibly due to stockout periods and competitor pricing.", sku: "MH-FC-088", platform: "Blinkit", createdAt: "2026-06-26T14:00:00Z", read: true },
];

// ─── Import History ───────────────────────────────────────────────────────────
export const importHistory = [
  { id: "i1", filename: "blinkit_sales_jun_2026.csv", type: "Sales Report", platform: "Blinkit", rows: 4820, status: "success", uploadedAt: "2026-06-28T10:30:00Z" },
  { id: "i2", filename: "zepto_inventory_report.xlsx", type: "Inventory Report", platform: "Zepto", rows: 1240, status: "success", uploadedAt: "2026-06-28T10:15:00Z" },
  { id: "i3", filename: "instamart_settlement_may.xlsx", type: "Settlement Report", platform: "Instamart", rows: 892, status: "success", uploadedAt: "2026-06-25T14:00:00Z" },
  { id: "i4", filename: "blinkit_ads_jun.csv", type: "Advertising Report", platform: "Blinkit", rows: 220, status: "warning", uploadedAt: "2026-06-24T09:00:00Z" },
  { id: "i5", filename: "product_master_v3.xlsx", type: "Product Master", platform: "All", rows: 156, status: "success", uploadedAt: "2026-06-20T11:00:00Z" },
];

// ─── Forecast Data ─────────────────────────────────────────────────────────────
export const forecastData = (() => {
  const data = [];
  const base = new Date("2026-07-01");
  let val = 2_20_00_000;
  for (let i = 0; i < 30; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    val = Math.round(val * (1 + 0.005 + (Math.random() - 0.5) * 0.04));
    data.push({
      date: d.toISOString().slice(0, 10),
      forecast: val,
      lower: Math.round(val * 0.88),
      upper: Math.round(val * 1.12),
    });
  }
  return data;
})();

// ─── AI Copilot Responses ─────────────────────────────────────────────────────
export const copilotResponses: Record<string, string> = {
  default: `I'm your **QCommerce AI Copilot**. I can help you analyze sales, inventory, competitor pricing, and more across Blinkit, Zepto, and Swiggy Instamart.\n\nTry asking me something like:\n- *"Why did sales decrease last week?"*\n- *"Which SKU should I restock urgently?"*\n- *"How are we performing vs competitors?"*`,

  sales: `## Sales Performance Summary — June 2026\n\nYour total revenue this month is **₹4.82 Cr** (+18.4% MoM). Here are the key highlights:\n\n| Platform | Revenue | Growth |\n|---|---|---|\n| Blinkit | ₹2.20 Cr | +21.3% |\n| Zepto | ₹1.54 Cr | +17.8% |\n| Instamart | ₹1.08 Cr | +12.1% |\n\n**Top performing city**: Bengaluru with **+31.2% WoW growth**, driven by Niacinamide Serum and Vitamin C Face Wash.\n\n**Action**: Increase inventory allocation to Bengaluru by 20% to capitalize on the growth trend.`,

  decrease: `## Root Cause Analysis — Sales Decrease\n\nI identified **3 factors** contributing to the sales dip last Tuesday (June 24):\n\n1. **Stockout on Blinkit** — Tea Tree Face Scrub ran out of stock for ~18 hours, causing an estimated ₹1.8L revenue loss.\n2. **Competitor pricing** — WOW Skin Science dropped Onion Hair Oil by 25%, diverting ~800 orders.\n3. **Macro trend** — Industry-wide slowdown on mid-week days (Tue–Wed typically 12% lower than Mon).\n\n**Recommended actions:**\n- Restock Tea Tree Face Scrub immediately (current: 18% stock)\n- Review Onion Hair Oil pricing strategy\n- Pre-load inventory on Mondays for weekend demand`,

  restock: `## Urgent Restock Recommendations\n\nBased on current stock levels and sales velocity, here are your **top 3 urgent restocks**:\n\n### 🔴 Critical (Restock within 24 hours)\n1. **Tea Tree Face Scrub 75g** (MH-FC-088) — Blinkit\n   - Current stock: 18% | Velocity: 420 units/day | Estimated stockout: **Tomorrow**\n\n### 🟡 Warning (Restock within 3 days)\n2. **Keratin Conditioner 200ml** (MH-HC-033) — Blinkit\n   - Current stock: 34% | Estimated stockout: **4 days**\n3. **Argan Shampoo 200ml** (MH-HC-019) — Instamart\n   - Current stock: 45% | Estimated stockout: **6 days**\n\n**Total restock value**: ~₹12.4L across 3 SKUs`,

  competitor: `## Competitor Intelligence Report\n\n### 🏆 Market Share Overview\nYou hold **14.6% market share** in your categories, up 2.3pp this month.\n\n### ⚠️ Pricing Alerts\n- **WOW Skin Science** is now **₹50 cheaper** than you on Onion Hair Oil (Zepto). Their sales velocity increased 34% after the price drop.\n- **Minimalist** Niacinamide at ₹399 vs your ₹599 — they're growing at 67% in this segment.\n\n### ✅ Where You're Winning\n- Vitamin C Face Wash: You're 8% cheaper than Plum on Blinkit, with higher ratings\n- Aloe Vera Gel: Plum is out of stock on Zepto — opportunity to push promotions\n\n**Recommendation**: Run a limited-time 15% discount on Onion Hair Oil to recapture lost share.`,

  price: `## Price Optimization Analysis\n\nBased on demand elasticity modeling across 90 days of data:\n\n| SKU | Current Price | Recommended | Expected Impact |\n|---|---|---|---|\n| Onion Hair Oil 250ml | ₹349 | ₹299 | +28% volume, +8% revenue |\n| Niacinamide Serum 30ml | ₹599 | ₹549 | +15% volume, +5% revenue |\n| Tea Tree Face Scrub | ₹249 | ₹249 | No change (already optimal) |\n\n**Overall**: Adjusting these 2 SKUs could add **~₹8.2L/month** in incremental revenue.\n\n*Note: Elasticity modeled using 90-day price-volume data. Confidence: 78%*`,

  city: `## City-Wise Growth Analysis\n\n### 🚀 Fastest Growing\n1. **Ahmedabad** +42.8% — Emerging market, low competition, recommend expansion\n2. **Bengaluru** +31.2% — Tech-savvy demographic, high Niacinamide/Serum demand\n3. **Pune** +27.6% — Strong Hair Care growth\n\n### 📍 Largest Markets\n1. **Mumbai** — ₹1.18 Cr/month, mature market\n2. **Delhi NCR** — ₹98.7L/month, +18.4% growth\n\n### 💡 Recommendation\nAhmedabad is your highest-growth city with relatively low inventory. Consider **increasing dark store allocation by 30%** in Ahmedabad to avoid stockouts during the growth phase.`,

  summary: `## Executive Summary — June 2026\n\n### Performance Overview\n**Revenue**: ₹4.82 Cr (+18.4% MoM) | **Orders**: 1.24L (+12.1%) | **Market Share**: 14.6% (+2.3pp)\n\n### Key Wins ✅\n- Niacinamide Serum growing at **+67.8%** — fastest growing SKU\n- Bengaluru market expanding rapidly at **+31.2% WoW**\n- Vitamin C Face Wash is #1 revenue SKU at ₹42.8L\n\n### Key Risks ⚠️\n- **2 SKUs at critical stock levels** — potential ₹4L revenue at risk\n- WOW Skin Science price aggression in Hair Care segment\n- Minimalist pricing undercuts us by ₹200 in Niacinamide\n\n### Recommended Actions 🎯\n1. Emergency restock: Tea Tree Face Scrub + Keratin Conditioner\n2. Review Hair Care pricing strategy vs WOW\n3. Increase Bengaluru & Ahmedabad inventory allocation\n4. Launch weekend flash sale in Hair Care category`,

  forecast: `## 30-Day Revenue Forecast\n\nBased on current growth trajectory and seasonal patterns:\n\n| Period | Forecast | Range |\n|---|---|---|\n| July Week 1 | ₹1.24 Cr | ₹1.09–1.39 Cr |\n| July Week 2 | ₹1.31 Cr | ₹1.15–1.47 Cr |\n| July Week 3 | ₹1.38 Cr | ₹1.21–1.55 Cr |\n| July Week 4 | ₹1.46 Cr | ₹1.28–1.64 Cr |\n\n**Projected July Total**: **₹5.39 Cr** (+11.8% vs June)\n\n### Key Assumptions\n- No major competitor pricing changes\n- Normal monsoon weather (impacts FMCG demand)\n- Current inventory levels maintained\n\n*Forecast model: Prophet + trend decomposition | Confidence: 82%*`,
};

export function getCopilotResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("decrease") || q.includes("drop") || q.includes("why") || q.includes("fell")) return copilotResponses.decrease;
  if (q.includes("restock") || q.includes("inventory") || q.includes("stock")) return copilotResponses.restock;
  if (q.includes("competitor") || q.includes("compare") || q.includes("vs") || q.includes("competition")) return copilotResponses.competitor;
  if (q.includes("price") || q.includes("pricing") || q.includes("discount")) return copilotResponses.price;
  if (q.includes("city") || q.includes("region") || q.includes("location") || q.includes("growth")) return copilotResponses.city;
  if (q.includes("summary") || q.includes("executive") || q.includes("overview") || q.includes("report")) return copilotResponses.summary;
  if (q.includes("forecast") || q.includes("predict") || q.includes("next") || q.includes("future")) return copilotResponses.forecast;
  if (q.includes("sale") || q.includes("revenue") || q.includes("performance")) return copilotResponses.sales;
  return `Based on your data for ${BRAND}:\n\nI found relevant insights related to your query. Your current revenue is **₹4.82 Cr** (+18.4% MoM) with **14.6% market share**.\n\nFor more specific analysis, try asking:\n- *"Summarize this month's performance"*\n- *"Which SKU should I restock?"*\n- *"How are we performing vs competitors?"*`;
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────
export function formatCurrency(val: number): string {
  if (val >= 1_00_00_000) return `₹${(val / 1_00_00_000).toFixed(2)} Cr`;
  if (val >= 1_00_000) return `₹${(val / 1_00_000).toFixed(1)} L`;
  if (val >= 1_000) return `₹${(val / 1_000).toFixed(1)}K`;
  return `₹${val}`;
}

export function formatNumber(val: number): string {
  if (val >= 1_00_000) return `${(val / 1_00_000).toFixed(1)}L`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
  return `${val}`;
}
