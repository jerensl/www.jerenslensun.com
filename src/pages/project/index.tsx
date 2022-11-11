import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ProjectContext from '../../context/project/index'
import { Footer } from '../../components/Footer'
import { Seo } from '../../components/Seo'
import { Layout } from '../../components/project/layout'

export const getStaticProps: GetStaticProps = async () => {
    const project = new ProjectContext('contents/project')
    const projects = await project.getAllPublishedProject()
    const langs = project.getLangs

    return {
        props: { projects, langs },
    }
}

export default function Project({
    projects,
    langs,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/project" />
            <div className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Projects</h1>
                </div>
                <Layout project={projects} />
            </div>
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
