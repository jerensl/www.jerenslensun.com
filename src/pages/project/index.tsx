import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getContents } from '@/libs/content'
import { Footer } from '@/components/Footer'
import { Seo } from '@/components/Seo'
import { IProjectMetadata } from '@/types/project'
import { Grid } from '@/components/Grid'
import { Card } from '@/components/cards/project'

export const getStaticProps: GetStaticProps = async () => {
    const projects = await getContents<IProjectMetadata>('project')

    return {
        props: { projects },
    }
}

export default function Project({
    projects,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/project" />
            <div className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Projects</h1>
                </div>
                <Grid as="section" rowGap>
                    {projects?.length ? null : (
                        <p className="col-span-full text-center">
                            No project available.
                        </p>
                    )}
                    {projects?.map(Card)}
                </Grid>
            </div>
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
