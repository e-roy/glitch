const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        livepeer: {
          DEFAULT: "#943CFF",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
