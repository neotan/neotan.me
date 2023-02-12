const twConfig = require('./tailwind.config')

module.exports = {
  root: true,
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
  rules: {
    'tailwindcss/classnames-order': ['error', {
      config: twConfig,
      callees: ["classnames", "clsx", "ctl", 'cn']
    }],
  }
}
