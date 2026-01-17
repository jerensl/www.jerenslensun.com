import { IMetadata } from './content'

export interface IProjectMetadata extends IMetadata {
    role: string
    status: string
    programming_languange: string[]
    repo_url?: string
}
