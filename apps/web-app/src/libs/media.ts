import fs from 'node:fs'
import path from 'node:path'
import { contentDir } from '@jerensl/content-data'
import type { ContentType } from '@/types/content'
import type { CoverMedia, MediaAsset, MediaMeta } from '@/types/media'

const DEFAULT_COVERS: Record<ContentType, string> = {
    blog: '/images/default-content.webp',
    project: '/images/project-default.webp',
}

const cache = new Map<string, MediaMeta | null>()
const cacheEnabled = process.env.NODE_ENV === 'production'

function metaFile(type: ContentType | 'shared', slug: string): string {
    const root = path.join(contentDir, 'images')

    return type === 'shared'
        ? path.join(root, 'shared', 'meta.json')
        : path.join(root, type, slug, 'meta.json')
}

export function readMediaMeta(
    type: ContentType | 'shared',
    slug: string
): MediaMeta | null {
    const key = `${type}/${slug}`

    if (cacheEnabled && cache.has(key)) {
        return cache.get(key) ?? null
    }

    let meta: MediaMeta | null = null

    try {
        meta = JSON.parse(
            fs.readFileSync(metaFile(type, slug), 'utf8')
        ) as MediaMeta
    } catch (error) {
        if ((error as { code?: string }).code !== 'ENOENT') {
            throw error
        }
    }

    if (cacheEnabled) {
        cache.set(key, meta)
    }

    return meta
}

function normalize(reference: string): string {
    return reference
        .replace(/^\.\//, '')
        .replace(/^\.\.\//, '')
        .replace(/^\/+/, '')
}

function findByBasename(
    meta: MediaMeta | null,
    reference: string
): MediaAsset | undefined {
    if (!meta) {
        return undefined
    }

    const basename = reference.split('/').pop() ?? reference

    if (meta.assets[basename]) {
        return meta.assets[basename]
    }

    return Object.entries(meta.assets).find(
        ([key]) => key.split('/').pop() === basename
    )?.[1]
}

/**
 * Resolve a frontmatter or markdown reference against a post's asset meta,
 * then the shared bucket. Bare file names keep working during migration.
 */
export function lookupAsset(
    type: ContentType,
    slug: string,
    reference: string
): { key: string; asset: MediaAsset } | null {
    const postMeta = readMediaMeta(type, slug)
    const sharedMeta = readMediaMeta('shared', 'shared')
    const normalized = normalize(reference)

    if (normalized.startsWith('shared/')) {
        const key = normalized.slice('shared/'.length)
        const asset = sharedMeta?.assets[key] ?? findByBasename(sharedMeta, key)

        return asset ? { key, asset } : null
    }

    if (postMeta?.assets[normalized]) {
        return { key: normalized, asset: postMeta.assets[normalized] }
    }

    const postAsset = findByBasename(postMeta, normalized)

    if (postAsset) {
        return { key: postAsset.file, asset: postAsset }
    }

    const sharedAsset =
        sharedMeta?.assets[normalized] ?? findByBasename(sharedMeta, normalized)

    if (sharedAsset) {
        return { key: sharedAsset.file, asset: sharedAsset }
    }

    return null
}

export function resolveCover(
    type: ContentType,
    slug: string,
    override?: string
): CoverMedia {
    const postMeta = readMediaMeta(type, slug)
    let asset: MediaAsset | undefined

    if (override) {
        asset = lookupAsset(type, slug, override)?.asset
    }

    if (!asset && postMeta) {
        const key = Object.keys(postMeta.assets)
            .sort()
            .find((candidate) => /^cover\.[a-z0-9]+$/i.test(candidate))

        if (key) {
            asset = postMeta.assets[key]
        }
    }

    if (!asset) {
        return {
            src: DEFAULT_COVERS[type],
            blurDataURL: '',
            width: 700,
            height: 350,
        }
    }

    return {
        src: asset.remotePath,
        blurDataURL: asset.blurDataURL,
        width: asset.width,
        height: asset.height,
    }
}

export function resolveInlineAsset(
    type: ContentType,
    slug: string,
    reference: string
): MediaAsset | null {
    if (
        !reference ||
        reference.startsWith('/') ||
        reference.startsWith('#') ||
        /^[a-z][a-z0-9+.-]*:/i.test(reference)
    ) {
        return null
    }

    return lookupAsset(type, slug, reference)?.asset ?? null
}
