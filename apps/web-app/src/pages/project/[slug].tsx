import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { useMemo } from 'react'
import Link from 'next/link'
import { getMDXComponent } from 'mdx-bundler/client'
import { Footer } from '@/components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { ArticleSeo } from '@/components/Seo'
import { getFiles, getContent } from '@/libs/content'
import { components } from '@/components/Components'
import Images from '@/components/ImageWithFallback'
import { absoluteMediaUrl } from '@/constant/images'
import React from 'react'

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
    const getCurrentYear = new Date().getFullYear()

    return {
        props: {
            projects,
            blurDataURL: projects?.metadata.blurDataURL,
            currentYear: getCurrentYear,
        },
    }
}

export default function Project({
    projects,
    blurDataURL,
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = projects
    const slug = projects.metadata?.slug ?? frontmatter.slug
    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <>
            <ArticleSeo
                path={`/project/${slug}`}
                title={frontmatter.title}
                description={frontmatter.description}
                image={absoluteMediaUrl(frontmatter.cover)}
                tags={frontmatter.programming_languange}
                repoUrl={frontmatter.repo_url}
                kind="project"
            />
            <header className="mx-auto flex w-full max-w-content flex-col items-center px-4 pt-24 text-center sm:px-6 md:pt-28 lg:px-8">
                <p className="text-label-large uppercase tracking-[0.14em] text-primary">
                    Project
                </p>
                <h1 className="mt-3 max-w-4xl text-display-small font-medium md:text-display-medium">
                    {frontmatter.title}
                </h1>
                <p className="mt-3 max-w-2xl text-body-large text-on-surface-variant">
                    {frontmatter.description}
                </p>
                {Array.isArray(frontmatter.programming_languange) &&
                frontmatter.programming_languange.length > 0 ? (
                    <ul className="mt-5 flex flex-wrap justify-center gap-2">
                        {frontmatter.programming_languange.map(
                            (tag: string) => (
                                <li
                                    key={tag}
                                    className="inline-flex h-8 items-center rounded-sm bg-surface-container-high px-3 text-label-large text-on-surface-variant"
                                >
                                    {tag}
                                </li>
                            )
                        )}
                    </ul>
                ) : null}
                <Images
                    src={frontmatter.cover}
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={blurDataURL}
                    alt={`${frontmatter.title} cover`}
                    height={350}
                    width={700}
                    className="mt-10 h-auto w-full max-w-3xl rounded-xl object-cover"
                />
                {frontmatter.repo_url ? (
                    <Link
                        href={`${frontmatter.repo_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${frontmatter.title} repository on GitHub`}
                        className="md-state-layer mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-outline px-4 text-label-large text-primary no-underline"
                    >
                        <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
                        View repository
                    </Link>
                ) : null}
            </header>

            <main className="mx-auto w-full max-w-content px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose mx-auto">
                    <Component components={components} />
                    <div className="h-10" />
                </article>
            </main>
            <div className="h-20 lg:h-32" />
            <Footer currentYear={currentYear} />
        </>
    )
}
