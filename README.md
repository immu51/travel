# Tour & Travel Agency (TraverraX)

React + Vite frontend and Express + MongoDB backend for a Tour & Travel Agency website.

## Project structure

```
Travel/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
├── backend/           # Express + MongoDB API
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── scripts/
│   ├── package.json
│   └── .env.example
├── ENV-SETUP.md       # Environment variables guide
├── ADMIN.md           # Admin panel usage
└── README.md
```

## Quick start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Backend (API + MongoDB)

```bash
cd backend
npm install
# Create .env with MONGODB_URI, ADMIN_PASSWORD_HASH, JWT_SECRET (see backend/.env.example)
npm run dev
```

Server runs at [http://localhost:5000](http://localhost:5000). Set `VITE_API_URL=http://localhost:5000` in `frontend/.env` so the app uses the API.

## Features

- **Frontend**: React 18, Vite 5, Tailwind CSS, SEO meta & schema, contact/booking/hotel/car forms, reviews, admin panel for content
- **Backend**: Auth (JWT), content overrides, form submissions (contact, booking, hotel, car-rental), reviews — all stored in MongoDB when `VITE_API_URL` is set

## Build & deploy

- **Frontend**: `cd frontend && npm run build` → deploy `frontend/dist/` to Vercel/Netlify/static host
- **Backend**: Deploy `backend/` to Railway/Render/Node host; set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_PASSWORD_HASH`, `FRONTEND_ORIGIN`

See **ENV-SETUP.md** for all environment variables.
