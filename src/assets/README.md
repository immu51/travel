# Assets – sab images yahi rakhein

Sirf **`src/assets`** use karein. Koi bhi nayi image/file yahi add karein.

## Structure

- **`gallery/`** – Home page gallery + shared images  
  - `taj-mahal.jpg`, `lal-quila.jpg`, `fatehpur-sikri.jpg`, `sikandra-tomb.jpg`

- **`tours/`** – Tour-specific images (e.g. Day 1 slider & highlights)  
  - `agra-fort-1.png`, `agra-fort-2.png`, `agra-fort-3.png`  
  - `taj-gate.png`, `taj-golden.png`, `Tajmahal_marbel.jpg`

## Code mein use

- Gallery: `import x from '../assets/gallery/...'`
- Tours: `import x from '../assets/tours/...'`  
  (e.g. `src/data/tours.js`)

**Note:** `dist/assets` build time pe khud banta hai – usme kuch mat dalen, sirf `src/assets` edit karein.
