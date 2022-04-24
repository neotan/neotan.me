const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: 'inherit',
              'text-decoration-line': 'none',
              '&:hover': {
                color: '#3182ce',
              },
              '&::after': {
                content: '"🔗"',
                opacity: '0.14',
                'font-size': '1.25rem',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
}
