import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import { Footer } from '../../components/Footer'
import { getFiles, getContent } from '../../libs/content'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArticleSeo } from '@/components/Seo'
import { Grid } from '@/components/Grid'
import Image from 'next/image'
import { imageLoader } from '@/constant/images'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { components } from '@/components/Components'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'

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

    console.log(projects)
    return {
        props: { projects, blurDataURL: projects.metadata.blurDataURL },
    }
}

export default function Project({
    projects,
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = projects
    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <>
            <ArticleSeo
                path={frontmatter.title}
                title={frontmatter.title}
                description={frontmatter.description}
                image={`https://ik.imagekit.io/jerensl/tr:di-default-content_jXeDNogri.jpg/${frontmatter.cover}`}
            />
            <Grid as="header" className="pt-24 gap-3">
                <h1 className="text-center text-3xl font-bold col-span-full">
                    {frontmatter.title}
                </h1>
                <div className="col-span-full m-auto">
                    <Image
                        loader={imageLoader}
                        src={frontmatter.cover}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        alt="Person"
                        height="350"
                        width="700"
                        className="object-cover"
                    />
                </div>
                <div className="col-span-full text-center">
                    <Link
                        href={`${frontmatter.repo_url}`}
                        passHref
                        legacyBehavior
                    >
                        <FontAwesomeIcon
                            className="hover:text-gray-700 cursor-pointer"
                            icon={faGithub}
                            size="2x"
                        />
                    </Link>
                </div>
            </Grid>

            <main className="min-h-9/10 pt-2 md:pt-10 font-medium px-4 md:px-10">
                <article className="prose dark:prose-invert prose-p:font-normal prose-li:font-normal max-w-4xl lg:prose-lg m-auto">
                    <Component components={components} />
                    <div className="h-10 lg:h-15" />
                </article>
            </main>
            <div className="h-20 lg:h-32" />
            <Footer />
        </>
    )
}
