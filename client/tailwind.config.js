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
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), var(--image-url)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
