module.exports = {
  extends: [
    'next/core-web-vitals',
    'next',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['tailwindcss'],
  rules: {
    '@next/next/no-img-element': 'off',
    'no-unused-vars': 'off',
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    semi: ['warn', 'never'],
    'tailwindcss/classnames-order': [
      'warn',
      { callees: ['classnames', 'clsx', 'ctl', 'cn'] }
    ],
    'tailwindcss/no-custom-classname': 'off',
    'sort-imports': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'next'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'typescript': true,
      'node': true,
    },
  },
}
