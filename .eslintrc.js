module.exports = {
  extends: [
    'next/core-web-vitals',
    'next',
    'plugin:tailwindcss/recommended'
  ],
  plugins: ['tailwindcss'],
  rules: {
    '@next/next/no-img-element': 'off',
    'no-unused-vars': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    semi: ['warn', 'never'],
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true }
    ],
    'tailwindcss/classnames-order': [
      'warn',
      { callees: ['classnames', 'clsx', 'ctl', 'cn'] }
    ],
    'tailwindcss/no-custom-classname': 'off'
  }
}