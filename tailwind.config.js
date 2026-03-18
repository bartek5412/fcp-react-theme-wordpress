/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#143652", // Ciemny niebieski
          dark: "#0a1f2e",
          light: "#1a4a6a",
        },
        secondary: {
          DEFAULT: "#008BC3", // Średni niebieski
          dark: "#006a96",
          light: "#49A0D8", // Jasny niebieski
        },
        accent: {
          orange: "#F2AF46", // Pomarańczowy
          green: "#219138", // Zielony
        },
      },
      fontFamily: {
        sans: [
          "Futura PT",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
