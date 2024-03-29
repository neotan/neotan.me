const defaultTheme = require('tailwindcss/defaultTheme')
const { mergeDeepRight } = require('ramda')
const baseConfig = require("tailwind-config-custom/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
const customTwConfig = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sofia Sans Condensed', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary-black': '#1A232E',
        'secondary-white': '#c7c7c7',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    }
  },
  plugins: [],
  content: [
    'pages/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    'icons/**/*.{js,ts,jsx,tsx}',
    'utils/**/*.{js,ts,jsx,tsx}'
  ],
}

module.exports = mergeDeepRight(baseConfig, customTwConfig)


