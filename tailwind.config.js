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
          DEFAULT: "#332934",
        },
        backgroundDark: {
          DEFAULT: "#1c121f",
        },
        footerLight: {
          DEFAULT: "#96839B"
        }
      },
    },
  },
  variants: {},
  plugins: [],
};
