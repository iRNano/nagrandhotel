# Nagrand Resort & Spa (monorepo)

Full-stack hotel booking demo: **React (Vite)** frontend and **Express + MongoDB** API.

| Package | Path | Description |
|--------|------|-------------|
| Web | [`apps/web`](apps/web) | Vite + React UI, Stripe publishable key, calls API via `VITE_API_URL` |
| API | [`apps/api`](apps/api) | Express REST API, JWT, Stripe server, MongoDB (Mongoose) |

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas), or use [`apps/api/docker-compose.yml`](apps/api/docker-compose.yml) if you run Mongo via Docker

## Quick start

From the **repository root**:

```bash
npm install
```

### 1. API (`apps/api`)

```bash
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env — set MONGODB_URI, JWT_SECRET, Stripe/email vars as needed
npm run dev:api
```

API listens on **port 4000** by default (`PORT`).

### 2. Web (`apps/web`)

```bash
cp apps/web/.env.example apps/web/.env.development.local
# Ensure VITE_API_URL matches your API (default http://localhost:4000)
npm run dev:web
```

Vite dev server uses **port 3000** (see `apps/web/vite.config.ts`).

### CORS

Set `CORS_ORIGIN` in `apps/api/.env` to match the web origin. For local dev, use:

`CORS_ORIGIN=http://localhost:3000`

Multiple origins: comma-separated list, e.g. `http://localhost:3000,https://your-app.vercel.app`.

## Root scripts

| Script | Action |
|--------|--------|
| `npm run dev:web` | Start Vite dev (with asset copy/watch as defined in workspace) |
| `npm run dev:api` | Start API with nodemon |
| `npm run build:web` | Production build of the web app |
| `npm run preview:web` | Preview production build |
| `npm run start:api` | Run API (Node) |
| `npm run test:api` | Syntax check `app.js` |

## Deployment

- **Web**: deploy `apps/web` as the site root (e.g. Vercel/Netlify **Root Directory** = `apps/web`). Set `VITE_API_URL` to your production API URL.
- **API**: deploy `apps/api` as a Node service (e.g. Railway, Render, Fly). Set `PORT`, `MONGODB_URI`, secrets, and `CORS_ORIGIN` to your **production** frontend URL(s).

## Legacy standalone repos

The API previously lived in a separate repository. It is now **`apps/api`** here. If you still have the old remote, archive it and point contributors to this monorepo.

## License

Private / portfolio unless you add a license file.
