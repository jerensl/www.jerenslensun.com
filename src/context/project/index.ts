import { getPlaiceholder } from 'plaiceholder'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlightCode from '../../lib/rehype-highlight-code'
import rehypeMetaAttribute from '../../lib/rehype-meta-attribute'
import Content from '../content'

export interface ProjectMetadata {
    title: string
    status: string
    programming_languange: string[]
    cover: string
    description: string
    slug?: string
    isPublished: string
    fileName: string
    blurDataURL: string
    repo_url?: string
}

export default class Project extends Content {
    private lang: string[] = []
    constructor(directory: string) {
        super()
        this.directory = directory
    }

    async getAllPublishedProject() {
        const files = this.getAllFile()

        const allMetadata = await Promise.all<ProjectMetadata | void>(
            files.map(async (fileName) => {
                const source = this.getFileContentByName(`${fileName}.mdx`)
                const { data } = matter(source)
                const { base64 } = await getPlaiceholder(
                    `https://ik.imagekit.io/jerensl/tr:di-default-content_jXeDNogri.jpg/${data.cover}`,
                    { size: 10 }
                )

                if (data.isPublished) {
                    return {
                        title: data.title,
                        status: data.status,
                        isPublished: data.isPublished,
                        cover: data.cover,
                        description: data.description,
                        fileName: fileName,
                        programming_languange: data.programming_languange,
                        slug: fileName,
                        repo_url: data.repo_url,
                        blurDataURL: base64,
                    }
                }
            })
        )

        this.getAllProgrammingLanguange(allMetadata)

        return allMetadata.filter((data) => data)
    }

    getAllProgrammingLanguange(lang: Array<ProjectMetadata | void>) {
        const tags = new Set<string>()
        for (const post of lang) {
            for (const tag of post?.programming_languange ?? []) {
                tags.add(tag)
            }
        }

        this.lang = Array.from(tags)
    }

    get getLangs(): string[] {
        return this.lang
    }

    get allProject(): string[] {
        return this.getAllFile()
    }

    async getProjectDetail(fileName: string | string[] | undefined) {
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
