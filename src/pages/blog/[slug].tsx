import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { getListOfArticle } from '../../domain/Blog'
import { getArticleWithMetadata } from '../../domain/Article'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { Navbar } from '../../components/Navbar'
import { components } from '../../components/components'
import { Footer } from '../../components/Footer'
import { ArticleSeo } from '../../components/Seo'

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getListOfArticle('contents')

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
    const posts = await getArticleWithMetadata('contents', context.params?.slug)

    return {
        props: { posts },
    }
}

export default function Blog({
    posts,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = posts

    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <>
            <ArticleSeo
                path={frontmatter.title}
                title={frontmatter.title}
                description={frontmatter.summary}
            />
            <Navbar />
            <header className="pt-20 text-center">
                <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
                <p className="text-xl pt-1 font-medium">{frontmatter.date}</p>
            </header>
            <main className="min-h-9/10 pt-10 font-medium px-10">
                <article className="prose max-w-4xl lg:prose-lg m-auto">
                    <Component components={components} />
                </article>
            </main>
            <Footer />
        </>
    )
}
