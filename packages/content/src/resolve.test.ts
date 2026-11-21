import assert from 'node:assert/strict'
import test from 'node:test'
import { buildCdnPath, buildLocalPath, sanitizeFileName } from './assets.js'
import { findAsset, findCover } from './resolve.js'
import type { MediaAsset, MediaMeta } from './types.js'

function asset(file: string, remotePath: string): MediaAsset {
    return {
        file,
        sha256: 'a'.repeat(64),
        width: 100,
        height: 50,
        blurDataURL: '',
        remotePath,
        provider: 'local',
        bytes: 1,
    }
}

function meta(slug: string, assets: Record<string, MediaAsset>): MediaMeta {
    return { version: 1, type: 'blog', slug, assets }
}

test('sanitizes asset file names', () => {
    assert.equal(sanitizeFileName('my chart (1).png'), 'my-chart-1-.png')
    assert.equal(sanitizeFileName('cover.webp'), 'cover.webp')
})

test('builds deterministic CDN paths', () => {
    assert.equal(
        buildCdnPath('blog/en-foo', 'cover.webp', 'abcdef1234567890'),
        'blog/en-foo/abcdef123456-cover.webp'
    )
    assert.equal(
        buildCdnPath('shared', 'cover.webp', 'abcdef1234567890'),
        'shared/abcdef123456-cover.webp'
    )
})

test('builds local public paths', () => {
    assert.equal(
        buildLocalPath('blog/en-foo', 'cover.webp'),
        '/images/content/blog/en-foo/cover.webp'
    )
    assert.equal(
        buildLocalPath('shared', 'cover.webp'),
        '/images/content/shared/cover.webp'
    )
})

test('resolves a default cover by convention', () => {
    const post = meta('en-foo', {
        'cover.webp': asset('cover.webp', '/images/content/blog/en-foo/cover.webp'),
    })

    assert.equal(findCover(post, null)?.key, 'cover.webp')
})

test('resolves shared covers through an explicit override', () => {
    const post = meta('en-foo', {})
    const shared = meta('shared', {
        'speed.webp': asset('speed.webp', '/images/content/shared/speed.webp'),
    })

    assert.equal(findCover(post, shared, 'shared/speed.webp')?.asset.file, 'speed.webp')
})

test('resolves inline images by basename', () => {
    const post = meta('en-foo', {
        'chart.webp': asset('chart.webp', '/images/content/blog/en-foo/chart.webp'),
    })

    assert.equal(findAsset(post, null, 'chart.webp')?.key, 'chart.webp')
})
