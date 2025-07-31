import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default tseslint.config(
  {
    ignores: ['.next', 'src/next.lock', 'src/types/contentful-schema.ts'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      '@stylistic': stylistic,
      'better-tailwindcss': betterTailwindcss,
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      // TODO: turn it on when we find better types generator
      '@typescript-eslint/no-unsafe-assignment': 'off',

      // Import order rule
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

      // Stylistic
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/jsx-self-closing-comp': ['warn'],
      '@stylistic/max-len': ['warn', {
        code: 100,
        ignoreUrls: true,
        ignoreComments: true
      }],
      '@stylistic/jsx-sort-props': ['warn', {
        callbacksLast: true,
        reservedFirst: true,
        shorthandFirst: true,
      }],

      // Better Tailwind CSS
      ...betterTailwindcss.configs['recommended-warn']?.rules,
      'better-tailwindcss/enforce-consistent-class-order': ['warn', { order: 'official' }],
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', {
        group: 'newLine',
        preferSingleLine: true,
        printWidth: 100
      }],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/globals.css',
      }
    }
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
)
