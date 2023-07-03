import { IReadTimeResults } from 'reading-time'

export interface IBlogMetadata {
    title: string
    date: string
    isPublished: boolean
    description: string
    slug?: string
    cover: string
    fileName?: string
    tags: string[]
    blurDataURL?: string
    readTime?: IReadTimeResults
}
