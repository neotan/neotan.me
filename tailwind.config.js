const defaultTheme = require('tailwindcss/defaultTheme')

const LIGHT_THEME_NAME = 'autumn'
const DARK_THEME_NAME = 'dracula'

module.exports = {
  darkMode: 'class',
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
    themeIcons: ['🌞', '🌛'],
    themes: [
      DARK_THEME_NAME,
      LIGHT_THEME_NAME,
      //   {
      //     [DARK_THEME_NAME]: {
      //       primary: '#d9643a',
      //       secondary: '#d9643a',
      //       accent: '#DF997F',
      //       neutral: '#592918',
      //       'base-100': '#212121',
      //       '--bc2': '0,0%,22%,1',
      //       '--s2': '0,0%,88%,1',
      //     },
      //   },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: DARK_THEME_NAME,
  },
}
