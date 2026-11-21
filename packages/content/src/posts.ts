import fs from 'node:fs/promises'
import path from 'node:path'
import { getPaths } from './paths.js'
import { readPost } from './frontmatter.js'
import type { ContentType, PostFile } from './types.js'

export async function listPosts(type: ContentType): Promise<PostFile[]> {
    const paths = getPaths()
    const directory = type === 'blog' ? paths.blog : paths.project

    let entries: string[]

    try {
        entries = await fs.readdir(directory)
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return []
        }

        throw error
    }

    const slugs = entries
        .filter((entry) => entry.endsWith('.mdx'))
        .map((entry) => entry.replace(/\.mdx$/, ''))
        .sort()

    return Promise.all(
        slugs.map(async (slug) => {
            const file = path.join(directory, `${slug}.mdx`)
            const parsed = readPost(file)

            return {
                type,
                slug,
                file,
                assetsDir: path.join(paths.images, type, slug),
                data: parsed.data,
                content: parsed.content,
                raw: parsed.raw,
            } satisfies PostFile
        })
    )
}

export async function listAllPosts(): Promise<PostFile[]> {
    const [blog, project] = await Promise.all([
        listPosts('blog'),
        listPosts('project'),
    ])

    return [...blog, ...project]
}

export function postKey(post: Pick<PostFile, 'type' | 'slug'>): string {
    return `${post.type}:${post.slug}`
}

export async function pathExists(target: string): Promise<boolean> {
    try {
        await fs.access(target)

        return true
    } catch {
        return false
    }
}
