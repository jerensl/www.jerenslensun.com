/** @type {import('next').NextConfig} */
module.exports = {
    swcMinify: true,
    images: {
        loader: 'cloudinary',
        path: 'https://tempfilejerens.blob.core.windows.net/assets/illustration-01.png',
        domains: ['jerenslensun.com', 'tempfilejerens.blob.core.windows.net'],
    },
}
