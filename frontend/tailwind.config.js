// @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'ramadan-dark': '#061a12',
        'ramadan-green': '#4ade80',
        'ramadan-border': '#1a4d36',
        'hanafi-yellow': '#eab308',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}