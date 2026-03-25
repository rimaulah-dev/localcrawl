# LocalCrawl 🗺️

**Themed neighborhood walking tours that drive foot traffic to local businesses.**

LocalCrawl turns neighboring businesses into a single walkable route. Each route runs as a mobile-first PWA with GPS guidance, QR check-ins at each stop, a passport stamp mechanic, and a real-time analytics dashboard — giving business districts something they've never had before: proof that a foot traffic campaign actually worked.

> Live demo: [project-2cd5133b.doanything.app](https://project-2cd5133b.doanything.app)

---

## The Pilot Route — "Old Soul, New City" (Petaling Street × Merdeka 118, KL)

A 1.4km, 2–3 hour heritage walk across five stops:

| # | Stop | Category |
|---|------|----------|
| 1 | Yellow Brick Road | Specialty Coffee |
| 2 | Kwai Chai Hong (鬼仔巷) | Street Art & Heritage |
| 3 | REXKL | Books & Culture |
| 4 | Bang Bang Vintage | Vintage Fashion |
| 5 | Merdeka 118 Viewpoint | Architecture & Views |

---

## Features

- **Interactive Route Map** — Leaflet.js map with numbered stop markers, a connecting route line, and a bottom sheet for stop details
- **Stop Detail Pages** — Description, opening hours (live open/closed status in MYT), insider tips, and walking directions via Google Maps
- **QR Check-In System** — Each stop generates a unique QR code. Scanning it timestamps the visit and stores it in localStorage
- **Passport / Stamp Card** — Gamified progress tracker. Collect all 5 stamps to unlock the "Crawl Complete" celebration with confetti
- **Analytics Dashboard** — Bar charts showing visits per stop, popular hours, completion rate, and per-stop drop-off — the pitch tool for tourism boards and BIDs
- **PWA — Installable** — Works offline, installable to home screen on iOS and Android, full `manifest.json` and service worker

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Map | Leaflet.js + react-leaflet |
| Animations | Framer Motion |
| Charts | Recharts |
| QR Codes | qrcode.react |
| Confetti | canvas-confetti |
| Data persistence | localStorage |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/localcrawl.git
cd localcrawl
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
├── app/
│   ├── layout.tsx          # Root layout — fonts, PWA meta, bottom nav
│   ├── page.tsx            # Home — hero, route overview, stamp preview
│   ├── map/
│   │   └── page.tsx        # Interactive Leaflet map + bottom sheet
│   ├── stop/[id]/
│   │   └── page.tsx        # Stop detail — description, hours, check-in, QR
│   ├── checkin/[id]/
│   │   └── page.tsx        # Check-in confirmation + confetti celebration
│   ├── passport/
│   │   └── page.tsx        # Stamp passport + progress + share
│   └── dashboard/
│       └── page.tsx        # Analytics dashboard (business-facing)
├── components/
│   ├── BottomNav.tsx       # Persistent mobile nav (Home / Map / Passport / Analytics)
│   └── MapView.tsx         # Leaflet map component (SSR-disabled)
├── lib/
│   ├── data.ts             # Route and stop data
│   ├── utils.ts            # Check-in logic, directions URL, time helpers
│   └── types.ts            # TypeScript interfaces
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   └── assets/
│       └── hero.png        # Route hero image
└── next.config.ts          # Next.js config (remote image patterns)
```

---

## Adding a New Route

All route data lives in `lib/data.ts`. To add or modify a crawl, edit the `ROUTE` object:

```ts
export const ROUTE: Route = {
  id: "your-route-id",
  name: "Route Name",
  tagline: "Your tagline here",
  duration: "2–3 hours",
  distance: "1.4 km",
  theme: "Coffee & Culture",
  heroImage: "/assets/your-hero.png",
  stops: [
    {
      id: 1,
      name: "Business Name",
      subtitle: "One-line description",
      address: "Full address",
      lat: 3.14327,       // GPS coordinates
      lng: 101.69652,
      hours: "9am – 6pm daily",
      description: "Longer description shown on stop detail page.",
      tip: "Insider tip shown in gold.",
      category: "Coffee",
      stampIcon: "☕",
      color: "#C9A84C"    // Accent color for this stop
    },
    // ... up to N stops
  ]
}
```

---

## Business Model

| Tier | Who pays | Price |
|------|----------|-------|
| Business placement | Local shops, cafes, galleries | RM200–500/month |
| District licensing | BIDs, chambers of commerce | Flat monthly fee |
| Institutional data | Tourism boards, grant committees | Per-season reporting package |

Visitors use the app **free**. The data those routes generate — which stops get the longest dwell time, which themes drive purchases, which businesses perform better next to each other — is the real product.

---

## Deployment

This app deploys to Vercel with zero configuration.

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework auto-detects as Next.js
4. Deploy

No environment variables required.

---

## License

MIT
