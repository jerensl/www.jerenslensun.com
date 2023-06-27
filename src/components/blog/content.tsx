import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from 'next/image'
import { components } from '../Components'
import { format } from 'date-fns'
import { Metadata } from '../../lib/blog'
import { imageLoader } from '../../lib/images'

interface ArticleProps {
    frontmatter: Metadata
    code: string
    blurDataURL: string
}

export const Article = ({
    frontmatter,
    code,
    blurDataURL,
}: ArticleProps): React.ReactElement => {
    const Component = useMemo(() => getMDXComponent(code), [code])

    return (
        <>
            <header className="pt-20 text-center">
                <h1 className="m-auto p-4 text-3xl font-bold max-w-4xl">
                    {frontmatter.title}
                </h1>
                <p className="text-xl pt-1 pb-2 font-medium">
                    {format(new Date(frontmatter.date), 'MMMM dd, yyyy')}
                </p>
                <Image
                    loader={imageLoader}
                    src={frontmatter.cover}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    alt="Person"
                    height="350"
                    width="700"
                    className="object-cover m-auto"
                />
            </header>
            <main className="min-h-9/10 pt-2 md:pt-10 font-medium px-4 md:px-10">
                <article className="prose dark:prose-invert prose-p:font-normal prose-li:font-normal max-w-4xl lg:prose-lg m-auto">
                    <Component components={components} />
                </article>
            </main>
        </>
    )
}
