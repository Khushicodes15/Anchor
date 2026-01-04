/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brightColor: "#4E8D6A",
        backgroundColor: "#4E8D6A",
        textColor: "#2F3326",
      },
    },
  },
  plugins: [],
};


