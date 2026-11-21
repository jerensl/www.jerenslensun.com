/**
 * Mapping from the bare cover filenames currently in frontmatter to the
 * original Cloudinary public IDs. ImageKit only ever served the default
 * fallback for these paths, but the originals were still available on the old
 * Cloudinary account.
 */
export const cloudinaryBase =
    'https://res.cloudinary.com/do9os7lxv/image/upload/personal'

export const cloudinaryCovers: Record<string, string | null> = {
    'binary-search.jpg': 'binary-search_kadoxg.webp',
    'cover.img': null,
    'data-heap.jpg': 'struktur-data-heap_wr6nit.webp',
    'data.jpg': 'data-penyimpanan_xdqfzd.webp',
    'default.jpg': null,
    'default.png': null,
    'load-balancer.jpg': null,
    'networking.jpg': 'reverse-proxy_d4urpv.webp',
    'notification.jpg': 'notification_xs4syl.webp',
    'oss-summit-jp-2025.jpg': null,
    'personal-app.jpeg': 'landing-page_tqnf8b.webp',
    'sorting.jpeg': null,
    'speed.jpg': 'fundamental-algoritma_bbgzw5.webp',
    'meshery-playwright.webp': null,
    'servo-browser-engine.webp': null,
}
