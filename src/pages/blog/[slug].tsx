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
    const { code } = posts

    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <div>
            <Navbar />
            <main className="pt-20 font-medium px-10">
                <article className="prose max-w-4xl lg:prose-lg m-auto">
                    <Component components={components} />
                </article>
            </main>
            <Footer />
        </div>
    )
}
