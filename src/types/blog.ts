import { IReadTimeResults } from 'reading-time'
import { IMetadata } from './content'

export interface IBlogMetadata extends IMetadata {
    tags: string[]
    readTime?: IReadTimeResults
}
