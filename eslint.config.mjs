import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        ignores: ['**/scripts', '!**/.storybook'],
    },
    ...fixupConfigRules(
        compat.extends(
            'plugin:import/recommended',
            'plugin:import/typescript',
            'plugin:prettier/recommended',
            'plugin:jsx-a11y/recommended',
            'plugin:react-hooks/recommended',
            'plugin:storybook/recommended',
            'plugin:react/recommended',
            'plugin:react/jsx-runtime', // Add this for the new JSX transform
            'next/core-web-vitals',
            'prettier'
        )
    ),
    {
        plugins: {
            'react-hooks': fixupPluginRules(reactHooks),
            prettier: fixupPluginRules(prettier),
        },

        rules: {
            'prettier/prettier': 'error',
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            'react/react-in-jsx-scope': 'off',

            'react/jsx-filename-extension': [
                1,
                {
                    extensions: ['.ts', '.tsx'],
                },
            ],

            'react/display-name': 1,
            'react/no-unescaped-entities': 'error',
            'no-console': 'warn',
        },
    },
    {
        files: ['__tests__/**/*'],

        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
]
