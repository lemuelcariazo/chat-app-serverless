/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },

    extend: {
      animation: {
        "spin-burger": "spin .5s linear forwards",
      },
      height: {
        scrollbarHeight: "40rem",
      },
      scrollbar: {
        thin: { width: "10em" },
      },
    },

    scrollbar: {},

    screens: {
      xxs: "360px",
      xs: "412px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
