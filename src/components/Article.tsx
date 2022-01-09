import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from 'next/image'
import { ArticleSeo } from './Seo'
import { components } from './components'
import { Giscus } from '@giscus/react'
import { format } from 'date-fns'
import { Metadata } from '../domain/Blog'

const blobStorageIoImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

interface ArticleProps {
    frontmatter: Metadata
    code: any
}

export const Article = ({
    frontmatter,
    code,
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
            <header className="pt-20 text-center">
                <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
                <p className="text-xl pt-1 pb-2 font-medium">
                    {format(new Date(frontmatter.date), 'MMMM dd, yyyy')}
                </p>
                <Image
                    loader={blobStorageIoImageLoader}
                    src={frontmatter.cover}
                    alt="Person"
                    objectFit="cover"
                    height="350px"
                    width="900px"
                />
            </header>
            <main className="min-h-9/10 pt-2 md:pt-10 font-medium px-4 md:px-10">
                <article className="prose prose-p:font-normal prose-li:font-normal max-w-4xl lg:prose-lg m-auto">
                    <Component components={components} />
                    <Giscus
                        repo="jerensl/jerenslensun.com"
                        repoId="R_kgDOGSJ3GQ"
                        category="Q&A"
                        categoryId="DIC_kwDOGSJ3Gc4CAhCy"
                        mapping="pathname"
                        term="Welcome to Blog Discussions!"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        theme="light"
                    />
                </article>
            </main>
        </>
    )
}
