import fs from 'fs'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlightCode from './rehype-highlight-code'
import rehypeMetaAttribute from './rehype-meta-attribute'
import matter from 'gray-matter'
import { getPlaiceholder } from 'plaiceholder'
import { IProjectMetadata } from '@/types/project'
import { IBlogMetadata } from '@/types/blog'

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
    const remarkPlugins: any = [remarkMath]
    const rehypePlugins: any = [
        rehypeMetaAttribute,
        rehypeHighlightCode,
        rehypeKatex,
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
        xdmOptions(options) {
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

async function getContents<T>(directory: string): Promise<Array<T>> {
    const files = getFiles(directory)

    const contents = await Promise.all<any | void>(
        files
            .map(async (fileName) => {
                const source = getFileByName(directory, `${fileName}.mdx`)
                const { data } = matter(source)
                const { base64 } = await getPlaiceholder(
                    `https://ik.imagekit.io/jerensl/tr:di-default-content_jXeDNogri.jpg/${data.cover}`,
                    { size: 10 }
                )

                return {
                    ...data,
                    slug: fileName,
                    blurDataURL: base64,
                } as IProjectMetadata | IBlogMetadata
            })
            .filter(async (data) => {
                return (await data).isPublished === true
            })
    )

    console.log('HELOOOOOOO')
    console.log(contents)

    return contents
}

export const getContent = async (
    directory: string,
    fileName: string | string[] | undefined
) => {
    const file = `${fileName}.mdx`

    const source = getFileByName(directory, file)

    const remarkPlugins: any = [remarkMath]
    const rehypePlugins: any = [
        rehypeMetaAttribute,
        rehypeHighlightCode,
        rehypeKatex,
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
        xdmOptions(options) {
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

    const { base64 } = await getPlaiceholder(
        `https://ik.imagekit.io/jerensl/tr:di-default-content_jXeDNogri.jpg/${frontmatter.cover}`,
        { size: 10 }
    )

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