import { useEffect, useMemo, useState } from 'react'
import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import Image from 'next/image'
import { format } from 'date-fns'
import { getMDXComponent } from 'mdx-bundler/client'
import { Footer } from '@/components/Footer'
import { ArticleSeo } from '@/components/Seo'
import { components } from '@/components/Components'
import TableOfContent from '@/components/TOC'
import { getContent, getFiles } from '@/libs/content'
import { MDXTitleHeadingLevels } from '@/types/content'
import { imageLoader } from '@/constant/images'

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getFiles('blog')

    return {
        paths: posts.map((fileName) => ({
            params: {
                slug: fileName,
            },
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext
) => {
    const posts = await getContent('blog', context.params?.slug)

    return {
        props: { posts, blurDataURL: posts.metadata.blurDataURL },
    }
}

export default function Blog({
    posts,
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = posts
    const Component = useMemo(() => getMDXComponent(code), [code])
    const [toc, setToc] = useState<
        Array<{ id: string; text: string; level: MDXTitleHeadingLevels }>
    >([])

    useEffect(() => {
        const mdx = document.getElementById('mdx')
        const selector = mdx?.querySelectorAll('h2, h3')
        const tableOfContent: Array<{
            id: string
            text: string
            level: MDXTitleHeadingLevels
        }> = []
        selector?.forEach((heading) => {
            tableOfContent.push({
                id: heading.id,
                text: heading?.textContent ?? '',
                level: heading.tagName as MDXTitleHeadingLevels,
            })
        })
        setToc(tableOfContent)
    }, [frontmatter.slug])

    return (
        <>
            <ArticleSeo
                path={frontmatter.title}
                title={frontmatter.title}
                description={frontmatter.description}
                image={`https://res.cloudinary.com/do9os7lxv/image/upload/v1655199836/personal/${frontmatter.cover}`}
            />
            <header className="pt-20 text-center">
                <h1 className="m-auto p-4 text-3xl font-bold max-w-4xl">
                    {frontmatter.title}
                </h1>
                <p className="text-xl pt-1 pb-2 font-medium">
                    {format(new Date(frontmatter.date), 'MMMM dd, yyyy')}
                </p>
                <Image
                    loader={imageLoader}
                    src={frontmatter.cover}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    alt="Person"
                    height="350"
                    width="700"
                    className="object-cover m-auto"
                />
            </header>
            <main className="py-10 flex flex-col max-w-7xl sm:flex-row-reverse m-auto">
                <aside className="py-10 w-[350px]">
                    <div className="sm:sticky top-36 sm:flex">
                        <TableOfContent toc={toc} />
                    </div>
                </aside>
                <article
                    id="mdx"
                    className="prose mx-4 sm:mx-0 sm:ml-20 flex-1 max-w-4xl m-auto dark:prose-invert prose-p:font-normal prose-li:font-normal lg:prose-lg"
                >
                    <Component components={components} />
                </article>
            </main>
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
