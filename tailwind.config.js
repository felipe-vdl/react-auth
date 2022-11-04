/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: { ...colors,
      'mesquita': '#342a54',
      'dourado': {
        100: '#B4AA99',
        500: '#bfa15f'
      }
    }
  },
  plugins: [],
}
