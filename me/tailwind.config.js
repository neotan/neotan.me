const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
const defaultTheme = require('tailwindcss/defaultTheme')
const { mergeDeepRight } = require('ramda')
const baseConfig = require("tailwind-config-custom/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
const customTwConfig = {
  theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite'
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(-30px, 50px) scale(1.4)'
          },
          '66%': {
            transform: 'translate(-20px 20px) scale(1.7)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
  content: [
    'components/**/*.{js,ts,jsx,tsx}',
    'icons/**/*.{js,ts,jsx,tsx}',
    'pages/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/dist/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js'
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=wireframe]"],
          "font-family": 'Montserrat, sans-serif',
          "primary": "#303040",
          "secondary": "#97979f",
          "base-100": "#ffffff",
          "accent": "#6767ff",
          "error": "#ff522f",
          "info": "#20b8ff",
          // "neutral": "#97979f",
          // "success": "#0D6839",
          // "warning": "#BA7B0D",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs 
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          "font-family": 'Montserrat, sans-serif',
          "primary": "#ffffff",
          "secondary": "#777777",
          "accent": "#6767ff",
          "error": "#ff522f",
          "info": "#20b8ff",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs 
        },
      },
    ],
    darkTheme: 'black',
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
}

module.exports = mergeDeepRight(
  baseConfig, customTwConfig
)
