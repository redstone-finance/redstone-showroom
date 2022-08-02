/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        redstone: "#fd627a",
      },
      boxShadow: {
        "3xl": "2px 2px 15px 0 rgba(0, 0, 0, 0.1);",
      },
      screens: {
        xl: "1400px",
      },
    },
  },
  plugins: [],
};
