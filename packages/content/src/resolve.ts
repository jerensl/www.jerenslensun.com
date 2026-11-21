import type { MediaAsset, MediaMeta } from './types.js'

export interface ResolvedAsset {
    key: string
    asset: MediaAsset
    scope: 'post' | 'shared'
}

export function findAssetByKey(
    meta: MediaMeta | null,
    key: string
): MediaAsset | undefined {
    if (!meta) {
        return undefined
    }

    const normalized = key.replace(/^\.\//, '')

    return meta.assets[normalized] ?? meta.assets[decodeURIComponent(normalized)]
}

export function findByBasename(
    meta: MediaMeta | null,
    fileName: string
): MediaAsset | undefined {
    if (!meta) {
        return undefined
    }

    const basename = fileName.split('/').pop() ?? fileName

    if (meta.assets[basename]) {
        return meta.assets[basename]
    }

    const match = Object.entries(meta.assets).find(
        ([key]) => key.split('/').pop() === basename
    )

    return match?.[1]
}

export function findAsset(
    postMeta: MediaMeta | null,
    sharedMeta: MediaMeta | null,
    reference: string
): ResolvedAsset | null {
    const normalized = reference.replace(/^\.\//, '')

    if (normalized.startsWith('shared/')) {
        const key = normalized.slice('shared/'.length)
        const asset = findAssetByKey(sharedMeta, key)

        return asset ? { key, asset, scope: 'shared' } : null
    }

    const direct = findAssetByKey(postMeta, normalized)

    if (direct) {
        return { key: normalized, asset: direct, scope: 'post' }
    }

    const byBasename = findByBasename(postMeta, normalized)

    if (byBasename) {
        return {
            key:
                Object.entries(postMeta?.assets ?? {}).find(
                    ([, value]) => value === byBasename
                )?.[0] ?? normalized,
            asset: byBasename,
            scope: 'post',
        }
    }

    const shared = findByBasename(sharedMeta, normalized)

    if (shared) {
        return {
            key:
                Object.entries(sharedMeta?.assets ?? {}).find(
                    ([, value]) => value === shared
                )?.[0] ?? normalized,
            asset: shared,
            scope: 'shared',
        }
    }

    return null
}

export function findCover(
    postMeta: MediaMeta | null,
    sharedMeta: MediaMeta | null,
    override?: string
): ResolvedAsset | null {
    if (override) {
        return findAsset(postMeta, sharedMeta, override)
    }

    if (!postMeta) {
        return null
    }

    const coverKey = Object.keys(postMeta.assets)
        .sort()
        .find((key) => /^cover\.[A-Za-z0-9]+$/.test(key))

    if (!coverKey) {
        return null
    }

    return {
        key: coverKey,
        asset: postMeta.assets[coverKey] as MediaAsset,
        scope: 'post',
    }
}
