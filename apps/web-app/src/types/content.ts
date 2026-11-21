import { IReadTimeResults } from 'reading-time'

export type BlogLanguage = 'en' | 'id'

export type ContentType = 'blog' | 'project'

export interface IMetadata {
    title: string
    date: string
    isPublished: boolean
    description: string
    slug?: string
    cover: string
    fileName?: string
    blurDataURL?: string
    /** Explicit article language. Falls back to the filename prefix. */
    language?: BlogLanguage
    /** Slug of the translated version of this article, if one exists. */
    translation?: string
    /** Estimated reading time, computed from the MDX body at build time. */
    readTime?: IReadTimeResults
}

export interface IBlogMetadata extends IMetadata {
    tags: string[]
}

export interface IProjectMetadata extends IMetadata {
    programming_languange: string[]
    repo_url?: string
}

export type IContent = IBlogMetadata | IProjectMetadata

export type MDXTitleHeadingLevels = 'H2' | 'H3'
