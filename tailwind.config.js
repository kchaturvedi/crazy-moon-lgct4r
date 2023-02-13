const colors = require("tailwindcss/colors");

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      gold: colors.amber[400],
      green: colors.green[400],
      blue: colors.blue[400],
      red: colors.red[400],
      gray: colors.gray[400],
    },
    extend: {},
  },
  plugins: [],
}
