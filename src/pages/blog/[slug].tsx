import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { getArticleWithMetadata, getListOfArticle } from '../../domain/Blog'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { Navbar } from '../../components/Navbar'

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
                <article className="prose lg:prose-lg m-auto">
                    <Component />
                </article>
            </main>
        </div>
    )
}
