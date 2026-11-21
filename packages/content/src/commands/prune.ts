import fs from 'node:fs/promises'
import path from 'node:path'
import { getPaths } from '../paths.js'
import { listAllPosts } from '../posts.js'
import { readMeta } from '../manifest.js'
import { deleteRemoteFile, hasUploadCredentials, listRemoteFiles } from '../imagekit.js'

export interface PruneOptions {
    remote: boolean
    yes: boolean
    dryRun: boolean
}

export interface PruneResult {
    localOrphans: string[]
    remoteOrphans: string[]
}

export async function prune(options: PruneOptions): Promise<PruneResult> {
    const paths = getPaths()
    const posts = await listAllPosts()
    const knownRemote = new Set<string>()
    const result: PruneResult = { localOrphans: [], remoteOrphans: [] }

    for (const post of posts) {
        const meta = await readMeta(post.assetsDir)

        for (const asset of Object.values(meta?.assets ?? {})) {
            knownRemote.add(asset.remotePath)
        }
    }

    const shared = await readMeta(paths.shared)

    for (const asset of Object.values(shared?.assets ?? {})) {
        knownRemote.add(asset.remotePath)
    }

    for (const post of posts) {
        let entries: string[] = []

        try {
            entries = await fs.readdir(post.assetsDir)
        } catch {
            continue
        }

        const meta = await readMeta(post.assetsDir)

        for (const entry of entries) {
            if (entry === 'meta.json') {
                continue
            }

            if (entry.startsWith('.') || !meta?.assets[entry]) {
                result.localOrphans.push(
                    path.relative(paths.root, path.join(post.assetsDir, entry))
                )
            }
        }
    }

    if (!options.remote) {
        return result
    }

    if (!hasUploadCredentials()) {
        throw new Error('IMAGEKIT_PRIVATE_KEY is required for --remote')
    }

    const remote = await listRemoteFiles()

    for (const file of remote) {
        if (!/^(blog|project|shared)\//.test(file.filePath)) {
            continue
        }

        if (knownRemote.has(file.filePath)) {
            continue
        }

        result.remoteOrphans.push(file.filePath)

        if (options.yes && !options.dryRun) {
            await deleteRemoteFile(file.fileId)
        }
    }

    return result
}
