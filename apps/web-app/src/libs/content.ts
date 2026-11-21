import fs from 'fs'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlightCode from './mdx-plugins/rehype-highlight-code'
import rehypeMetaAttribute from './mdx-plugins/rehype-meta-attribute'
import rehypeTOC from './mdx-plugins/rehype-toc'
import matter from 'gray-matter'
import { IBlogMetadata } from '@/types/blog'
import { ContentType, IMetadata } from '@/types/content'
import { contentDir } from '@jerensl/content-data'
import { getPostLanguage } from './localization'
import { getReadingTime } from './reading'
import { normalizeTags } from './tags'
import { resolveCover } from './media'
import remarkLocalImages from './mdx-plugins/remark-local-images'

export const getFiles = (dir: string): string[] => {
    const fileDirectory = path.join(contentDir, dir)

    if (!fs.existsSync(fileDirectory)) {
        throw new Error('You are using the empty directory')
    }

    const readFolderDirectory = fs.readdirSync(fileDirectory)

    return readFolderDirectory
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx/, ''))
}

const asContentType = (directory: string): ContentType =>
    directory === 'project' ? 'project' : 'blog'

const getFileByName = (dir: string, fileName: string): string => {
    const sourceFile = path.join(contentDir, dir, fileName)

    if (!fs.existsSync(sourceFile)) {
        throw new Error('File cannot be found')
    }

    const readFileDirectory = fs.readFileSync(sourceFile, 'utf8')

    return readFileDirectory
}

export const getContentByName = async (type: string, slug: string) => {
    const contentType = asContentType(type)
    const remarkPlugins = [
        [remarkLocalImages, { type: contentType, slug }],
        remarkMath,
    ]
    const rehypePlugins = [
        rehypeMetaAttribute,
        rehypeHighlightCode,
        rehypeKatex,
        rehypeTOC,
    ]

    const source = getFileByName(type, slug)

    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }

    const { code, frontmatter } = await bundleMDX({
        source: source,
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                ...remarkPlugins,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                ...rehypePlugins,
            ]

            return options
        },
    })

    return {
        code,
        frontmatter,
    }
}

async function getContents<T extends IMetadata>(
    directory: string
): Promise<Array<T>> {
    const files = getFiles(directory)

    const contents = await Promise.all<T>(
        files.map(async (fileName) => {
            const source = getFileByName(directory, `${fileName}.mdx`)
            const { data, content } = matter(source)

            const metadata = {
                ...data,
                ...(Array.isArray(data.tags)
                    ? { tags: normalizeTags(data.tags as string[]) }
                    : {}),
                language: getPostLanguage({
                    slug: fileName,
                    language: data.language,
                }),
                readTime: getReadingTime(content),
            }

            const contentType = asContentType(directory)
            const cover = resolveCover(
                contentType,
                fileName,
                typeof data.cover === 'string' ? data.cover : undefined
            )

            return {
                ...metadata,
                cover: cover.src,
                slug: fileName,
                ...(cover.blurDataURL
                    ? { blurDataURL: cover.blurDataURL }
                    : {}),
            } as T
        })
    )

    return contents
        .filter((data) => {
            return data.isPublished === true
        })
        .sort((a, b) => {
            const aTime = Date.parse(a.date)
            const bTime = Date.parse(b.date)

            if (Number.isNaN(aTime) && Number.isNaN(bTime)) {
                return 0
            }

            if (Number.isNaN(aTime)) {
                return 1
            }

            if (Number.isNaN(bTime)) {
                return -1
            }

            return bTime - aTime
        })
}

export const getContent = async (
    directory: string,
    fileName: string | string[] | undefined
) => {
    const file = `${fileName}.mdx`
    const contentType = asContentType(directory)
    const slug =
        typeof fileName === 'string'
            ? fileName
            : (fileName?.find(Boolean) ?? undefined)

    const source = getFileByName(directory, file)
    const { content: sourceContent } = matter(source)

    const remarkPlugins = [
        [remarkLocalImages, { type: contentType, slug: slug ?? '' }],
        remarkMath,
    ]
    const rehypePlugins = [
        rehypeMetaAttribute,
        rehypeHighlightCode,
        rehypeKatex,
        rehypeTOC,
    ]

    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'esbuild.exe'
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }

    const { code, frontmatter } = await bundleMDX({
        source: source,
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                ...remarkPlugins,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                ...rehypePlugins,
            ]

            return options
        },
    })

    const cover = resolveCover(
        contentType,
        slug ?? '',
        typeof frontmatter.cover === 'string' ? frontmatter.cover : undefined
    )

    const metadata = {
        ...frontmatter,
        cover: cover.src,
        ...(Array.isArray(frontmatter.tags)
            ? { tags: normalizeTags(frontmatter.tags as string[]) }
            : {}),
        language: getPostLanguage({
            slug,
            language: frontmatter.language,
        }),
        readTime: getReadingTime(sourceContent),
    }

    return {
        code,
        frontmatter: metadata,
        metadata: {
            slug: fileName,
            fileName: file,
            blurDataURL: cover.blurDataURL || null,
        },
    }
}

function getTags(contents: Array<IBlogMetadata>) {
    const tags = new Set<string>()
    for (const post of contents) {
        for (const tag of normalizeTags(post?.tags)) {
            tags.add(tag)
        }
    }

    return Array.from(tags).sort()
}

export { getTags, getContents }
