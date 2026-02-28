# Environment setup

## Backend (`backend/.env`)

| Variable | Required | Notes |
|----------|----------|--------|
| `PORT` | No | Default 5000 |
| `MONGODB_URI` | Yes | Your Atlas (or other) connection string |
| `ADMIN_PASSWORD_HASH` | **Yes** for admin login | SHA-256 hex of your admin password. Use the **same value** as `VITE_ADMIN_PASSWORD_HASH` in the frontend so one password works. If empty, admin login returns `not_configured`. |
| `JWT_SECRET` | Yes | Random string for signing tokens |
| `FRONTEND_ORIGIN` | No | e.g. `http://localhost:5173` (no trailing comma) |

**Fix for “admin login not working”:** Set `ADMIN_PASSWORD_HASH` in `backend/.env` to the same value you use for `VITE_ADMIN_PASSWORD_HASH` in the frontend (the SHA-256 hash of your admin password).

## Frontend (`frontend/.env`)

| Variable | Required | Notes |
|----------|----------|--------|
| `VITE_API_URL` | To use backend | e.g. `http://localhost:5000`. When set, forms, content and reviews use the API (MongoDB). |
| `VITE_FORMSPREE_FORM_ID` | If no API | Used only when `VITE_API_URL` is not set |
| `VITE_ADMIN_PASSWORD_HASH` | If no API | For local-only admin auth when `VITE_API_URL` is not set |
| Firebase `VITE_*` | Optional | For Firebase reviews when API is not set |
| `VITE_FIREBASE_MEASUREMENT_ID` | Optional | Analytics |

**To use MongoDB + backend:** Set `VITE_API_URL=http://localhost:5000` in `frontend/.env`, then run the backend from `backend/` with `MONGODB_URI` and `ADMIN_PASSWORD_HASH` set.
