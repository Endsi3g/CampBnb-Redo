/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#11d452",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
        "surface-dark": "#1A2E22",
        "surface-dark-hover": "#253E2E",
        "secondary-text": "#92c9a4",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
