# Nagrand Hotel — Web (Vite + React)

This app is part of the **[nagrandhotel](../../README.md) monorepo** (`apps/web`).

## Scripts (from repo root)

Use workspace scripts from the repository root (recommended):

- `npm run dev:web` — start Vite dev server (port **3000**)
- `npm run build:web` — production build

Or from `apps/web`:

- `npm start` — dev (includes asset copy/watch per `package.json`)
- `npm run build` — production build

## Environment

Copy `.env.example` to `.env.development.local` and set:

- `VITE_API_URL` — API base URL (default `http://localhost:4000`)
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key when testing checkout
