import fs from 'node:fs/promises'
import path from 'node:path'
import {
    buildCdnPath,
    buildLocalPath,
    inspectImage,
    listImageFiles,
    readAssetFile,
    sha256,
} from './assets.js'
import {
    hasUploadCredentials,
    uploadAsset,
} from './imagekit.js'
import { emptyMeta, readMeta, writeMeta } from './manifest.js'
import { getPaths } from './paths.js'
import { listPosts, pathExists } from './posts.js'
import type {
    AssetProvider,
    ContentType,
    MediaAsset,
    MediaMeta,
    SyncOptions,
    SyncSummary,
} from './types.js'

interface Target {
    type: ContentType | 'shared'
    slug: string
    scope: string
    assetsDir: string
}

interface Inspection {
    width: number
    height: number
    blurDataURL: string
}

export async function syncAll(options: SyncOptions): Promise<SyncSummary> {
    const paths = getPaths()
    const posts = await listPosts('blog').then(async (blog) => [
        ...blog,
        ...(await listPosts('project')),
    ])

    const summary: SyncSummary = {
        posts: 0,
        assets: 0,
        uploaded: 0,
        local: 0,
        changed: 0,
        warnings: [],
    }

    const canUpload = options.upload && !options.offline
    const hasKey = hasUploadCredentials()

    if (canUpload && !hasKey) {
        summary.warnings.push(
            'Upload requested but IMAGEKIT_PRIVATE_KEY is not set; assets are served locally.'
        )
    }

    const cache = new Map<string, Inspection>()

    for (const post of posts) {
        if (!(await pathExists(post.assetsDir))) {
            continue
        }

        await syncTarget(
            {
                type: post.type,
                slug: post.slug,
                scope: `${post.type}/${post.slug}`,
                assetsDir: post.assetsDir,
            },
            {
                options,
                upload: canUpload && hasKey,
                summary,
                cache,
                publicContent: paths.publicContent,
                publicMedia: paths.publicMedia,
            }
        )
    }

    if (await pathExists(paths.shared)) {
        await syncTarget(
            {
                type: 'shared',
                slug: 'shared',
                scope: 'shared',
                assetsDir: paths.shared,
            },
            {
                options,
                upload: canUpload && hasKey,
                summary,
                cache,
                publicContent: paths.publicContent,
                publicMedia: paths.publicMedia,
            }
        )
    }

    return summary
}

interface SyncContext {
    options: SyncOptions
    upload: boolean
    summary: SyncSummary
    cache: Map<string, Inspection>
    publicContent: string
    publicMedia: string
}

async function syncTarget(target: Target, context: SyncContext): Promise<void> {
    const files = await listImageFiles(target.assetsDir)
    const previous = (await readMeta(target.assetsDir)) ?? emptyMeta(target.type, target.slug)
    const next: MediaMeta = {
        ...emptyMeta(target.type, target.slug),
        assets: {},
    }
    let changed = false

    for (const file of files) {
        const absolute = path.join(target.assetsDir, file)
        const buffer = await readAssetFile(target.assetsDir, file)
        const hash = sha256(buffer)
        const previousAsset = previous.assets[file]
        const inspection = await inspect(
            hash,
            buffer,
            context.cache
        )

        let remotePath: string
        let provider: AssetProvider

        if (
            previousAsset &&
            previousAsset.sha256 === hash &&
            !(context.upload && previousAsset.provider === 'local')
        ) {
            remotePath = previousAsset.remotePath
            provider = previousAsset.provider
        } else if (context.upload) {
            const cd = buildCdnPath(target.scope, file, hash)
            const uploaded = await uploadAsset({
                buffer,
                fileName: path.basename(cd),
                folder: `/${path.dirname(cd)}`,
                mimeType: mimeTypeFor(file),
            })

            remotePath = uploaded.filePath
            provider = 'imagekit'
            context.summary.uploaded += 1
        } else {
            remotePath = buildLocalPath(target.scope, file)
            provider = 'local'
            context.summary.local += 1
        }

        const asset: MediaAsset = {
            file,
            sha256: hash,
            width: inspection.width,
            height: inspection.height,
            blurDataURL: inspection.blurDataURL,
            remotePath,
            provider,
            bytes: buffer.byteLength,
        }

        next.assets[file] = asset

        if (
            !previousAsset ||
            previousAsset.sha256 !== asset.sha256 ||
            previousAsset.remotePath !== asset.remotePath
        ) {
            changed = true
        }

        if (!context.options.dryRun) {
            await publishAsset(target, file, asset, buffer, context)
        }

        context.summary.assets += 1
    }

    if (Object.keys(previous.assets).length !== Object.keys(next.assets).length) {
        changed = true
    }

    if (!context.options.dryRun && (changed || !(await pathExists(path.join(target.assetsDir, 'meta.json'))))) {
        await writeMeta(target.assetsDir, next)
    }

    if (changed) {
        context.summary.changed += 1
    }

    context.summary.posts += 1
}

async function publishAsset(
    target: Target,
    file: string,
    asset: MediaAsset,
    buffer: Buffer,
    context: SyncContext
): Promise<void> {
    if (asset.provider === 'local') {
        const destination = path.join(
            context.publicContent,
            target.scope,
            file
        )

        await fs.mkdir(path.dirname(destination), { recursive: true })
        await fs.writeFile(destination, buffer)

        return
    }

    const destination = path.join(context.publicMedia, asset.remotePath)
    await fs.mkdir(path.dirname(destination), { recursive: true })
    await fs.writeFile(destination, buffer)
}

async function inspect(
    hash: string,
    buffer: Buffer,
    cache: Map<string, Inspection>
): Promise<Inspection> {
    const cached = cache.get(hash)

    if (cached) {
        return cached
    }

    const inspection = await inspectImage(buffer)
    cache.set(hash, inspection)

    return inspection
}

function mimeTypeFor(file: string): string {
    const extension = path.extname(file).toLowerCase()

    switch (extension) {
        case '.avif':
            return 'image/avif'
        case '.gif':
            return 'image/gif'
        case '.jpeg':
        case '.jpg':
            return 'image/jpeg'
        case '.png':
            return 'image/png'
        case '.svg':
            return 'image/svg+xml'
        case '.webp':
            return 'image/webp'
        default:
            return 'application/octet-stream'
    }
}
