/** @type {import('next').NextConfig} */
module.exports = {
    swcMinify: true,
    experimental: {
        esmExternals: 'loose',
    },
}
