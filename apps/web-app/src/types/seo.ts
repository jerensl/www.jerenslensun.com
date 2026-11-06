export interface SiteMetadata {
    url: string
    twitter: string
    linkedin: string
    github: string
    jobTitle: string
}

export interface App {
    name: string
    title: string
    image: string
    description: string
}

export type SeoType = 'website' | 'article'

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
}

export type JsonLdSchema = Record<string, unknown>

export interface BlogPostSeoProps {
    title: string
    description: string
    path: string
    image: string
}
