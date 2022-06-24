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
        images: {
            formats: ['image/avif', 'image/webp'],
            loader: 'custom',
            path: 'https://ik.imagekit.io/jerensl/',
            domains: ['jerenslensun.com', 'ik.imagekit.io'],
        },
        plugins: [
            new InjectManifest({
                swSrc: './public/sw.js',
            }),
        ],
    }
)
