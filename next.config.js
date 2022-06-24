const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { InjectManifest } = require('workbox-webpack-plugin')

/** @type {import('next').NextConfig} */
module.exports = withPlugins(
    [
        [
            withPWA,
            {
                pwa: {
                    dest: 'public',
                    disable: process.env.NODE_ENV === 'development',
                    register: true,
                    skipWaiting: true,
                    customWorkerDir: 'src/worker',
                    runtimeCaching,
                    cacheOnFrontEndNav: true,
                },
            },
        ],
    ],
    {
        swcMinify: true,
        plugins: [
            new InjectManifest({
                swSrc: './public/sw.js',
            }),
        ],
    }
)
