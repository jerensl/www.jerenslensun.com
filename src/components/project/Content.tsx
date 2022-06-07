import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image, { ImageLoader } from 'next/image'
import { ArticleSeo } from '../Seo'
import { components } from '../components'
// import Giscus from '@giscus/react'
import { ProjectMetadata } from '../../context/project'
import Link from 'next/link'
import { Grid } from '../Grid'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

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
                image={`https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${frontmatter.cover}`}
            />
            <Grid as="header" className="pt-24 gap-3 text-center">
                <h1 className="text-3xl font-bold col-span-full">
                    {frontmatter.title}
                </h1>
                <div className="col-span-full">
                    <Link href={`${frontmatter.repo_url}`} passHref>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm md:text-lg cursor-pointer no-underline"
                        >
                            {frontmatter.repo_url}
                        </a>
                    </Link>
                </div>
                <div className="col-span-full">
                    <Image
                        loader={blobStorageIoImageLoader}
                        src={frontmatter.cover}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        alt="Person"
                        objectFit="cover"
                        height="350px"
                        width="900px"
                    />
                </div>
            </Grid>

            <main className="min-h-9/10 pt-2 md:pt-10 font-medium px-4 md:px-10">
                <article className="prose prose-p:font-normal prose-li:font-normal max-w-4xl lg:prose-lg m-auto">
                    <Component components={components} />
                    <div className="h-10 lg:h-15" />
                    {/* <Giscus
                        repo="jerensl/jerenslensun.com"
                        repoId="R_kgDOGSJ3GQ"
                        category="Q&A"
                        categoryId="DIC_kwDOGSJ3Gc4CAhCy"
                        mapping="pathname"
                        term="Welcome to Blog Discussions!"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        theme="light"
                    /> */}
                </article>
            </main>
        </>
    )
}
