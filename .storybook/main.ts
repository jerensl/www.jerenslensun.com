import type { StorybookConfig } from '@storybook/nextjs'
import remarkGfm from 'remark-gfm'
import path from 'path'

const config: StorybookConfig = {
    framework: {
        name: '@storybook/nextjs',
        options: {
            builder: {},
        },
    },

    staticDirs: ['../public'],
    
    docs: {},

    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm',
        'storybook-dark-mode',
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
        '@chromatic-com/storybook'
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
        reactDocgen: 'react-docgen-typescript'
    }
}

export default config
