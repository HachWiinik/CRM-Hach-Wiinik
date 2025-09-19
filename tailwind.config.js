/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-purple': 'var(--brand-purple)',
        'brand-blue': 'var(--brand-blue)',
        'brand-pink': 'var(--brand-pink)',
        'brand-dark-bg': 'var(--brand-dark-bg)',
        'brand-light-bg': 'var(--brand-light-bg)',
        'brand-dark-card': 'var(--brand-dark-card)',
        'brand-light-card': 'var(--brand-light-card)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}