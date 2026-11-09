import { app, siteMetadata } from '@/constant/seo'
import {
    absoluteUrl,
    articleSchema,
    breadcrumbSchema,
    buildSeo,
    projectSchema,
} from '@/libs/seo'
import { JsonLdSchema, SeoAlternate, SeoResult } from '@/types/seo'
import Head from 'next/head'
import React from 'react'

const toArray = (
    schema?: JsonLdSchema | JsonLdSchema[] | null
): JsonLdSchema[] => {
    if (!schema) {
        return []
    }

    return Array.isArray(schema) ? schema : [schema]
}

const JsonLd: React.FC<{ schemas: JsonLdSchema[] }> = ({ schemas }) => {
    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema),
                    }}
                />
            ))}
        </>
    )
}

const SeoHead: React.FC<{ seo: SeoResult; schemas: JsonLdSchema[] }> = ({
    seo,
    schemas,
}) => {
    return (
        <Head>
            <title>{seo.title}</title>
            <meta
                name="robots"
                content={seo.noIndex ? 'noindex, nofollow' : 'follow, index'}
            />
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={seo.canonical} />
            <link
                rel="alternate"
                type="application/rss+xml"
                title={`${app.title} RSS Feed`}
                href={`${siteMetadata.url}/rss.xml`}
            />
            <link
                rel="sitemap"
                type="application/xml"
                title="Sitemap"
                href={`${siteMetadata.url}/sitemap.xml`}
            />

            {/* Open Graph Data */}
            <meta property="og:title" content={seo.title} />
            <meta property="og:url" content={seo.canonical} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:site_name" content={app.name} />
            <meta property="og:type" content={seo.type} />
            <meta property="og:locale" content={seo.ogLocale} />
            {seo.alternates
                .filter(
                    ({ hrefLang }) =>
                        hrefLang !== 'x-default' &&
                        hrefLang.toLowerCase() !== seo.language.toLowerCase()
                )
                .map(({ hrefLang }) => (
                    <meta
                        key={hrefLang}
                        property="og:locale:alternate"
                        content={hrefLang.replace('-', '_')}
                    />
                ))}
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:alt" content={seo.title} />
            {seo.alternates.map(({ hrefLang, href }) => (
                <link
                    key={hrefLang}
                    rel="alternate"
                    hrefLang={hrefLang}
                    href={href}
                />
            ))}
            {seo.type === 'article' && seo.publishedTime ? (
                <meta
                    property="article:published_time"
                    content={seo.publishedTime}
                />
            ) : null}
            {seo.type === 'article' && seo.modifiedTime ? (
                <meta
                    property="article:modified_time"
                    content={seo.modifiedTime}
                />
            ) : null}
            {seo.type === 'article' ? (
                <meta property="article:author" content={app.title} />
            ) : null}
            {seo.tags.map((tag) => (
                <meta key={tag} property="article:tag" content={tag} />
            ))}

            {/* Twitter Graph Data */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:creator" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            <link rel="icon" href="/favicon.ico" />

            <JsonLd schemas={schemas} />
        </Head>
    )
}

interface IHeadComponent {
    title: string
    path: string
    description?: string
    image?: string
    noIndex?: boolean
    jsonLd?: JsonLdSchema | JsonLdSchema[]
}

export const HeadComponent: React.FC<IHeadComponent> = ({
    title,
    path,
    description,
    image,
    noIndex,
    jsonLd,
}) => {
    const seo = buildSeo({
        title,
        path,
        description: description ?? app.description,
        image,
        noIndex,
    })

    const schemas = [
        ...toArray(jsonLd),
        ...toArray(breadcrumbSchema(path, title || undefined)),
    ]

    return <SeoHead seo={seo} schemas={schemas} />
}

interface IArticleSeo {
    title: string
    description: string
    path: string
    image: string
    date?: string
    tags?: string[]
    repoUrl?: string
    kind?: 'article' | 'project'
    /** BCP 47 locale of the page, for example `id-ID`. */
    language?: string
    /** Absolute or site-relative path to the translated version. */
    translationPath?: string
    /** BCP 47 locale of the translated version. */
    translationLanguage?: string
}

export const ArticleSeo: React.FC<IArticleSeo> = ({
    title,
    description,
    path,
    image,
    date,
    tags = [],
    repoUrl,
    kind = 'article',
    language = 'en-US',
    translationPath,
    translationLanguage,
}) => {
    const alternates: SeoAlternate[] = []

    if (translationPath && translationLanguage) {
        const isDefaultLanguage = language.toLowerCase().startsWith('en')

        alternates.push(
            { hrefLang: language, href: absoluteUrl(path) },
            {
                hrefLang: translationLanguage,
                href: absoluteUrl(translationPath),
            },
            {
                hrefLang: 'x-default',
                href: absoluteUrl(isDefaultLanguage ? path : translationPath),
            }
        )
    }

    const seo = buildSeo({
        title,
        description,
        path,
        image,
        type: 'article',
        publishedTime: date,
        modifiedTime: date,
        tags,
        language,
        alternates,
    })

    const schema =
        kind === 'project'
            ? projectSchema({
                  title,
                  description,
                  image,
                  canonical: seo.canonical,
                  repoUrl,
                  tags,
              })
            : articleSchema({
                  title,
                  description,
                  image,
                  canonical: seo.canonical,
                  date,
                  tags,
                  language,
              })

    const schemas = [schema, ...toArray(breadcrumbSchema(path, title))]

    return <SeoHead seo={seo} schemas={schemas} />
}
