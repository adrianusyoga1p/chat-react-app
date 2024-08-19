/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#258EA1",
        "soft_primary": "#EBF8FB",
      }
    },
  },
  plugins: [],
};
