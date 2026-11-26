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
import { formatReadingTime } from '@/libs/reading'
import { normalizeTag } from '@/libs/tags'
import { MDXTitleHeadingLevels } from '@/types/content'
import { Comment } from '@/components/Comment'
import Images from '@/components/ImageWithFallback'
import { absoluteMediaUrl } from '@/constant/images'
import { ReadingProgress } from '@/components/ReadingProgress'
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
            <ReadingProgress key={slug} targetId="mdx" />
            <ArticleSeo
                path={`/blog/${slug}`}
                title={frontmatter.title}
                description={frontmatter.description}
                image={absoluteMediaUrl(frontmatter.cover)}
                date={frontmatter.date}
                tags={frontmatter.tags}
                language={getLanguageLocale(language)}
                translationPath={
                    translationSlug ? `/blog/${translationSlug}` : undefined
                }
                translationLanguage={getLanguageLocale(translationLanguage)}
            />
            <header className="mx-auto flex w-full max-w-content flex-col items-center px-4 pt-24 text-center sm:px-6 md:pt-28 lg:px-8">
                <p className="text-label-large uppercase tracking-[0.14em] text-primary">
                    Article
                </p>
                <h1
                    lang={getLanguageLocale(language)}
                    className="mt-3 max-w-4xl text-display-small font-medium md:text-display-medium"
                >
                    {frontmatter.title}
                </h1>
                <div
                    lang={getLanguageLocale(language)}
                    className="mt-4 flex flex-wrap items-center justify-center gap-2 text-body-medium text-on-surface-variant"
                >
                    <time dateTime={frontmatter.date}>
                        {formatPostDate(frontmatter.date, language)}
                    </time>
                    {frontmatter.readTime ? (
                        <>
                            <span aria-hidden="true">·</span>
                            <span>
                                {formatReadingTime(
                                    frontmatter.readTime.minutes,
                                    language
                                )}
                            </span>
                        </>
                    ) : null}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    <span
                        aria-label={`Article language: ${getLanguageLabel(
                            language
                        )}`}
                        className="inline-flex h-8 items-center rounded-sm bg-surface-container-high px-3 text-label-large text-on-surface-variant"
                    >
                        {getLanguageLabel(language)}
                    </span>
                    {translationSlug ? (
                        <Link
                            href={`/blog/${translationSlug}`}
                            hrefLang={getLanguageLocale(translationLanguage)}
                            lang={getLanguageLocale(translationLanguage)}
                            className="md-state-layer inline-flex h-8 items-center rounded-sm border border-outline px-3 text-label-large text-primary no-underline"
                        >
                            {getLanguageSwitchLabel(language)}
                        </Link>
                    ) : null}
                </div>
                {Array.isArray(frontmatter.tags) &&
                frontmatter.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {frontmatter.tags.map((tag: string) => (
                            <Link
                                key={tag}
                                href={{
                                    pathname: '/blog',
                                    query: { tags: normalizeTag(tag) },
                                }}
                                aria-label={`Browse articles tagged ${tag}`}
                                className="md-state-layer inline-flex h-8 items-center rounded-sm px-2 text-label-large text-on-surface-variant no-underline"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
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
            </header>
            <main className="mx-auto flex w-full max-w-content flex-col-reverse gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:gap-12 lg:px-8">
                <article
                    id="mdx"
                    lang={getLanguageLocale(language)}
                    className="prose min-w-0 flex-1"
                >
                    <Component components={components} />
                    <Comment />
                </article>
                <aside className="w-full shrink-0 lg:w-[280px]">
                    <div className="lg:sticky lg:top-28">
                        <TableOfContent toc={toc} />
                    </div>
                </aside>
            </main>
            <div className="h-20 lg:h-32" />
            <Footer currentYear={currentYear} />
        </>
    )
}
