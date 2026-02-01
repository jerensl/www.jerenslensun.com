import { useMemo, useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { Grid } from '@/components/Grid'
import { getContents, getTags } from '@/libs/content'
import { filterPosts } from '@/libs/search'
import { IBlogMetadata } from '@/types/blog'
import { SearchArticles } from '@/components/inputs/SearchArticles'
import { Tag } from '@/components/chips/Tag'
import { Button } from '@/components/buttons/Button'
import { ContentCard } from '@/components/cards/Content'
import React from 'react'

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
    tags,
    currentYear,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    const [query, setQuery] = useState<string>('')
    const [globalLang, setGlobalLang] = useState<boolean>(true)

    const englishLang = posts.filter((p: any) => !p.slug.startsWith('id-'))
    const indonesiaLang = posts.filter((p: any) => p.slug.startsWith('id-'))

    const clearSearch = () => setQuery('')

    const matchingPosts = useMemo(() => {
        let filteredPosts = globalLang ? englishLang : indonesiaLang

        return filterPosts(filteredPosts, query)
    }, [globalLang, query, englishLang, indonesiaLang])

    const toggleTag = (tag: string) => {
        if (query.includes(tag)) {
            setQuery((s) =>
                s
                    .split(' ')
                    .filter((t) => t !== tag)
                    ?.join(' ')
            )
        } else {
            setQuery((s) => (s !== '' ? `${s.trim()} ${tag}` : tag))
        }
    }

    const visibleTags = new Set(
        matchingPosts.flatMap((post) => post.tags).filter(Boolean)
    )

    return (
        <>
            <HeadComponent path="/blog" title="Blog" />
            <main className="min-h-9/10 flex px-4 md:px-10 flex-col gap-5">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="pt-24 text-3xl font-semibold">Blog</h1>
                    <p className="mb-4">My latest articles</p>
                </div>
                <Grid as="section" rowGap>
                    <div className="col-span-full w-full">
                        <SearchArticles
                            placeholder="Search Articles..."
                            aria-label="Search Articles"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value)
                            }}
                        />
                        <div className="w-full flex flex-col">
                            <div className="w-full flex my-2 flex-wrap gap-2 col-span-full">
                                <p className="mr-2 text-lg font-medium">
                                    Search by topics :
                                </p>
                                {tags?.map((tag: string) => {
                                    const selected = query.includes(tag)
                                    return (
                                        <Tag
                                            key={tag}
                                            selected={selected}
                                            onClick={() => toggleTag(tag)}
                                            disabled={
                                                !visibleTags.has(tag) &&
                                                !selected
                                            }
                                            text={tag}
                                        />
                                    )
                                })}
                            </div>
                            <Button
                                data-cy="lang"
                                variant="filled-tonal"
                                size="base"
                                onClick={() => {
                                    setGlobalLang((b) => !b)
                                    clearSearch()
                                }}
                                label={`Read in ${
                                    globalLang ? 'Bahasa Indonesia' : 'English'
                                }`}
                            />
                        </div>
                    </div>
                    {matchingPosts.length ? null : (
                        <p className="col-span-full text-center">
                            No articles found.
                        </p>
                    )}
                    {matchingPosts.map(
                        ({ title, description, slug, cover, blurDataURL }) => {
                            return (
                                <ContentCard
                                    variant="outlined"
                                    key={slug}
                                    title={title}
                                    description={description}
                                    slug={`blog/${slug}`}
                                    imageURL={cover}
                                    blurDataURL={blurDataURL}
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
