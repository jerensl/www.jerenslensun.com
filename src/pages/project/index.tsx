import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ProjectContext from '../../context/project/index'
import { Footer } from '../../components/Footer'
import { Seo } from '../../components/Seo'
import { Layout } from '../../components/project/Layout'
import { Notifications } from '../../components/Notifications'

export const getStaticProps: GetStaticProps = async () => {
    const post = new ProjectContext('contents/project')
    const posts = await post.getAllPublishedProject()
    const langs = post.getLangs

    return {
        props: { posts, langs },
    }
}

export default function Project({
    posts,
    langs,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/blog" />
            <Notifications />
            <main className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Project</h1>
                </div>
                <Layout project={posts} />
            </main>
            <Footer />
        </>
    )
}
