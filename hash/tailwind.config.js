const defaultTheme = require('tailwindcss/defaultTheme')
const { mergeDeepRight } = require('ramda')
const baseConfig = require("tailwind-config-custom/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
const customTwConfig = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Mitr', ...defaultTheme.fontFamily.sans],
        code: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
    }
  },
  content: [
    'components/**/*.{js,ts,jsx,tsx}',
    'icons/**/*.{js,ts,jsx,tsx}',
    'pages/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    styled: true,
    themes: [
      'lemonade',
      'business',
    ],
    darkTheme: 'business',
  },
}

module.exports = mergeDeepRight(baseConfig, customTwConfig)
