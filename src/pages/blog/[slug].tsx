import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { getListOfArticle } from '../../domain/Blog'
import { getArticleWithMetadata } from '../../domain/Article'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Article } from '../../components/Article'

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

    return (
        <>
            <Navbar />
            <Article frontmatter={frontmatter} code={code} />
            <Footer />
        </>
    )
}
