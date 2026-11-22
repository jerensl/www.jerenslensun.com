import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getContents } from '@/libs/content'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { IProjectMetadata } from '@/types/project'
import { Grid } from '@/components/Grid'
import { ContentCard } from '@/components/cards/Content'
import { SectionHeader } from '@/components/SectionHeader'
import React from 'react'

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
            <HeadComponent
                path="/project"
                title="Project"
                description="Projects by Jerens Lensun, including browser-engine work in Servo, Playwright E2E testing at CNCF’s Meshery project, open-source tooling, APIs, and web applications, with documentation on the decisions behind them."
            />
            <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-4 pb-4 pt-24 sm:px-6 md:pt-28 lg:px-8">
                <SectionHeader
                    eyebrow="Selected work"
                    title="Projects"
                    titleAs="h1"
                    description="Case studies on browser-engine work, testing infrastructure, and the tooling that keeps open-source projects maintainable."
                />
                <Grid as="section" rowGap>
                    {projects?.length ? null : (
                        <p className="col-span-full rounded-lg bg-surface-container-low p-8 text-center text-body-large text-on-surface-variant">
                            No project available.
                        </p>
                    )}
                    {projects.map(
                        ({
                            slug,
                            title,
                            role,
                            status,
                            programming_languange,
                            description,
                            cover,
                            blurDataURL,
                        }: IProjectMetadata) => {
                            return (
                                <ContentCard
                                    variant="outlined"
                                    className="col-span-full md:col-span-4"
                                    key={slug}
                                    title={title}
                                    role={role}
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
            </main>
            <div className="h-20 lg:h-32" />
            <Footer currentYear={currentYear} />
        </>
    )
}
