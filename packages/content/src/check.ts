import fs from 'node:fs/promises'
import path from 'node:path'
import {
    blogFrontmatterKeys,
    blogFrontmatterSchema,
    projectFrontmatterKeys,
    projectFrontmatterSchema,
} from './schema.js'
import { getPaths } from './paths.js'
import { listPosts } from './posts.js'
import { readMeta } from './manifest.js'
import { findAsset, findCover } from './resolve.js'
import { sha256, listImageFiles } from './assets.js'
import {
    checkReciprocity,
    counterpartSlug,
    detectLanguage,
    resolveTranslation,
} from './links.js'
import type { ContentType, MediaMeta, PostFile } from './types.js'

export interface CheckResult {
    errors: string[]
    warnings: string[]
}

interface CheckedPost {
    post: PostFile
    meta: MediaMeta | null
}

export async function runCheck(): Promise<CheckResult> {
    const result: CheckResult = { errors: [], warnings: [] }
    const [blog, project] = await Promise.all([
        listPosts('blog'),
        listPosts('project'),
    ])
    const sharedMeta = await readMeta(getPaths().shared)
    const allPosts = [...blog, ...project]
    const byType: Record<ContentType, Map<string, PostFile>> = {
        blog: new Map(blog.map((post) => [post.slug, post])),
        project: new Map(project.map((post) => [post.slug, post])),
    }
    const checked: CheckedPost[] = []

    for (const post of allPosts) {
        const label = `${post.type}/${post.slug}`
        const parsed = validateFrontmatter(post, result, label)
        const meta = await checkMedia(post, sharedMeta, result, label)

        checked.push({ post, meta })

        if (!parsed) {
            continue
        }

        checkTranslation(post, parsed, byType[post.type], result, label)
        checkInlineImages(post, meta, sharedMeta, result, label)
        checkUnknownKeys(post, parsed, result, label)
    }

    checkDuplicateRemotePaths(checked, result)
    await checkOrphanFolders(allPosts, result)

    return result
}

function validateFrontmatter(
    post: PostFile,
    result: CheckResult,
    label: string
): Record<string, unknown> | null {
    const schema =
        post.type === 'blog'
            ? blogFrontmatterSchema
            : projectFrontmatterSchema
    const parsed = schema.safeParse(post.data)

    if (!parsed.success) {
        for (const issue of parsed.error.issues) {
            result.errors.push(
                `${label}: frontmatter.${issue.path.join('.') || '(root)'} ${
                    issue.message
                }`
            )
        }

        return post.data
    }

    return parsed.data
}

async function checkMedia(
    post: PostFile,
    sharedMeta: MediaMeta | null,
    result: CheckResult,
    label: string
): Promise<MediaMeta | null> {
    const meta = await readMeta(post.assetsDir)
    const files = await listImageFilesSafe(post.assetsDir)

    if (!meta && files.length > 0) {
        result.errors.push(
            `${label}: assets exist but meta.json is missing; run content sync`
        )

        return null
    }

    if (meta) {
        for (const [key, asset] of Object.entries(meta.assets)) {
            const file = path.join(post.assetsDir, key)

            if (!files.includes(key)) {
                result.errors.push(`${label}: meta references missing file ${key}`)
                continue
            }

            const buffer = await fs.readFile(file)
            const hash = sha256(buffer)

            if (hash !== asset.sha256) {
                result.errors.push(
                    `${label}: meta is stale for ${key}; run content sync`
                )
            }

            if (!asset.remotePath) {
                result.errors.push(`${label}: ${key} has no remotePath`)
            }

            if (asset.provider === 'local') {
                result.warnings.push(
                    `${label}: ${key} is served from local files; run content sync --upload to publish it`
                )
            }
        }

        for (const file of files) {
            if (!meta.assets[file]) {
                result.warnings.push(
                    `${label}: ${file} is not tracked in meta.json; run content sync`
                )
            }
        }
    }

    const coverValue =
        typeof post.data.cover === 'string' ? post.data.cover : undefined
    const cover = findCover(meta, sharedMeta, coverValue)

    if (coverValue && !cover) {
        result.errors.push(
            `${label}: cover "${coverValue}" was not found in local assets`
        )
    } else if (!cover) {
        result.warnings.push(
            `${label}: no cover asset; the default cover will be used`
        )
    }

    return meta
}

