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
                    runtimeCaching,
                    cacheOnFrontEndNav: true,
                },
            },
        ],
    ],
    {
        swcMinify: true,
        images: {
            loader: 'cloudinary',
            path: 'https://tempfilejerens.blob.core.windows.net/assets/illustration-01.png',
            domains: [
                'jerenslensun.com',
                'tempfilejerens.blob.core.windows.net',
            ],
        },
        plugins: [
            new InjectManifest({
                swSrc: './public/sw.js',
            }),
        ],
    }
)
