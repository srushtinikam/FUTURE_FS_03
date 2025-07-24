// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["'Outfit'", "sans-serif"],
      },
      colors: {
        primary: "#735CDD",
        base: "#F6F5FF",
        cta: "#F2545B",
        text: {
          main: "#333333",
          light: "#f9f9f9",
        },
      },
    },
  },
  plugins: [],
};
