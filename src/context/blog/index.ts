import path from 'path'
import matter from 'gray-matter'
import timeToRead, { IReadTimeResults } from 'reading-time'
import { bundleMDX } from 'mdx-bundler'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlightCode from '../../lib/rehype-highlight-code'
import rehypeMetaAttribute from '../../lib/rehype-meta-attribute'
import Content from '../content'
import { getPlaiceholder } from 'plaiceholder'

export interface Metadata {
    title: string
    date: string
    isPublished: boolean
    description: string
    slug?: string
    cover: string
    fileName?: string
    tags: string[]
    blurDataURL?: string
    readTime?: IReadTimeResults
}

export default class Blog extends Content {
    private tags: Array<string> = []
    constructor(directory: string) {
        super()
        this.directory = directory
    }

    private sortByDate(
        content: Array<Metadata | void>
    ): Array<Metadata | void> {
        return content.sort(
            (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date)
        )
    }

    private getAllTags(contents: Array<Metadata | void>) {
        const tags = new Set<string>()
        for (const post of contents) {
            for (const tag of post?.tags ?? []) {
                tags.add(tag)
            }
        }

        this.tags = Array.from(tags)
    }

    get getTags(): string[] {
        return this.tags
    }

    get allArticle(): string[] {
        return this.getAllFile()
    }

    async getAllPublishArticle(): Promise<Array<Metadata | void>> {
        const files = this.getAllFile()

        const allMetadata = await Promise.all<Metadata | void>(
            files.map(async (fileName) => {
                const source = this.getFileContentByName(`${fileName}.mdx`)
                const { data, content } = matter(source)
                const { base64 } = await getPlaiceholder(
                    `https://ik.imagekit.io/jerensl/tr:di-default-content_jXeDNogri.jpg/${data.cover}`,
                    { size: 10 }
                )

                const readTime = timeToRead(content)

                if (data.isPublished) {
                    return {
                        title: data.title,
                        date: data.date,
                        isPublished: data.isPublished,
                        description: data.description,
                        cover: data.cover,
                        fileName: fileName,
                        tags: data.tags,
                        readTime: readTime,
                        slug: fileName,
                        blurDataURL: base64 ?? null,
                    }
                }
            })
        )

        this.getAllTags(allMetadata)

        const allContent = this.sortByDate(allMetadata.filter((data) => data))

        return allContent
    }

    async getArticleWithMetadata(fileName: string | string[] | undefined) {
        const file = `${fileName}.mdx`

        const source = this.getFileContentByName(file)

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
}
