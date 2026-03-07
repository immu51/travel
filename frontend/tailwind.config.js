/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        primary: '#0D1B2A',
        accent: '#F4A261',
        bg: '#F8F9FA',
        text: '#1B263B',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(13, 27, 42, 0.08)',
        glass: '0 8px 32px rgba(13, 27, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
