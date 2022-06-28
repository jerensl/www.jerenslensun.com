import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { Footer } from '../../components/footer'
import { Article } from '../../components/blog/content'
import BlogContext from '../../context/blog/index'
import { ArticleSeo } from '../../components/seo'

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
            <ArticleSeo
                path={frontmatter.title}
                title={frontmatter.title}
                description={frontmatter.description}
                image={`https://res.cloudinary.com/do9os7lxv/image/upload/v1655199836/personal/${frontmatter.cover}`}
            />
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
