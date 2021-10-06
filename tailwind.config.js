const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist: ['grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8', 'grid-cols-9'],
  },
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.warmGray,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
