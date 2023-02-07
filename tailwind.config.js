const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gold: colors.amber,
      green: colors.green,
      blue: colors.blue,
      red: colors.red,
      gray: colors.gray,
    },
    extend: {},
  },
  plugins: [],
};
