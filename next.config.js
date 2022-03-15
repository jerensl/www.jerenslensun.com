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
            loader: 'cloudinary',
            path: 'https://res.cloudinary.com/do9os7lxv/image/upload/v1640579086/personal/',
            domains: ['jerenslensun.com', 'res.cloudinary.com'],
        },
        plugins: [
            new InjectManifest({
                swSrc: './public/sw.js',
            }),
        ],
    }
)
