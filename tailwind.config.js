/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
 theme: { 
  extend: {
    colors: {
      background: "rgb(var(--background))",
      foreground: "rgb(var(--foreground))",
    },
  },
},
