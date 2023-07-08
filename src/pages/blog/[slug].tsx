import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { Footer } from '../../components/Footer'
import { Article } from '../../components/blog/content'
import { ArticleSeo } from '../../components/Seo'
import { getContent, getFiles } from '@/libs/content'

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
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
