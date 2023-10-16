import runtimeCaching from 'next-pwa/cache.js'
import withPWA from 'next-pwa'

// eslint-disable-next-line import/no-anonymous-default-export
export default (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: true,
        swcMinify: true,
        images: {
            formats: ['image/avif', 'image/webp'],
            loader: 'custom',
            path: 'https://ik.imagekit.io/jerensl/',
            domains: ['jerensl.com', 'ik.imagekit.io'],
        },
        compiler: {
            removeConsole: process.env.NODE_ENV !== 'development',
        },
    }

    const plugins = [
        withPWA({
            dest: 'public',
            disable: process.env.NODE_ENV === 'development',
            register: true,
            skipWaiting: true,
            customWorkerDir: 'src/worker',
            runtimeCaching,
            cacheOnFrontEndNav: true,
        }),
    ]
    const config = plugins.reduce((acc, next) => next(acc), {
        ...nextConfig,
    })
    return config
}
