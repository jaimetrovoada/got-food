/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 3px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
