// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

const config = require("./tailwind.config.js");
module.exports = {
  plugins: {
    tailwindcss: {
      config
    },
    autoprefixer: {},
  },
};
