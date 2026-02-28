# Backend – TraverraX API

Express + MongoDB. Auth, content overrides, forms (contact, booking, hotel, car), reviews.

## Setup

```bash
npm install
cp .env.example .env   # set MONGODB_URI, ADMIN_PASSWORD_HASH, JWT_SECRET
npm run dev
```

Server: http://localhost:5000. Health: GET /api/health.

## Scripts

- `npm run dev` – Run with watch
- `npm start` – Run once
- `node scripts/generate-admin-hash.js "yourPassword"` – Generate ADMIN_PASSWORD_HASH for .env
- `node scripts/test-api.js` – Test all API endpoints (run with server up; requires MongoDB)

## Env

See root **ENV-SETUP.md**.
