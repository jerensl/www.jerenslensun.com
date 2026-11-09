export interface SiteMetadata {
    url: string
    twitter: string
    linkedin: string
    github: string
    resume: string
    jobTitle: string
}

export interface App {
    name: string
    title: string
    image: string
    description: string
}

export type SeoType = 'website' | 'article'

export interface SeoAlternate {
    hrefLang: string
    href: string
}

export interface SeoConfig {
    title: string
    description: string
    path: string
    image?: string
    type?: SeoType
    publishedTime?: string
    modifiedTime?: string
    tags?: string[]
    noIndex?: boolean
    /** BCP 47 locale for the page content, for example `en-US`. */
    language?: string
    /** Alternate language versions of this page. */
    alternates?: SeoAlternate[]
}

export interface SeoResult {
    title: string
    description: string
    canonical: string
    image: string
    type: SeoType
    publishedTime?: string
    modifiedTime?: string
    tags: string[]
    noIndex: boolean
    language: string
    ogLocale: string
    alternates: SeoAlternate[]
}

export type JsonLdSchema = Record<string, unknown>

export interface BlogPostSeoProps {
    title: string
    description: string
    path: string
    image: string
}
