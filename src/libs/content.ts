import fs from 'fs'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlightCode from './mdx-plugins/rehype-highlight-code'
import rehypeMetaAttribute from './mdx-plugins/rehype-meta-attribute'
import rehypeTOC from './mdx-plugins/rehype-toc'
import matter from 'gray-matter'
import { getPlaiceholder } from 'plaiceholder'
import { IBlogMetadata } from '@/types/blog'
import { IMetadata } from '@/types/content'

export const getFiles = (dir: string): string[] => {
    const fileDirectory = path.join(process.cwd(), 'contents', dir)

    if (!fs.existsSync(fileDirectory)) {
        throw new Error('You are using the empty directory')
    }

    const readFolderDirectory = fs.readdirSync(fileDirectory)

    return readFolderDirectory.map((file) => file.replace(/\.mdx/, ''))
}

const getFileByName = (dir: string, fileName: string): string => {
    const sourceFile = path.join(process.cwd(), 'contents', dir, fileName)

    if (!fs.existsSync(sourceFile)) {
        throw new Error('File cannot be found')
    }

    const readFileDirectory = fs.readFileSync(sourceFile, 'utf8')

    return readFileDirectory
}

export const getContentByName = async (type: string, slug: string) => {
    const remarkPlugins = [remarkMath]
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
            const { data } = matter(source)

            let defaultContent = ''

            if (directory === 'blog') {
                defaultContent = 'default-content.webp'
            } else if (directory === 'project') {
                defaultContent = 'project-default.webp'
            } else {
                defaultContent = 'default-content.webp'
            }

            const buffer = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGES_CDN}/tr:di-project-default.webp/${data.cover}?tr=bl-10`
            ).then(async (res) => Buffer.from(await res.arrayBuffer()))

            const { base64 } = await getPlaiceholder(buffer)

            return {
                ...data,
                slug: fileName,
                blurDataURL: base64,
            } as T
        })
    )

    return contents
        .filter((data) => {
            return data.isPublished === true
        })
        .sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date)
        })
}

export const getContent = async (
    directory: string,
    fileName: string | string[] | undefined
) => {
    const file = `${fileName}.mdx`

    const source = getFileByName(directory, file)

    const remarkPlugins = [remarkMath]
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

    const buffer = await fetch(
        `${process.env.NEXT_PUBLIC_IMAGES_CDN}/tr:di-project-default.webp/${frontmatter.cover}?tr=bl-10`
    ).then(async (res) => Buffer.from(await res.arrayBuffer()))

    const { base64 } = await getPlaiceholder(buffer)

    return {
        code,
        frontmatter,
        metadata: {
            slug: fileName,
            fileName: file,
            blurDataURL: base64,
        },
    }
}

function getTags(contents: Array<IBlogMetadata>) {
    const tags = new Set<string>()
    for (const post of contents) {
        for (const tag of post?.tags ?? []) {
            tags.add(tag)
        }
    }

    return Array.from(tags)
}

export { getTags, getContents }
