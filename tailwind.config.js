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
        primary: {
          DEFAULT: "#df3154",
        },
        secondary: {
          DEFAULT: "#ffce4e",
        },
        backgroundLight: {
          DEFAULT: "#3d2942",
        },
        backgroundDark: {
          DEFAULT: "#171717",
        },
        footerLight: {
          DEFAULT: "#96839B"
        },
        backgroundBlur: {
          DEFAULT: "#D53D5C",
        },

      },
    },
  },
  variants: {},
  plugins: [],
};
