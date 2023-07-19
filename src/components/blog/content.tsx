import { useEffect, useMemo, useState } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from 'next/image'
import { components } from '../Components'
import { format } from 'date-fns'
import { imageLoader } from '../../constant/images'
import type { IBlogMetadata } from '../../types/blog'
import TableOfContent from './tableOfContent'

interface ArticleProps {
    frontmatter: IBlogMetadata
    code: string
    blurDataURL: string
}

export const Article = ({
    frontmatter,
    code,
    blurDataURL,
}: ArticleProps): React.ReactElement => {
    const Component = useMemo(() => getMDXComponent(code), [code])
    const [toc, setToc] = useState<Array<{ id: string; text: string }>>([])

    useEffect(() => {
        const mdx = document.getElementById('mdx')
        const selector = mdx?.querySelectorAll('h2, h3, h4')
        const tableOfContent: Array<{ id: string; text: string }> = []
        selector?.forEach((heading) => {
            tableOfContent.push({
                id: heading.id,
                text: heading?.textContent ?? '',
            })
        })
        setToc(tableOfContent)
    }, [frontmatter.slug])

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
            <main className="py-10 lg:grid lg:grid-cols-[1fr_auto] lg:grid-rows-[1fr_min-content] lg:gap-2 spa max-w-5xl m-auto">
                <article
                    id="mdx"
                    className="prose max-w-none dark:prose-invert prose-p:font-normal prose-li:font-normal mx-auto w-full lg:prose-lg m-auto"
                >
                    <Component components={components} />
                </article>
                <aside className="py-10">
                    <div className="sticky top-36">
                        <TableOfContent toc={toc} />
                    </div>
                </aside>
            </main>
        </>
    )
}
