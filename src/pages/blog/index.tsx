import { GetStaticProps, InferGetStaticPropsType } from 'next'
import BlogContext from '../../context/blog/index'
import { Footer } from '../../components/footer'
import { Seo } from '../../components/seo'
import { Layout } from '../../components/blog/layout'
import { Notifications } from '../../components/notifications'

export const getStaticProps: GetStaticProps = async () => {
    const post = new BlogContext('contents/blog')
    const posts = await post.getAllPublishArticle()
    const tags = post.getTags

    return {
        props: { posts, tags },
    }
}

export default function Blog({
    posts,
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/blog" />
            <Notifications />
            <main className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Blog</h1>
                    <p className="mb-4">Our latest articles for developers</p>
                </div>
                <Layout posts={posts} tags={tags} />
                <div className="h-56 lg:h-64" />
            </main>
            <Footer />
        </>
    )
}
