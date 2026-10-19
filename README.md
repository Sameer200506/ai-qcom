# ai qcom (AI quick-commerce analytics dashboard)

`qcommerce-ai` is a Next.js dashboard concept for quick-commerce (q-commerce)
brands: sales overview, competitor tracking, stock/price alerts, an AI copilot
and reporting, all driven by mock data so the UI can be explored without a
backend.

## What it does

| Area | Route |
| --- | --- |
| Sign-in screen | `/login` |
| KPI overview | `/dashboard` |
| Alerts | `/dashboard/alerts` |
| Competitor tracking | `/dashboard/competitors` |
| AI copilot chat | `/dashboard/copilot` |
| Data import | `/dashboard/import` |
| Reports | `/dashboard/reports` |
| Settings | `/dashboard/settings` |

Charts are rendered with Recharts, markdown answers with `react-markdown` +
`remark-gfm`.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Recharts, lucide-react, date-fns

## Run locally

```bash
cd qcommerce-ai
npm install
npm run dev
```

Open <http://localhost:3000> (redirects to `/login`).

```bash
npm run build
npm start
npm run lint
```

## Notes

- `src/lib/mock-data.ts` contains the seeded dataset used by every screen.
- Wire the tables/charts to a real API or database before shipping.
