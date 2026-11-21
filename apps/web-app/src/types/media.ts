export type AssetProvider = 'imagekit' | 'local'

export interface MediaAsset {
    file: string
    sha256: string
    width: number
    height: number
    blurDataURL: string
    remotePath: string
    provider: AssetProvider
    bytes: number
}

export interface MediaMeta {
    version: 1
    type: 'blog' | 'project' | 'shared'
    slug: string
    assets: Record<string, MediaAsset>
}

export interface CoverMedia {
    src: string
    blurDataURL: string
    width: number
    height: number
}
