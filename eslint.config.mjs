import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'jsx-a11y': jsxA11y,
            '@typescript-eslint': tsPlugin,
            react,
            'react-hooks': reactHooks,
            prettier,
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            /* React */
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',

            /* Hooks */
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            /* Accessibility */
            'jsx-a11y/alt-text': 'warn',

            /* Prettier */
            'prettier/prettier': 'error',

            /* Sanity */
            'no-console': 'warn',

            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            'no-empty': 'warn',
        },
    },
    {
        files: ['src/worker/**/*.{ts,js}'],
        languageOptions: {
            globals: globals.serviceworker,
        },
    },
    {
        ignores: [
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
            'storybook-static/**',
            'scripts/**',
            'public/**',
            '__mocks__/**/*',
            '__tests__/**/*',
            './next.config.mjs',
            './next-sitemap.cjs',
        ],
    },
]
