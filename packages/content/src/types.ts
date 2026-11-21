export type ContentType = 'blog' | 'project'

export type AssetProvider = 'imagekit' | 'local'

export interface MediaAsset {
    /** File name inside the post asset folder, for example `cover.webp`. */
    file: string
    /** Full sha256 hex digest of the local file. */
    sha256: string
    width: number
    height: number
    blurDataURL: string
    /**
     * Where the app should load the image from. Either a CDN path such as
     * `blog/en-foo/1a2b3c4d-cover.webp`, or an absolute local path such as
     * `/images/content/shared/speed.webp`.
     */
    remotePath: string
    provider: AssetProvider
    bytes: number
}

export interface MediaMeta {
    version: 1
    type: ContentType | 'shared'
    slug: string
    assets: Record<string, MediaAsset>
}

export interface PostFile {
    type: ContentType
    slug: string
    file: string
    assetsDir: string
    data: Record<string, unknown>
    content: string
    raw: string
}

export interface CdnUpload {
    filePath: string
    url: string
    fileId: string
    name: string
}

export interface SyncOptions {
    upload: boolean
    offline: boolean
    dryRun: boolean
}

export interface SyncSummary {
    posts: number
    assets: number
    uploaded: number
    local: number
    changed: number
    warnings: string[]
}
