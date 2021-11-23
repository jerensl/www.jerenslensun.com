import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlightCode from '../lib/rehype-highlight-code'
import rehypeMetaAttribute from '../lib/rehype-meta-attribute'
import { getArticleByName } from './Blog'

export const getArticleWithMetadata = async (
    directory: string,
    fileName: string | string[] | undefined
) => {
    const file = `${fileName}.mdx`

    const source = getArticleByName(directory, file)

    const { data, content } = matter(source)

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

    return {
        code,
        frontmatter,
        metadata: {
            slug: fileName,
            fileName: file,
        },
    }
}
