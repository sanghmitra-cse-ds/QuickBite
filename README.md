# QuickBite

Food ordering app with a Spring Boot API and a React frontend.

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
