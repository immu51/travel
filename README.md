# Tour & Travel Agency Website (React + Tailwind)

A premium, SEO-optimized single-page website for a professional Tour & Travel Agency—built with **React**, **Vite**, and **Tailwind CSS**.

## Features

- **React 18** with Vite for fast dev and builds
- **Tailwind CSS** for styling (glassmorphism, custom colors, responsive)
- **SEO**: Meta title/description, keywords, Open Graph, Local Business schema in `index.html`
- **Sections**: Hero, Why Choose Us, India Tour Packages, About, Gallery, Testimonials, CTA, Contact, Footer
- **Contact**: Contact form submissions can be sent to your email via [Formspree](https://formspree.io); WhatsApp CTA and floating button—no payment/booking
- **Responsive**: Desktop, tablet, mobile

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- **Reviews**: Customer reviews with star rating; optional **Firebase Firestore** for real-time save across devices (otherwise localStorage)

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
7. **Contact form → your email**: So that when someone fills "Contact Us", you get the data at **khanjaved11974@gmail.com** (or change `CONTACT_FORM_RECIPIENT_EMAIL` in `constants.js`):
   - Go to [Formspree](https://formspree.io), sign up, and create a new form.
   - Set the **notification email** to your email (e.g. khanjaved11974@gmail.com).
   - Copy the **Form ID** (e.g. `xyzabcde` from the endpoint `https://formspree.io/f/xyzabcde`).
   - In project root create a `.env` file and add: `VITE_FORMSPREE_FORM_ID=xyzabcde`.
   - Restart `npm run dev`. Submissions will be sent to Formspree and forwarded to your email.
8. **Real-time reviews (optional)**: To save reviews in a database and show them on all devices:
   - Create a [Firebase](https://console.firebase.google.com/) project and enable **Firestore Database**.
   - Create a Web app, copy the config, and add it to a `.env` file (see `.env.example`). Use `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, etc.
   - In Firestore **Rules**, allow read/write for testing: `match /reviews/{doc} { allow read, write: if true; }` (tighten rules for production).
   - Restart `npm run dev`. New reviews will be saved to Firestore and appear in real time for everyone.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
