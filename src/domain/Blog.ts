import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'

const rootDirectory = process.cwd()

export interface Metadata {
    title: string
    date: string
    draft: boolean
    summary: string
    slug: string
    cover: string
    fileName: string
}

type Sort = (listOfContent: Array<Metadata>) => Array<Metadata>

export function getListOfArticle(directory: string) {
    const dir = path.join(rootDirectory, directory)
    if (!fs.existsSync(dir)) {
        throw new Error('You are using the wrong directory')
    }

    const listofArticle = fs.readdirSync(dir)

    return listofArticle.map((file) => file.replace(/\.mdx/, ''))
}

export function sortByLatestDate(
    listOfContent: Array<Metadata>
): Array<Metadata> {
    return listOfContent.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

export function getArticleByName(directory: string, fileName: string) {
    const source = path.join(rootDirectory, directory, fileName)

    if (!fs.existsSync(source)) {
        throw new Error('File markdown not found')
    }

    return fs.readFileSync(source, 'utf8')
}

export async function getAllPublishArticle(
    directory: string,
    sort: Sort
): Promise<Array<Metadata>> {
    const files = getListOfArticle(directory)

    const allMetadata: Array<any> = []

    files.map((fileName) => {
        const source = getArticleByName(directory, `${fileName}.mdx`)
        const { data } = matter(source)
        if (!data.draft) {
            allMetadata.push({ ...data, slug: fileName })
        }
    })

    sort(allMetadata)

    return allMetadata
}

export const getArticleWithMetadata = async (
    directory: string,
    fileName: string | string[] | undefined
) => {
    const file = `${fileName}.mdx`

    const source = getArticleByName(directory, file)

    const { data, content } = matter(source)

    const remarkPlugins: any = [remarkMath]
    const rehypePlugins: any = [rehypeHighlight, rehypeKatex]

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

    const { code, frontmatter } = await bundleMDX(source, {
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
        metadata: {
            slug: fileName,
            fileName: file,
            ...data,
        },
    }
}
