// const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        loader: 'custom',
        path: 'https://ik.imagekit.io/jerensl/',
        domains: ['jerenslensun.com', 'ik.imagekit.io'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },
    pwa: {
        dest: 'public',
        // disable: process.env.NODE_ENV === 'development',
        register: true,
        skipWaiting: true,
        customWorkerDir: 'src/worker',
        runtimeCaching,
        cacheOnFrontEndNav: true,
    },
}

module.exports = (_phase, { defaultConfig }) => {
    const plugins = [withPWA]
    const config = plugins.reduce((acc, next) => next(acc), {
        ...nextConfig,
    })
    return config
}
