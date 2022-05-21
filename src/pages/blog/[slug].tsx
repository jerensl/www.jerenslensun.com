import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { Footer } from '../../components/Footer'
import { Article } from '../../components/blog/Content'
import BlogContext from '../../context/blog/index'

export const getStaticPaths: GetStaticPaths = async () => {
    const post = new BlogContext('contents/blog')
    const posts = post.allArticle

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
    const post = new BlogContext('contents/blog')
    const posts = await post.getArticleWithMetadata(context.params?.slug)

    return {
        props: { posts, blurDataURL: posts.metadata.blurDataURL },
    }
}

export default function Blog({
    posts,
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = posts

    return (
        <>
            <Article
                frontmatter={frontmatter}
                code={code}
                blurDataURL={blurDataURL}
            />
            <div className="h-56 lg:h-64" />
            <Footer />
        </>
    )
}
