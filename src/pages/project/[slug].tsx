import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { Footer } from '../../components/Footer'
import { Content } from '../../components/project/content'
import ProjectContext from '../../libs/project/index'
import { getFiles, getContent } from '../../libs/content'

export const getStaticPaths: GetStaticPaths = async () => {
    const projects = getFiles('project')

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
    const projects = await getContent('project', context.params?.slug)

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
