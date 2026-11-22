import { useEffect, useMemo, useRef, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { Grid } from '@/components/Grid'
import { getContents, getTags } from '@/libs/content'
import { filterPosts, normalizeSearchText, tokenizeSearch } from '@/libs/search'
import {
    getTagGroups,
    getTagSummary,
    normalizeTag,
    parseTagsParam,
} from '@/libs/tags'
import {
    getLanguageLabel,
    getLanguageSwitchLabel,
    getOppositeLanguage,
    getPostLanguage,
} from '@/libs/localization'
import { formatReadingTime } from '@/libs/reading'
import { BlogLanguage } from '@/types/content'
import { IBlogMetadata } from '@/types/blog'
import { SearchArticles } from '@/components/inputs/SearchArticles'
import { Tag } from '@/components/chips/Tag'
import { Button } from '@/components/buttons/Button'
import { ContentCard } from '@/components/cards/Content'
import { SectionHeader } from '@/components/SectionHeader'
import React from 'react'

const DEFAULT_VISIBLE_TAGS = 8
const TAG_PANEL_ID = 'all-topics'

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getContents<IBlogMetadata>('blog')
    const getCurrentYear = new Date().getFullYear()

    const tags = getTags(posts)

    return {
        props: { posts: posts, tags, currentYear: getCurrentYear },
    }
}

