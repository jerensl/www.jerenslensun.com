import type { ImageLoaderProps } from 'next/image'
import { siteMetadata } from '@/constant/seo'

const configuredCdn =
    process.env.NEXT_PUBLIC_IMAGES_CDN || 'https://ik.imagekit.io/jerensl'

/**
 * A bare `https://ik.imagekit.io` endpoint (used by some local env files) is
 * missing the account segment. Normalize both forms to one CDN root.
 */
export const IMAGES_CDN = /^https?:\/\/ik\.imagekit\.io\/?$/.test(configuredCdn)
    ? `${configuredCdn.replace(/\/$/, '')}/jerensl`
    : configuredCdn.replace(/\/$/, '')

export const DEFAULT_CONTENT_IMAGE = '/images/default-content.webp'
export const DEFAULT_PROJECT_IMAGE = '/images/project-default.webp'

export default function ImageLoader({
    src,
    width,
    quality,
}: ImageLoaderProps): string {
    if (!src) {
        return DEFAULT_CONTENT_IMAGE
    }

    if (
        src.startsWith('/') ||
        src.startsWith('data:') ||
        /^(https?:)?\/\//i.test(src)
    ) {
        return src
    }

    if (process.env.NODE_ENV !== 'production') {
        return `/media/${src}`
    }

    return `${IMAGES_CDN}/tr:di-project-default.webp,w-${width},q-${
        quality || 75
    }/${src}`
}

export function absoluteMediaUrl(src: string): string {
    if (/^https?:\/\//i.test(src)) {
        return src
    }

    if (src.startsWith('/')) {
        return `${siteMetadata.url.replace(/\/$/, '')}${src}`
    }

    return `${IMAGES_CDN}/${src}`
}
