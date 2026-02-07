import { IReadTimeResults } from 'reading-time'

export interface IMetadata {
    title: string
    date: string
    isPublished: boolean
    description: string
    slug?: string
    cover: string
    fileName?: string
    blurDataURL?: string
}

export interface IBlogMetadata extends IMetadata {
    readTime?: IReadTimeResults
}

export interface IProjectMetadata extends IMetadata {
    programming_languange: string[]
    repo_url?: string
}

export type IContent = IBlogMetadata | IProjectMetadata

export type MDXTitleHeadingLevels = 'H2' | 'H3'
