// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/nextjs'
import remarkGfm from 'remark-gfm'
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const config: StorybookConfig = {
    framework: {
        name: '@storybook/nextjs',
        options: {
            builder: { useSWC: true },
        },
    },

    staticDirs: ['../public'],

    docs: {},

    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        'storybook-dark-mode',
        '@storybook/addon-links',
        {
            name: '@storybook/addon-docs',
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
    ],

    webpackFinal: (config: any) => {
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                },
            ],
            include: path.resolve(__dirname, '../'),
        })
        return config
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            // 👇 Default prop filter, which excludes props from node_modules
            propFilter: (prop) =>
                prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
        },
    },
}

export default config
