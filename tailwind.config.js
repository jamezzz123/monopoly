// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("./node_modules/tailwindcss/colors");

module.exports = {
  // purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  fontFamily: {
    sans: ["Oswald", "san-serif"],
    heading: ["Roboto", "san-serif"],
  },
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        lime: colors.lime,
        orange: colors.orange,
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
