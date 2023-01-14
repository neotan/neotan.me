/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const { mergeDeepRight } = require('ramda')
const baseConfig = require("tailwind-config-custom/tailwind.config.js");

const LIGHT_THEME_NAME_1 = 'light'
const DARK_THEME_NAME_1 = 'dark'

const LIGHT_THEME_NAME_2 = 'wireframe'
const DARK_THEME_NAME_2 = 'black'

const LIGHT_THEME_NAME_3 = 'corporate'
const DARK_THEME_NAME_3 = 'business'

const LIGHT_THEME_NAME_4 = 'lofi'
const DARK_THEME_NAME_4 = 'dracula'

const LIGHT_THEME_NAME_5 = 'autumn'
const DARK_THEME_NAME_5 = 'forest'

const LIGHT_THEME_NAME_6 = 'pastel'
const DARK_THEME_NAME_6 = 'luxury'

module.exports = mergeDeepRight(
  baseConfig,
  {
    theme: {
      extend: {
        fontFamily: {
          heading: ['var(--ssss-font)', ...defaultTheme.fontFamily.sans],
          code: ['var(--jbmono-font)', ...defaultTheme.fontFamily.serif],
        },
      }
    },
    content: [
      "./app/web3/**/*.{js,ts,jsx,tsx}",
      './components/**/*.{js,ts,jsx,tsx}',
      './icons/**/*.{js,ts,jsx,tsx}',
      '../../packages/ui/dist/**/*.{js,ts,jsx,tsx}',
      'node_modules/daisyui/dist/**/*.js',
      'node_modules/react-daisyui/dist/**/*.js',
    ],
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
      styled: true,
      darkTheme: DARK_THEME_NAME_2,
      themes: [
        LIGHT_THEME_NAME_1,
        DARK_THEME_NAME_1,
        LIGHT_THEME_NAME_2,
        DARK_THEME_NAME_2,
        LIGHT_THEME_NAME_3,
        DARK_THEME_NAME_3,
        LIGHT_THEME_NAME_4,
        DARK_THEME_NAME_4,
        LIGHT_THEME_NAME_5,
        DARK_THEME_NAME_5,
        LIGHT_THEME_NAME_6,
        DARK_THEME_NAME_6,
      ],
    }
  })


