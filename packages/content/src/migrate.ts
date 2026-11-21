import fs from 'node:fs/promises'
import path from 'node:path'
import { listImageFiles } from './assets.js'
import { extractImageReferences } from './check.js'
import {
    removeFrontmatterValue,
    setFrontmatterValue,
    writeRaw,
} from './frontmatter.js'
import { counterpartSlug } from './links.js'
import { listAllPosts, pathExists } from './posts.js'
import { getPaths } from './paths.js'
import { syncAll } from './sync.js'
import {
    cloudinaryBase,
    cloudinaryCovers,
} from './migrations/cloudinary-covers.js'
import type { PostFile } from './types.js'

export interface MigrateOptions {
    dryRun: boolean
}

export interface MigrateResult {
    restored: string[]
    missing: string[]
    inline: string[]
    warnings: string[]
}

export async function migrate(
    options: MigrateOptions
): Promise<MigrateResult> {
    const paths = getPaths()
    const posts = await listAllPosts()
    const result: MigrateResult = {
        restored: [],
        missing: [],
        inline: [],
        warnings: [],
    }
    const updates = new Map<string, string>()

    const groups = new Map<string, PostFile[]>()

    for (const post of posts) {
        const cover =
            typeof post.data.cover === 'string' ? post.data.cover : undefined

        if (!cover || cover.startsWith('shared/')) {
            continue
        }

        const group = groups.get(cover) ?? []
        group.push(post)
        groups.set(cover, group)
    }

    for (const [cover, group] of groups) {
        const shared = group.length > 1
        const source = cloudinaryCovers[cover] ?? null
        const extension = source
            ? path.extname(source)
            : path.extname(cover) || '.webp'
        const sharedName = `${path.basename(cover, path.extname(cover))}${extension}`

        let destination = shared
            ? path.join(paths.shared, sharedName)
            : path.join(group[0].assetsDir, `cover${extension}`)

        if (!(await pathExists(destination))) {
            const existingShared = shared
                ? await findExisting(paths.shared, sharedName)
                : undefined
            const existingPost = shared
                ? undefined
                : await findExisting(group[0].assetsDir, 'cover')

            destination = existingShared ?? existingPost ?? destination
        }

        let buffer: Buffer | null = null

        if (await pathExists(destination)) {
            buffer = await fs.readFile(destination)
        } else if (source) {
            try {
                buffer = await download(`${cloudinaryBase}/${source}`)

                if (!options.dryRun) {
                    await fs.mkdir(path.dirname(destination), { recursive: true })
                    await fs.writeFile(destination, buffer)
                }

                result.restored.push(
                    `${cover} -> ${path.relative(paths.contents, destination)}`
                )
            } catch (error) {
                result.missing.push(cover)
                result.warnings.push(
                    `${cover}: download failed (${(error as Error).message})`
                )
            }
        } else {
            result.missing.push(cover)
        }

        const localName = path.basename(destination)

        for (const post of group) {
            const raw = updates.get(post.file) ?? post.raw

            if (buffer && shared) {
                updates.set(
                    post.file,
                    setFrontmatterValue(raw, 'cover', `shared/${localName}`)
                )
            } else if (buffer) {
                updates.set(post.file, removeFrontmatterValue(raw, 'cover'))
            } else {
                updates.set(post.file, removeFrontmatterValue(raw, 'cover'))
            }
        }
    }

    // Legacy inline images lived in contents/images and were never copied into
    // the export. Move them into the shared asset bucket so they resolve via
    // the normal pipeline.
    for (const post of posts) {
        let raw = updates.get(post.file) ?? post.raw

        for (const reference of extractImageReferences(post.content)) {
            if (
                reference.startsWith('shared/') ||
                reference.startsWith('/') ||
                /^[a-z][a-z0-9+.-]*:/i.test(reference)
            ) {
                continue
            }

            const candidates = [
                path.join(paths.images, reference),
                path.join(post.assetsDir, reference),
                path.join(paths.shared, path.basename(reference)),
            ]
            const source = await firstExisting(candidates)

            if (!source) {
                result.warnings.push(
                    `${post.slug}: inline image "${reference}" has no local source`
                )
                continue
            }

            const destination = path.join(paths.shared, path.basename(reference))

            if (!(await pathExists(destination)) && !options.dryRun) {
                await fs.mkdir(path.dirname(destination), { recursive: true })
                await fs.copyFile(source, destination)
            }

            const replacement = `shared/${path.basename(reference)}`

            if (!post.raw.includes(replacement)) {
                raw = raw.replaceAll(`](${reference})`, `](${replacement})`)
                result.inline.push(`${post.slug}: ${reference} -> ${replacement}`)
            }
        }

        updates.set(post.file, raw)
    }

    // Drop translation fields that the en-/id- convention already derives.
    const slugs = new Set(posts.map((post) => post.slug))

    for (const post of posts) {
        const raw = updates.get(post.file) ?? post.raw
        const explicit =
            typeof post.data.translation === 'string'
                ? post.data.translation
                : undefined
        const derived = counterpartSlug(post.slug)

        if (explicit && derived && explicit === derived && slugs.has(derived)) {
            updates.set(post.file, removeFrontmatterValue(raw, 'translation'))
        }
    }

    if (!options.dryRun) {
        for (const [file, raw] of updates) {
            const original = posts.find((post) => post.file === file)

            if (original && raw !== original.raw) {
                writeRaw(file, raw)
            }
        }

        await syncAll({ upload: false, offline: true, dryRun: false })
    }

    return result
}

async function findExisting(
    directory: string,
    nameWithoutExtension: string
): Promise<string | undefined> {
    const files = await listImageFiles(directory)

    for (const file of files) {
        if (
            file === nameWithoutExtension ||
            file.startsWith(`${nameWithoutExtension}.`)
        ) {
            return path.join(directory, file)
        }
    }

    return undefined
}

async function firstExisting(
    candidates: string[]
): Promise<string | undefined> {
    for (const candidate of candidates) {
        if (await pathExists(candidate)) {
            return candidate
        }
    }

    return undefined
}

async function download(url: string, attempts = 3): Promise<Buffer> {
    let lastError: unknown

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 120_000)

        try {
            const response = await fetch(url, { signal: controller.signal })

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }

            const contentType = response.headers.get('content-type') ?? ''

            if (!contentType.startsWith('image/')) {
                throw new Error(`unexpected content type "${contentType}"`)
            }

            return Buffer.from(await response.arrayBuffer())
        } catch (error) {
            lastError = error
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
        } finally {
            clearTimeout(timeout)
        }
    }

    throw lastError instanceof Error
        ? lastError
        : new Error('download failed')
}
