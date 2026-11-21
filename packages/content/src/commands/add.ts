import fs from 'node:fs/promises'
import path from 'node:path'
import { isImageFile } from '../assets.js'
import { getPaths } from '../paths.js'
import { listPosts, pathExists } from '../posts.js'
import { syncAll } from '../sync.js'
import type { SyncSummary } from '../types.js'

export interface AddOptions {
    post: string
    name?: string
    type: 'blog' | 'project'
    force: boolean
    upload: boolean
    offline: boolean
}

export interface AddResult {
    destination: string
    sync: SyncSummary
}

export async function addAsset(
    source: string,
    options: AddOptions
): Promise<AddResult> {
    const paths = getPaths()
    const posts = await listPosts(options.type)
    const post = posts.find((entry) => entry.slug === options.post)

    if (!post) {
        throw new Error(
            `No ${options.type} post named "${options.post}". Available: ${posts
                .map((entry) => entry.slug)
                .join(', ')}`
        )
    }

    if (!isImageFile(source)) {
        throw new Error(`"${source}" is not a supported image file`)
    }

    const extension = path.extname(source).toLowerCase()
    const requested = options.name ?? path.basename(source, extension)
    const fileName = `${requested.replace(/[^A-Za-z0-9._-]+/g, '-')}${extension}`
    const destination = path.join(post.assetsDir, fileName)

    if (!options.force && (await pathExists(destination))) {
        throw new Error(
            `${path.relative(paths.root, destination)} already exists; pass --force to replace it`
        )
    }

    await fs.mkdir(post.assetsDir, { recursive: true })
    await fs.copyFile(source, destination)

    const sync = await syncAll({
        upload: options.upload,
        offline: options.offline,
        dryRun: false,
    })

    return { destination, sync }
}
