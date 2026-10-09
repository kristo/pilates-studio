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
        // 2026 redesign palette — taken from the studio photo session
        ink: '#1d1916',           // warm near-black
        cream: '#f7f2ec',         // studio walls
        sand: '#ece3d8',          // light taupe
        taupe: '#8a7466',         // logo banner
        wine: '#7d2742',          // mats
        blush: '#f1adb3',         // logo pink
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
