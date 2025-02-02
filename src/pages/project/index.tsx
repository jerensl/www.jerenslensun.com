import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getContents } from '@/libs/content'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { IProjectMetadata } from '@/types/project'
import { Grid } from '@/components/Grid'
import { ContentCard } from '@/components/cards/Content'

export const getStaticProps: GetStaticProps = async () => {
    const projects = await getContents<IProjectMetadata>('project')
    const getCurrentYear = new Date().getFullYear()

    return {
        props: { projects, currentYear: getCurrentYear },
    }
}

export default function Project({
    projects,
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <HeadComponent path="/project" title="Project" />
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
                    {projects.map(
                        ({
                            slug,
                            title,
                            status,
                            programming_languange,
                            description,
                            cover,
                            blurDataURL,
                        }: IProjectMetadata) => {
                            return (
                                <ContentCard
                                    variant="outlined"
                                    key={slug}
                                    title={title}
                                    subtitle={status}
                                    tags={programming_languange}
                                    description={description}
                                    slug={`project/${slug}`}
                                    imageURL={cover}
                                    blurDataURL={blurDataURL}
                                />
                            )
                        }
                    )}
                </Grid>
            </div>
            <div className="h-20 lg:h-32" />
            <Footer currentYear={currentYear} />
        </>
    )
}
