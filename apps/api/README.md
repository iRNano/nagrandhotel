# Nagrand Hotel API

This package lives inside the **[nagrandhotel](../../README.md) monorepo** (`apps/api`).

Express + MongoDB backend for the Nagrand Hotel booking app.

## Setup

1. Copy `.env.example` to `.env` and set:
   - `MONGODB_URI` – e.g. `mongodb://127.0.0.1:27017/booking-system` for local
   - `CORS_ORIGIN` – e.g. `http://localhost:3000` for this project’s Vite dev server (comma-separated for multiple origins)
   - `JWT_SECRET` – strong secret for auth
   - Optional: `STRIPE_SECRET_KEY`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`

2. Start MongoDB (e.g. with Docker):
   ```bash
   docker compose up -d
   ```

3. Seed the database (creates categories and rooms with placeholder images):
   ```bash
   npm run seed
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

For admin room image uploads, ensure the `public/images` folder exists (create it if missing).

API base URL: `http://localhost:4000` (or `PORT` from `.env`).

---

## Migrating local MongoDB to Atlas (deployment)

When you want to deploy and use MongoDB Atlas instead of local MongoDB:

### 1. Export from local (mongodump)

With MongoDB running (e.g. Docker container with port 27017 published):

**Option A – MongoDB Database Tools on host**

Install [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/installation/installation/), then:

```bash
mongodump --uri="mongodb://127.0.0.1:27017/booking-system" --out=./dump
```

**Option B – Run inside Docker container**

```bash
docker exec nagrandhotel-mongodb mongodump --uri="mongodb://127.0.0.1:27017/booking-system" --out=/data/dump
```

Then copy the `dump` folder out of the container. The `dump/` directory is in `.gitignore`; do not commit it.

### 2. Import into Atlas (mongorestore)

1. Create an Atlas cluster and get the connection string.
2. Use Database Tools version close to your Atlas cluster (e.g. 7.x).
3. Restore:

```bash
mongorestore --uri="<ATLAS_URI>" --db=booking-system ./dump/booking-system
```

Replace `<ATLAS_URI>` with your Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/`). Atlas UI **Command Line Tools** often provides a copy-paste template.

### 3. After restore

- Set production `MONGODB_URI` in your deployment environment to the Atlas connection string (include the database name or `?authSource=admin` as required).
- Redeploy the server. No code changes are needed beyond configuration.

### Optional npm script

You can add to `package.json`:

```json
"export-db": "mongodump --uri=\"%MONGODB_URI%\" --out=./dump"
```

On Unix/macOS use `\"$MONGODB_URI\"` instead of `%MONGODB_URI%`. Run `npm run export-db` before restoring to Atlas.
