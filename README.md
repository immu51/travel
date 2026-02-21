# Tour & Travel Agency Website (React + Tailwind)

A premium, SEO-optimized single-page website for a professional Tour & Travel Agency—built with **React**, **Vite**, and **Tailwind CSS**.

## Features

- **React 18** with Vite for fast dev and builds
- **Tailwind CSS** for styling (glassmorphism, custom colors, responsive)
- **SEO**: Meta title/description, keywords, Open Graph, Local Business schema in `index.html`
- **Sections**: Hero, Why Choose Us, India Tour Packages, About, Gallery, Testimonials, CTA, Contact, Footer
- **Contact**: Contact form (client-side), WhatsApp CTA and floating button—no payment/booking
- **Responsive**: Desktop, tablet, mobile

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- No backend (forms are client-side only)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host.

## Project Structure

```
Travel/
├── index.html          # Vite entry, SEO meta & schema
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css       # Tailwind + custom styles
│   ├── constants.js    # WhatsApp, city, phone, email (edit before going live)
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── WhyChoose.jsx
│       ├── Packages.jsx
│       ├── About.jsx
│       ├── Gallery.jsx
│       ├── Testimonials.jsx
│       ├── CTA.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx
│       └── WhatsAppFloat.jsx
└── README.md
```

## Before Going Live

1. **City**: Edit `src/constants.js` — set `CITY_NAME` (e.g. `'Mumbai'`). It’s used across the site.
2. **WhatsApp**: In `constants.js`, set `WHATSAPP_NUMBER` (e.g. `'919876543210'`, no `+`).
3. **Phone / Email / Address**: Update `PHONE`, `EMAIL`, `ADDRESS`, `ADDRESS_SHORT` in `constants.js`.
4. **SEO**: In `index.html`, set `canonical` and `og:url` to your domain; update schema `url`, `telephone`, `email`, `address`.
5. **Images**: Replace Unsplash URLs in components with your own (WebP preferred).
6. **Map**: In `Contact.jsx`, replace the iframe `src` with your Google Maps embed URL.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
