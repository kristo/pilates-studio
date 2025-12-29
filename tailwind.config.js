const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./layouts/**/*.{html,js}",
    "./content/**/*.{html,md}",
    "./assets/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',       // black from logo
        accent: '#f1adb3',        // pink from logo
        lightPink: '#fce8ea',     // very light pink for backgrounds
        softGray: '#f5f5f5',      // soft gray for contrast
        gray: colors.gray,
      }
    },
  },
  plugins: [],
};
