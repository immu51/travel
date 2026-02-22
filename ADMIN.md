# Admin panel

- **Login:** `/admin/login`
- **Dashboard:** `/admin` (protected; redirects to login if not authenticated)

## Setup

1. **Generate password hash** (replace `YourPassword` with your actual password):
   ```bash
   node scripts/generate-admin-hash.js "YourPassword"
   ```
   Copy the line it prints (e.g. `VITE_ADMIN_PASSWORD_HASH=abc123...`).

2. **Create or edit `.env`** in the project root and add that line:
   ```env
   VITE_ADMIN_PASSWORD_HASH= paste_the_64_character_hex_here
   ```

3. **Restart the dev server** (stop with Ctrl+C, then run `npm run dev` again).

If you see "Invalid password. Access denied.", the hash is missing in `.env`, wrong, or the server wasn’t restarted after changing `.env`.

## What you can edit (from the dashboard)

- **Hero slider:** Add/remove images, change URLs and alt text.
- **Tour packages:** For each tour card – image URL, alt, title, description.
- **Same day tours:** Same fields per same-day tour.
- **Hotels we offer:** Add/remove items, change label, image URL, alt.

Changes are stored in the browser’s localStorage and apply site-wide until reset or cleared.
