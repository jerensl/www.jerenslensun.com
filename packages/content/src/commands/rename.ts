import fs from 'node:fs/promises'
import path from 'node:path'
import { counterpartSlug, stripLanguagePrefix } from '../links.js'
import {
    removeFrontmatterValue,
    setFrontmatterValue,
} from '../frontmatter.js'
import { readMeta, writeMeta } from '../manifest.js'
import { getPaths } from '../paths.js'
import { listPosts, pathExists } from '../posts.js'
import type { ContentType } from '../types.js'

export interface RenameOptions {
    type: ContentType
    dryRun: boolean
}

export interface RenameResult {
    renamedAssets: boolean
    touchedTranslations: string[]
    touchedLinks: number
}

export async function renamePost(
    oldSlug: string,
    newSlug: string,
    options: RenameOptions
): Promise<RenameResult> {
    const paths = getPaths()
    const posts = await listPosts(options.type)
    const post = posts.find((entry) => entry.slug === oldSlug)

    if (!post) {
        throw new Error(`No ${options.type} post named "${oldSlug}"`)
    }

    const oldFile = post.file
    const newFile = path.join(path.dirname(oldFile), `${newSlug}.mdx`)

    if (await pathExists(newFile)) {
        throw new Error(`"${newSlug}" already exists`)
    }

    const oldAssets = post.assetsDir
    const newAssets = path.join(paths.images, options.type, newSlug)
    const result: RenameResult = {
        renamedAssets: await pathExists(oldAssets),
        touchedTranslations: [],
        touchedLinks: 0,
    }

    if (options.dryRun) {
        return result
    }

    await fs.rename(oldFile, newFile)

    if (result.renamedAssets) {
        await fs.rename(oldAssets, newAssets)

        const meta = await readMeta(newAssets)

        if (meta) {
            await writeMeta(newAssets, { ...meta, slug: newSlug })
        }
    }

    const baseChanged =
        stripLanguagePrefix(oldSlug) !== stripLanguagePrefix(newSlug)
    const counterpart = counterpartSlug(oldSlug)

    if (baseChanged && counterpart) {
        const counterpartPost = posts.find((entry) => entry.slug === counterpart)

        if (counterpartPost) {
            let raw = counterpartPost.raw
            const explicit =
                typeof counterpartPost.data.translation === 'string'
                    ? counterpartPost.data.translation
                    : undefined

            if (explicit === oldSlug) {
                raw = setFrontmatterValue(raw, 'translation', newSlug)
            } else if (!explicit) {
                // The filename convention no longer links the pair, so make it
                // explicit instead of losing the language switch.
                raw = setFrontmatterValue(raw, 'translation', newSlug)
            }

            if (raw !== counterpartPost.raw) {
                await fs.writeFile(counterpartPost.file, raw, 'utf8')
                result.touchedTranslations.push(counterpartPost.slug)
            }
        }
    }

    const renamed = posts.find((entry) => entry.slug === oldSlug)
    let renamedRaw = await fs.readFile(newFile, 'utf8')

    // Remove an override that is no longer needed after the rename.
    const renamedExplicit =
        typeof renamed?.data.translation === 'string'
            ? renamed.data.translation
            : undefined

    if (renamedExplicit && counterpartSlug(newSlug) === renamedExplicit) {
        renamedRaw = removeFrontmatterValue(renamedRaw, 'translation')
    }

    await fs.writeFile(newFile, renamedRaw, 'utf8')

    const allPosts = [
        ...(await listPosts('blog')),
        ...(await listPosts('project')),
    ]

    for (const entry of allPosts) {
        const raw = await fs.readFile(entry.file, 'utf8')
        const updated = raw.replaceAll(
            `/${options.type}/${oldSlug}`,
            `/${options.type}/${newSlug}`
        )

        if (updated !== raw) {
            await fs.writeFile(entry.file, updated, 'utf8')
            result.touchedLinks += 1
        }
    }

    return result
}
