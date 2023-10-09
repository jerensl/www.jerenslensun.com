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
import TableOfContent from '@/components/tableOfContent'
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
            <main className="py-10 lg:grid lg:grid-cols-[1fr_auto] lg:grid-rows-[1fr_min-content] lg:gap-2 spa max-w-5xl m-auto">
                <article
                    id="mdx"
                    className="prose max-w-none dark:prose-invert prose-p:font-normal prose-li:font-normal mx-auto w-full lg:prose-lg m-auto"
                >
                    <Component components={components} />
                </article>
                <aside className="py-10">
                    <div className="sticky top-36">
                        <TableOfContent toc={toc} />
                    </div>
                </aside>
            </main>
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
