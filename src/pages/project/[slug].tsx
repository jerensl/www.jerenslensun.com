import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { Footer } from '../../components/footer'
import { Content } from '../../components/project/content'
import ProjectContext from '../../context/project/index'

export const getStaticPaths: GetStaticPaths = async () => {
    const project = new ProjectContext('contents/project')
    const projects = project.allProject

    return {
        paths: projects.map((fileName) => ({
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
    const project = new ProjectContext('contents/project')
    const projects = await project.getProjectDetail(context.params?.slug)

    return {
        props: { projects, blurDataURL: projects.metadata.blurDataURL },
    }
}

export default function Project({
    projects,
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = projects

    return (
        <>
            <Content
                frontmatter={frontmatter}
                code={code}
                blurDataURL={blurDataURL}
            />
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
