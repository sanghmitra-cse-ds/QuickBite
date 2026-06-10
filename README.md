# QuickBite

Food ordering app with a Spring Boot API and a React frontend.

## Deploy on Render

1. Push this repo to GitHub.
2. Go to [render.com](https://render.com) → **New** → **Blueprint**.
3. Connect your GitHub repo — Render reads `render.yaml` automatically.
4. Click **Apply** and wait for the build (~5–10 min first time; Maven also builds React).
5. Open your live URL, e.g. `https://quickbite-xxxx.onrender.com`.

The app runs as a single web service: Spring Boot serves the API and the React UI from the same URL.

> **Note:** The free tier uses an in-memory H2 database. Sample restaurants reload on each deploy or cold start. Orders are not persisted across restarts.

## Run

**Production (single server):**

```bash
./mvnw spring-boot:run
```

Open http://localhost:8080

**Frontend dev (hot reload):**

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:8080`, so start the Spring Boot app first.

## Build

```bash
cd frontend && npm run build
```

Or build everything with Maven (installs Node, builds React, then packages the app):

```bash
./mvnw package
```
