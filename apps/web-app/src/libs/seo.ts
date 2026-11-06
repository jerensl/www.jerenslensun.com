import { app, siteMetadata } from '@/constant/seo'
import { JsonLdSchema, SeoConfig, SeoResult } from '@/types/seo'

export const SITE_URL = siteMetadata.url

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Turn any path into an absolute, single-slash URL.
 * `/blog`, `blog/`, and `//blog` all become `https://.../blog/`.
 */
export function absoluteUrl(path = '/'): string {
    if (/^https?:\/\//i.test(path)) {
        return path
    }

    const [pathname] = path.split(/[?#]/)
    const normalized = `/${pathname}`.replace(/\/+/g, '/')

    if (normalized === '/') {
        return `${SITE_URL}/`
    }

    return `${SITE_URL}${normalized.replace(/\/$/, '')}/`
}

export function buildSeo(config: SeoConfig): SeoResult {
    return {
        title: config.title ? `${config.title} | ${app.title}` : app.title,
        description: config.description || app.description,
        canonical: absoluteUrl(config.path),
        image: config.image || app.image,
        type: config.type ?? 'website',
        publishedTime: config.publishedTime,
        modifiedTime: config.modifiedTime ?? config.publishedTime,
        tags: config.tags ?? [],
        noIndex: config.noIndex ?? false,
    }
}

export function personSchema(): JsonLdSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': PERSON_ID,
        name: app.title,
        url: `${SITE_URL}/`,
        image: app.image,
        jobTitle: siteMetadata.jobTitle,
        sameAs: [
            siteMetadata.github,
            siteMetadata.linkedin,
            `https://twitter.com/${siteMetadata.twitter.replace(/^@/, '')}`,
        ],
    }
}

export function websiteSchema(): JsonLdSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: app.title,
        url: `${SITE_URL}/`,
        description: app.description,
        inLanguage: 'en-US',
        publisher: {
            '@id': PERSON_ID,
        },
    }
}

interface ArticleSchemaOptions {
    title: string
    description: string
    image: string
    canonical: string
    date?: string
    tags?: string[]
}

export function articleSchema({
    title,
    description,
    image,
    canonical,
    date,
    tags = [],
}: ArticleSchemaOptions): JsonLdSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${canonical}#article`,
        headline: title,
        description,
        image: [image],
        datePublished: date,
        dateModified: date,
        author: {
            '@type': 'Person',
            name: app.title,
            url: `${SITE_URL}/about/`,
        },
        publisher: {
            '@type': 'Person',
            name: app.title,
            url: `${SITE_URL}/about/`,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonical,
        },
        keywords: tags.join(', '),
        url: canonical,
        inLanguage: 'en-US',
    }
}

interface ProjectSchemaOptions {
    title: string
    description: string
    image: string
    canonical: string
    repoUrl?: string
    tags?: string[]
}

export function projectSchema({
    title,
    description,
    image,
    canonical,
    repoUrl,
    tags = [],
}: ProjectSchemaOptions): JsonLdSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        '@id': `${canonical}#project`,
        name: title,
        description,
        image,
        url: canonical,
        codeRepository: repoUrl,
        programmingLanguage: tags,
        author: {
            '@type': 'Person',
            name: app.title,
            url: `${SITE_URL}/about/`,
        },
        inLanguage: 'en-US',
    }
}

function humanize(segment: string): string {
    return segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (character) => character.toUpperCase())
}

export function breadcrumbSchema(
    path: string,
    title?: string
): JsonLdSchema | null {
    if (!path || path === '/') {
        return null
    }

    const segments = path.split('/').filter(Boolean)
    const items = [{ name: 'Home', path: '/' }]
    let current = ''

    segments.forEach((segment, index) => {
        current += `/${segment}`
        const isLast = index === segments.length - 1

        items.push({
            name: isLast && title ? title : humanize(segment),
            path: current,
        })
    })

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    }
}