function checkTranslation(
    post: PostFile,
    data: Record<string, unknown>,
    siblings: Map<string, PostFile>,
    result: CheckResult,
    label: string
): void {
    const explicit =
        typeof data.translation === 'string' ? data.translation : undefined
    const resolution = resolveTranslation(
        post.slug,
        explicit,
        new Set(siblings.keys())
    )

    if (resolution.error) {
        result.errors.push(`${label}: ${resolution.error}`)

        return
    }

    if (!resolution.target) {
        return
    }

    const counterpart = siblings.get(resolution.target)

    if (!counterpart) {
        result.errors.push(
            `${label}: translation "${resolution.target}" does not exist`
        )

        return
    }

    const counterpartExplicit =
        typeof counterpart.data.translation === 'string'
            ? counterpart.data.translation
            : undefined
    const counterpartDerived = counterpartSlug(counterpart.slug) ?? undefined
    const problem = checkReciprocity(
        post.slug,
        resolution.target,
        counterpartExplicit,
        counterpartDerived
    )

    if (problem) {
        result.errors.push(`${label}: ${problem}`)
    }

    if (detectLanguage(post.slug) === detectLanguage(resolution.target)) {
        result.errors.push(
            `${label}: translation "${resolution.target}" is not in the other language`
        )
    }
}

function checkInlineImages(
    post: PostFile,
    postMeta: MediaMeta | null,
    sharedMeta: MediaMeta | null,
    result: CheckResult,
    label: string
): void {
    for (const reference of extractImageReferences(post.content)) {
        if (isExternal(reference)) {
            continue
        }

        if (reference.startsWith('/images/')) {
            continue
        }

        const asset = findAsset(postMeta, sharedMeta, reference)

        if (!asset) {
            result.errors.push(
                `${label}: inline image "${reference}" was not found in local assets`
            )
        }
    }
}

function checkUnknownKeys(
    post: PostFile,
    data: Record<string, unknown>,
    result: CheckResult,
    label: string
): void {
    const allowed =
        post.type === 'blog' ? blogFrontmatterKeys : projectFrontmatterKeys

    for (const key of Object.keys(data)) {
        if (!allowed.has(key)) {
            result.warnings.push(`${label}: unknown frontmatter key "${key}"`)
        }
    }
}

function checkDuplicateRemotePaths(
    posts: CheckedPost[],
    result: CheckResult
): void {
    const seen = new Map<string, string>()

    for (const { post, meta } of posts) {
        for (const [key, asset] of Object.entries(meta?.assets ?? {})) {
            const identity = `${asset.sha256}:${asset.provider}`
            const previous = seen.get(asset.remotePath)

            if (previous && previous !== identity) {
                result.warnings.push(
                    `${post.type}/${post.slug}: ${key} reuses remotePath "${asset.remotePath}" with different content`
                )
            } else {
                seen.set(asset.remotePath, identity)
            }
        }
    }
}

async function checkOrphanFolders(
    posts: PostFile[],
    result: CheckResult
): Promise<void> {
    const paths = getPaths()
    const known = new Set(posts.map((post) => `${post.type}/${post.slug}`))

    for (const type of ['blog', 'project'] as const) {
        const directory = path.join(paths.images, type)

        let entries: string[]

        try {
            entries = await fs.readdir(directory)
        } catch {
            continue
        }

        for (const entry of entries) {
            if (!known.has(`${type}/${entry}`)) {
                result.warnings.push(
                    `images/${type}/${entry}: asset folder has no matching post`
                )
            }
        }
    }
}

export function extractImageReferences(markdown: string): string[] {
    const references = new Set<string>()
    const markdownImage = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/g
    const htmlImage = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi

    for (const match of markdown.matchAll(markdownImage)) {
        if (match[1]) {
            references.add(match[1])
        }
    }

    for (const match of markdown.matchAll(htmlImage)) {
        if (match[1]) {
            references.add(match[1])
        }
    }

    return [...references]
}

function isExternal(reference: string): boolean {
    return (
        /^[a-z][a-z0-9+.-]*:/i.test(reference) ||
        reference.startsWith('//') ||
        reference.startsWith('#')
    )
}

async function listImageFilesSafe(dir: string): Promise<string[]> {
    return listImageFiles(dir)
}
