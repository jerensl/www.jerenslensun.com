import type { StorybookConfig } from '@storybook/nextjs'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm',
        {
            name: '@storybook/addon-styling',
            options: {
                // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
                // For more details on this addon's options.
                postCss: {
                    implementation: require.resolve('postcss'),
                },
            },
        },
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
    docs: {
        autodocs: 'tag',
    },
}

export default config

// const path = require('path')

// module.exports = {
//     stories: [
//         '../src/**/*.stories.mdx',
//         '../src/**/*.stories.@(js|jsx|ts|tsx)',
//     ],

//     addons: [
//         '@storybook/addon-links',
//         '@storybook/addon-essentials',
//         '@storybook/addon-interactions',
//         'storybook-addon-next-router',
//         {
//             /**
//              * NOTE: fix Storybook issue with PostCSS@8
//              * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
//              */
//             name: '@storybook/addon-postcss',
//             options: {
//                 postcssLoaderOptions: {
//                     implementation: require('postcss'),
//                 },
//             },
//         },
//         '@storybook/addon-mdx-gfm'
//     ],

//     framework: '@storybook/react',

//     core: {
//         builder: '@storybook/builder-webpack5',
//     },

//     webpackFinal: (config) => {
//         /**
//          * Add support for alias-imports
//          * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
//          */
//         config.resolve.alias = {
//             ...config.resolve?.alias,
//             '@': [path.resolve(__dirname, '../src/')],
//         }

//         /**
//          * Fixes font import with /
//          * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
//          */
//         config.resolve.roots = [
//             path.resolve(__dirname, '../public'),
//             'node_modules',
//         ]

//         config.resolve.fallback = {
//             assert: require.resolve('assert'),
//         }

//         return config
//     },

//     docs: {
//         autodocs: true
//     }
// }
