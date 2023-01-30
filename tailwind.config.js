/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["Merriweather", "serif"],
      sans: ["Popins", "sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1124px",
      xl: "1124px",
      "2xl": "1124px",
    },

    extend: {
      colors: {
        white: "#ffffff",
        clrWhite: "#e6e6e6",
        clrGrey: "#e0e0e0",
        clrDarkGrey: "#b3b3b3",
        clrBlue: "#2c3843",
        clrBlack: "#2a3b55",
        clrHeader: "#607ba9",
        clrBtn: "#59748c",
      },
    },
  },
  plugins: [],
};
