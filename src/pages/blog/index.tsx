import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '../../components/Footer'
import { Seo } from '../../components/Seo'
import { Layout } from '../../components/blog/layout'
import { getContents, getTags } from '@/libs/content'
import { IBlogMetadata } from '@/types/blog'

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getContents<IBlogMetadata>('blog')

    const tags = getTags(posts)

    return {
        props: { posts: posts, tags },
    }
}

export default function Blog({
    posts,
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/blog" />
            <main className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Blog</h1>
                    <p className="mb-4">Our latest articles for developers</p>
                </div>
                <Layout posts={posts} tags={tags} />
            </main>
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
