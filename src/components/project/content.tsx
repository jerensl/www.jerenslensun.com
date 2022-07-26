import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from 'next/image'
import { ArticleSeo } from '../seo'
import { components } from '../components'
import { ProjectMetadata } from '../../context/project'
import Link from 'next/link'
import { Grid } from '../grid'
import { imageLoader } from '../../lib/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

interface ArticleProps {
    frontmatter: ProjectMetadata
    code: string
    blurDataURL: string
}

export const Content = ({
    frontmatter,
    code,
    blurDataURL,
}: ArticleProps): React.ReactElement => {
    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <>
            <ArticleSeo
                path={frontmatter.title}
                title={frontmatter.title}
                description={frontmatter.description}
                image={`https://ik.imagekit.io/jerensl/${frontmatter.cover}`}
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
                        objectFit="cover"
                        height="350px"
                        width="900px"
                    />
                </div>
                <div className="col-span-full text-center">
                    <Link href={`${frontmatter.repo_url}`} passHref>
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
        </>
    )
}
