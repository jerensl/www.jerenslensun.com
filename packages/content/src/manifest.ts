import fs from 'node:fs/promises'
import path from 'node:path'
import type { ContentType, MediaMeta } from './types.js'

export function metaPath(assetsDir: string): string {
    return path.join(assetsDir, 'meta.json')
}

export async function readMeta(
    assetsDir: string
): Promise<MediaMeta | null> {
    try {
        const raw = await fs.readFile(metaPath(assetsDir), 'utf8')

        return JSON.parse(raw) as MediaMeta
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return null
        }

        throw error
    }
}

export function emptyMeta(
    type: ContentType | 'shared',
    slug: string
): MediaMeta {
    return {
        version: 1,
        type,
        slug,
        assets: {},
    }
}

export async function writeMeta(
    assetsDir: string,
    meta: MediaMeta
): Promise<void> {
    await fs.mkdir(assetsDir, { recursive: true })

    const assets = Object.fromEntries(
        Object.entries(meta.assets).sort(([left], [right]) =>
            left.localeCompare(right)
        )
    )

    const output = JSON.stringify({ ...meta, assets }, null, 4) + '\n'

    await fs.writeFile(metaPath(assetsDir), output, 'utf8')
}

export function stableMeta(meta: MediaMeta): string {
    return JSON.stringify(meta, null, 4) + '\n'
}
