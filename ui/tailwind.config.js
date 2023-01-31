const { mergeDeepRight } = require('ramda')
const config = require("tailwind-config-custom/tailwind.config");

module.exports = mergeDeepRight(
  config,
  {
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
  })


