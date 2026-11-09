import { useEffect, useMemo, useState } from 'react'
import {
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    InferGetStaticPropsType,
} from 'next'
import Link from 'next/link'
import { getMDXComponent } from 'mdx-bundler/client'
import { Footer } from '@/components/Footer'
import { ArticleSeo } from '@/components/Seo'
import { components } from '@/components/Components'
import TableOfContent from '@/components/TOC'
import { getContent, getFiles } from '@/libs/content'
import {
    formatPostDate,
    getLanguageLabel,
    getLanguageLocale,
    getLanguageSwitchLabel,
    getOppositeLanguage,
    getPostLanguage,
} from '@/libs/localization'
import { normalizeTag } from '@/libs/tags'
import { MDXTitleHeadingLevels } from '@/types/content'
import { Comment } from '@/components/Comment'
import Images from '@/components/ImageWithFallback'
import React from 'react'

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getFiles('blog')

    return {
        paths: posts.map((fileName) => ({
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
    const posts = await getContent('blog', context.params?.slug)
    const getCurrentYear = new Date().getFullYear()

    return {
        props: {
            posts,
            blurDataURL: posts?.metadata.blurDataURL,
            currentYear: getCurrentYear,
        },
    }
}

export default function Blog({
    posts,
    blurDataURL,
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const { code, frontmatter } = posts
    const slug = posts.metadata?.slug ?? frontmatter.slug
    const language = getPostLanguage({
        slug,
        language: frontmatter.language,
    })
    const translationSlug =
        typeof frontmatter.translation === 'string' &&
        frontmatter.translation.trim()
            ? frontmatter.translation.trim()
            : null
    const translationLanguage = getOppositeLanguage(language)
    const Component = useMemo(() => getMDXComponent(code), [code])
    const [toc, setToc] = useState<
        Array<{ id: string; text: string; level: MDXTitleHeadingLevels }>
    >([])

    useEffect(() => {
        const mdx = document.getElementById('mdx')
        const selector = mdx?.querySelectorAll('h2, h3')
        const tableOfContent: Array<{
            id: string
            text: string
            level: MDXTitleHeadingLevels
        }> = []
        selector?.forEach((heading) => {
            tableOfContent.push({
                id: heading.id,
                text: heading?.textContent ?? '',
                level: heading.tagName as MDXTitleHeadingLevels,
            })
        })
        setToc(tableOfContent)
    }, [frontmatter.slug])

    return (
        <>
            <ArticleSeo
                path={`/blog/${slug}`}
                title={frontmatter.title}
                description={frontmatter.description}
                image={`https://res.cloudinary.com/do9os7lxv/image/upload/v1655199836/personal/${frontmatter.cover}`}
                date={frontmatter.date}
                tags={frontmatter.tags}
                language={getLanguageLocale(language)}
                translationPath={
                    translationSlug ? `/blog/${translationSlug}` : undefined
                }
                translationLanguage={getLanguageLocale(translationLanguage)}
            />
            <header className="pt-20 text-center">
                <h1
                    lang={getLanguageLocale(language)}
                    className="m-auto p-4 text-3xl font-bold max-w-4xl"
                >
                    {frontmatter.title}
                </h1>
                <p
                    lang={getLanguageLocale(language)}
                    className="text-xl pt-1 pb-2 font-medium"
                >
                    <time dateTime={frontmatter.date}>
                        {formatPostDate(frontmatter.date, language)}
                    </time>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
                    <span
                        aria-label={`Article language: ${getLanguageLabel(
                            language
                        )}`}
                        className="inline-flex h-8 items-center rounded-full border border-outline px-3 text-sm font-medium text-on-surface-variant"
                    >
                        {getLanguageLabel(language)}
                    </span>
                    {translationSlug ? (
                        <Link
                            href={`/blog/${translationSlug}`}
                            hrefLang={getLanguageLocale(translationLanguage)}
                            lang={getLanguageLocale(translationLanguage)}
                            className="inline-flex h-8 items-center rounded-full border border-outline px-3 text-sm font-medium text-primary hover:bg-primary/8"
                        >
                            {getLanguageSwitchLabel(language)}
                        </Link>
                    ) : null}
                </div>
                {Array.isArray(frontmatter.tags) &&
                frontmatter.tags.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2 pb-4">
                        {frontmatter.tags.map((tag: string) => (
                            <Link
                                key={tag}
                                href={{
                                    pathname: '/blog',
                                    query: { tags: normalizeTag(tag) },
                                }}
                                aria-label={`Browse articles tagged ${tag}`}
                                className="inline-flex h-8 items-center rounded-small border border-outline px-3 text-sm text-on-surface-variant hover:bg-on-surface-variant/8"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                ) : null}
                <Images
                    src={frontmatter.cover}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    alt="Person"
                    height={350}
                    width={700}
                    className="object-cover m-auto"
                />
            </header>
            <main className="py-10 flex flex-col max-w-7xl sm:flex-row-reverse m-auto">
                <aside className="py-10 w-[350px]">
                    <div className="sm:sticky top-36 sm:flex">
                        <TableOfContent toc={toc} />
                    </div>
                </aside>
                <article
                    id="mdx"
                    lang={getLanguageLocale(language)}
                    className="prose mx-4 sm:mx-0 sm:ml-20 flex-1 max-w-4xl m-auto dark:prose-invert prose-p:font-normal prose-li:font-normal lg:prose-lg"
                >
                    <Component components={components} />
                    <Comment />
                </article>
            </main>
            <div className="h-20 lg:h-32" />
            <Footer currentYear={currentYear} />
        </>
    )
}