export default function Blog({
    posts,
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const [selectedTags, setSelectedTags] = useState<Array<string>>([])
    const [language, setLanguage] = useState<BlogLanguage>('en')
    const [isUrlReady, setIsUrlReady] = useState<boolean>(false)
    const [showAllTags, setShowAllTags] = useState<boolean>(false)
    const [tagFilter, setTagFilter] = useState<string>('')
    const [collapsedTagGroups, setCollapsedTagGroups] = useState<
        Record<string, boolean>
    >({})
    const initializedFromUrl = useRef(false)

    const languagePosts = useMemo(() => {
        return posts.filter(
            (post: IBlogMetadata) => getPostLanguage(post) === language
        )
    }, [language, posts])

    // Read filters from the URL once so tag links and shared searches work.
    useEffect(() => {
        if (initializedFromUrl.current || !router.isReady) return

        initializedFromUrl.current = true

        const urlQuery = router.query?.q
        if (typeof urlQuery === 'string' && urlQuery.trim()) {
            setQuery(urlQuery)
        }

        const urlTags = parseTagsParam(router.query?.tags)
        if (urlTags.length > 0) {
            setSelectedTags(urlTags)
        }

        setIsUrlReady(true)
    }, [router])

    // Keep the URL in sync with the current filters without adding history
    // entries for every keystroke.
    useEffect(() => {
        if (!isUrlReady || typeof router.replace !== 'function') return

        const nextQuery = query.trim()
        const nextTags = selectedTags.join(',')
        const currentQuery =
            typeof router.query?.q === 'string' ? router.query.q : ''
        const currentTags = Array.isArray(router.query?.tags)
            ? router.query.tags.join(',')
            : (router.query?.tags ?? '')

        if (currentQuery === nextQuery && currentTags === nextTags) return

        const timeout = setTimeout(() => {
            const nextUrlQuery: Record<string, string> = {}

            if (nextQuery) nextUrlQuery.q = nextQuery
            if (nextTags) nextUrlQuery.tags = nextTags

            void router.replace(
                { pathname: router.pathname || '/blog', query: nextUrlQuery },
                undefined,
                { shallow: true, scroll: false }
            )
        }, 300)

        return () => clearTimeout(timeout)
    }, [isUrlReady, query, selectedTags, router])

    const clearSearch = () => setQuery('')

    const clearFilters = () => {
        setQuery('')
        setSelectedTags([])
        setTagFilter('')
    }

    const toggleTag = (tag: string) => {
        const normalizedTag = normalizeTag(tag)

        setSelectedTags((current) =>
            current.includes(normalizedTag)
                ? current.filter((selectedTag) => selectedTag !== normalizedTag)
                : [...current, normalizedTag]
        )
    }

    const toggleTagGroup = (groupId: string) => {
        setCollapsedTagGroups((current) => ({
            ...current,
            [groupId]: !current[groupId],
        }))
    }

    // Posts matching the text query, before applying the selected tag filters.
    // This keeps the tag counts meaningful while the user types.
    const searchablePosts = useMemo(
        () => filterPosts(languagePosts, query),
        [languagePosts, query]
    )

    const matchingPosts = useMemo(
        () => filterPosts(languagePosts, query, selectedTags),
        [languagePosts, query, selectedTags]
    )

    const allTags = useMemo(() => getTagSummary(languagePosts), [languagePosts])

    const tagCounts = useMemo(
        () =>
            new Map(
                getTagSummary(searchablePosts).map(({ name, count }) => [
                    name,
                    count,
                ])
            ),
        [searchablePosts]
    )

    const visibleTags = useMemo(() => {
        const tags = allTags.map(({ name }) => ({
            name,
            count: tagCounts.get(name) ?? 0,
        }))

        const knownTags = new Set(tags.map(({ name }) => name))

        // Always keep selected tags visible so they can be de-selected, even if
        // the current text search hides them.
        for (const name of selectedTags) {
            if (!knownTags.has(name)) {
                tags.push({ name, count: 0 })
                knownTags.add(name)
            }
        }

        return tags
    }, [allTags, selectedTags, tagCounts])

    const defaultTags = useMemo(() => {
        const topTags = visibleTags.slice(0, DEFAULT_VISIBLE_TAGS)
        const topTagNames = new Set(topTags.map(({ name }) => name))
        const selectedTagsOutsideTop = visibleTags.filter(
            ({ name }) => selectedTags.includes(name) && !topTagNames.has(name)
        )

        return [...topTags, ...selectedTagsOutsideTop]
    }, [selectedTags, visibleTags])

    const tagGroups = useMemo(() => getTagGroups(visibleTags), [visibleTags])

    const filteredTagGroups = useMemo(() => {
        const tokens = tokenizeSearch(tagFilter)

        if (tokens.length === 0) return tagGroups

        return tagGroups
            .map((group) => ({
                ...group,
                tags: group.tags.filter((tag) =>
                    tokens.every((token) =>
                        normalizeSearchText(tag.name).includes(token)
                    )
                ),
            }))
            .filter((group) => group.tags.length > 0)
    }, [tagFilter, tagGroups])

    const renderTagChip = (name: string, count: number) => {
        const selected = selectedTags.includes(name)

        return (
            <Tag
                key={name}
                selected={selected}
                onClick={() => toggleTag(name)}
                disabled={count === 0 && !selected}
                text={name}
                count={count}
            />
        )
    }

    const hasFilters = query.trim().length > 0 || selectedTags.length > 0
    const articleLabel = languagePosts.length === 1 ? 'article' : 'articles'
    return (
        <>
            <HeadComponent
                path="/blog"
                title="Blog"
                description="Articles by Jerens Lensun on software development, open source, algorithms, and lessons learned while building things that last."
            />
            <main className="mx-auto flex w-full max-w-content flex-col gap-10 px-4 pb-4 pt-24 sm:px-6 md:pt-28 lg:px-8">
                <SectionHeader
                    eyebrow="Writing"
                    title="Blog"
                    titleAs="h1"
                    description="Notes on browser engines, open source, developer tooling, and the lessons that survive the release."
                    action={
                        <Button
                            data-cy="lang"
                            variant="filled-tonal"
                            size="base"
                            onClick={() => {
                                setLanguage((current) =>
                                    getOppositeLanguage(current)
                                )
                                clearFilters()
                            }}
                            label={getLanguageSwitchLabel(language)}
                        />
                    }
                />
                <Grid as="section" rowGap>
                    <div className="col-span-full w-full">
                        <SearchArticles
                            placeholder="Search Articles..."
                            aria-label="Search Articles"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value)
                            }}
                            onClear={clearSearch}
                        />
                        <div className="w-full flex flex-col">
                            <div className="w-full flex my-4 flex-wrap gap-2 col-span-full items-center">
                                <p className="mr-2 text-label-large text-on-surface-variant">
                                    Search by topics:
                                </p>
                                {showAllTags ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowAllTags(false)}
                                        aria-expanded={true}
                                        aria-controls={TAG_PANEL_ID}
                                        className="md-state-layer inline-flex h-8 items-center rounded-sm border border-outline px-3 text-label-large text-primary"
                                    >
                                        Hide topics
                                    </button>
                                ) : (
                                    <>
                                        {defaultTags.map(({ name, count }) =>
                                            renderTagChip(name, count)
                                        )}
                                        {visibleTags.length >
                                        DEFAULT_VISIBLE_TAGS ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowAllTags(true)
                                                }
                                                aria-expanded={false}
                                                aria-controls={TAG_PANEL_ID}
                                                className="md-state-layer inline-flex h-8 items-center rounded-sm border border-outline px-3 text-label-large text-primary"
                                            >
                                                Show all {visibleTags.length}{' '}
                                                topics
                                            </button>
                                        ) : null}
                                    </>
                                )}
                            </div>
                            {showAllTags ? (
                                <div
                                    id={TAG_PANEL_ID}
                                    className="mb-6 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                                >
                                    <div className="flex flex-col gap-4">
                                        <label className="flex h-12 items-center gap-2 rounded-full bg-surface-container-high px-4 focus-within:ring-2 focus-within:ring-primary/50">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-4 shrink-0 text-on-surface-variant"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                />
                                            </svg>
                                            <input
                                                type="search"
                                                value={tagFilter}
                                                onChange={(event) => {
                                                    setTagFilter(
                                                        event.target.value
                                                    )
                                                    setCollapsedTagGroups({})
                                                }}
                                                placeholder="Filter topics..."
                                                aria-label="Filter topics"
                                                className="w-full bg-transparent text-body-medium text-on-surface placeholder:text-on-surface-variant focus:outline-hidden [&::-webkit-search-cancel-button]:hidden"
                                            />
                                            {tagFilter ? (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setTagFilter('')
                                                        setCollapsedTagGroups(
                                                            {}
                                                        )
                                                    }}
                                                    aria-label="Clear topic filter"
                                                    className="md-state-layer flex size-6 shrink-0 items-center justify-center rounded-full text-on-surface-variant"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2}
                                                        stroke="currentColor"
                                                        className="size-3.5"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            ) : null}
                                        </label>
                                        <div className="flex max-h-96 flex-col gap-4 overflow-y-auto overscroll-contain pr-1">
                                            {filteredTagGroups.length === 0 ? (
                                                <p className="text-body-medium text-on-surface-variant">
                                                    No topics match{' '}
                                                    {tagFilter
                                                        ? `"${tagFilter}".`
                                                        : 'the current filter.'}
                                                </p>
                                            ) : null}
                                            {filteredTagGroups.map((group) => {
                                                const isOpen =
                                                    !collapsedTagGroups[
                                                        group.id
                                                    ]
                                                const tagCount =
                                                    group.tags.length

                                                return (
                                                    <section
                                                        key={group.id}
                                                        className="flex flex-col gap-2"
                                                    >
                                                        <button
                                                            type="button"
                                                            id={`tag-group-${group.id}-label`}
                                                            onClick={() =>
                                                                toggleTagGroup(
                                                                    group.id
                                                                )
                                                            }
                                                            aria-expanded={
                                                                isOpen
                                                            }
                                                            aria-controls={`tag-group-${group.id}`}
                                                            className="md-state-layer flex w-full items-center justify-between gap-2 rounded-sm px-1 py-1 text-left"
                                                        >
                                                            <span className="text-title-small text-on-surface">
                                                                {group.label}{' '}
                                                                <span className="font-normal text-on-surface-variant">
                                                                    ({tagCount})
                                                                </span>
                                                            </span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className={clsx(
                                                                    'size-4 shrink-0 text-on-surface-variant transition-transform duration-200 ease-standard',
                                                                    {
                                                                        'rotate-180':
                                                                            isOpen,
                                                                    }
                                                                )}
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                />
                                                            </svg>
                                                        </button>
                                                        {isOpen ? (
                                                            <div
                                                                id={`tag-group-${group.id}`}
                                                                role="group"
                                                                aria-labelledby={`tag-group-${group.id}-label`}
                                                                className="flex flex-wrap gap-2"
                                                            >
                                                                {group.tags.map(
                                                                    ({
                                                                        name,
                                                                        count,
                                                                    }) =>
                                                                        renderTagChip(
                                                                            name,
                                                                            count
                                                                        )
                                                                )}
                                                            </div>
                                                        ) : null}
                                                    </section>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <p
                                        role="status"
                                        aria-live="polite"
                                        className="text-body-medium text-on-surface-variant"
                                    >
                                        Showing {matchingPosts.length} of{' '}
                                        {languagePosts.length} {articleLabel} in{' '}
                                        {getLanguageLabel(language)}
                                    </p>
                                    {hasFilters ? (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="md-state-layer inline-flex h-8 items-center rounded-full px-3 text-label-large text-primary"
                                        >
                                            Clear filters
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    {matchingPosts.length ? null : (
                        <p className="col-span-full rounded-lg bg-surface-container-low p-8 text-center text-body-large text-on-surface-variant">
                            No articles found.
                        </p>
                    )}
                    {matchingPosts.map(
                        ({
                            title,
                            description,
                            slug,
                            cover,
                            blurDataURL,
                            readTime,
                        }) => {
                            return (
                                <ContentCard
                                    variant="outlined"
                                    className="col-span-full md:col-span-4"
                                    key={slug}
                                    title={title}
                                    description={description}
                                    slug={`blog/${slug}`}
                                    imageURL={cover}
                                    blurDataURL={blurDataURL}
                                    readTimeLabel={
                                        readTime
                                            ? formatReadingTime(
                                                  readTime.minutes,
                                                  language
                                              )
                                            : undefined
                                    }
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
