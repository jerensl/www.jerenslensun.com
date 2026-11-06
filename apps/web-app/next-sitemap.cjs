/** @type {import('next-sitemap').IConfig} */
const priorityByPath = {
    '/': 1.0,
    '/about/': 0.9,
    '/blog/': 0.9,
    '/project/': 0.9,
}

const isContentPath = (path) =>
    path.startsWith('/blog/') || path.startsWith('/project/')

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://jerensl.dev',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    transform: async (_config, path) => {
        const contentPath = isContentPath(path)

        return {
            loc: path,
            changefreq: contentPath ? 'monthly' : 'weekly',
            priority: priorityByPath[path] ?? (contentPath ? 0.6 : 0.7),
            lastmod: new Date().toISOString(),
        }
    },
}
