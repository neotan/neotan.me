const { mergeDeepRight } = require('ramda')
const baseConfig = require("tailwind-config-custom/tailwind.config");

/** @type {import('tailwindcss').Config} */
const customTwConfig = {
  content: [
    'src/**/*.{html,js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: [],
    darkTheme: '',
    prefix: '',
  },
}

module.exports = mergeDeepRight(baseConfig, customTwConfig)


