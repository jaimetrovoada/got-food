/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to right bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), var(--image-url)",
      },
      height: {
        dynamic: ["100vh /* fallback */", "100dvh"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
