const defaultTheme = require('tailwindcss/defaultTheme')

const LIGHT_THEME_NAME = 'neolight'
const DARK_THEME_NAME = 'neodark'

module.exports = {
  darkMode: 'data-theme="neodark"',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/daisyui/dist/**/*.js',
    './node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans"',
          '"Noto Sans TC"',
          ...defaultTheme.fontFamily.sans,
        ],
        heading: ['Mitr', '"Noto Sans TC"', ...defaultTheme.fontFamily.sans],
        code: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themeIcons: ['🌞', '🌛', '🎃'],
    themes: [
      {
        [LIGHT_THEME_NAME]: {
          primary: '#141414',
          secondary: '#efefef',
          accent: '#303030',
          neutral: '#5d5656',
          'neutral-content': '#e9e7e7',
          'base-100': '#e9e7e7',
          'base-content': '#100f0f',
        },
      },
      {
        [DARK_THEME_NAME]: {
          primary: '#141414',
          secondary: '#393939',
          accent: '#ffffff',
          neutral: '#23282F',
          'base-100': '#222222',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: DARK_THEME_NAME,
  },
}
