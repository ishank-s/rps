/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue)-950+/, 
    },
    {
      pattern: /border-(red|green|blue)-600+/, 
    },
    {
      pattern: /text-(red|green|blue)-600+/, 
    },
  ],
  theme: {
    extend: {
      colors: {
        primary:"#d9bf8f"
      },
    },
  },
  plugins: [],
}

