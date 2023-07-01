import React from 'react'
import { Metadata } from '../../libs/blog'
import { filterPosts } from '../../libs/search'
import Tag from '../Tag'
import { Card } from './card'
import { Grid } from '../Grid'

export const Layout = ({
    posts,
    tags,
}: {
    posts: Metadata[]
    tags: string[]
}): React.ReactElement => {
    const [query, setQuery] = React.useState<string>('')
    const [globalLang, setGlobalLang] = React.useState<boolean>(false)

    const englishLang = posts.filter((p: any) => !p.slug.startsWith('id-'))
    const indonesiaLang = posts.filter((p: any) => p.slug.startsWith('id-'))

    const clearSearch = () => setQuery('')

    const matchingPosts = React.useMemo(() => {
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
        <Grid as="section" rowGap>
            <div className="col-span-full w-full">
                <div className="w-full bg-transparent border rounded-md focus-within:border-red-500 focus-within:ring focus-within:ring-red-400 focus-within:ring-opacity-40">
                    <input
                        className="text-gray-700 dark:text-neutral-200 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0 p-2 w-full"
                        placeholder="Search Articles..."
                        aria-label="Search Articles"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                    />
                </div>
                <div className="w-full">
                    <div className="w-full flex my-4 flex-wrap col-span-full -mb-4">
                        <p className="mr-2 text-lg font-medium">
                            Search by topics :
                        </p>
                        {tags?.map((tag) => {
                            const selected = query.includes(tag)
                            return (
                                <Tag
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    disabled={
                                        !visibleTags.has(tag) && !selected
                                    }
                                >
                                    {tag}
                                </Tag>
                            )
                        })}
                    </div>
                    <button
                        data-cy="lang"
                        onClick={() => {
                            setGlobalLang((b) => !b)
                            clearSearch()
                        }}
                        className="text-sm mt-5 md:mt-3 mb-5 mr-4 px-4 py-2 w-auto h-auto rounded-md cursor-pointer transition font-semibold text-white bg-red-500 opacity-100"
                    >
                        Read in {globalLang ? 'Bahasa Indonesia' : 'English'}
                    </button>
                </div>
            </div>
            {matchingPosts.length ? null : (
                <p className="col-span-full text-center">No articles found.</p>
            )}
            {matchingPosts?.map(Card)}
        </Grid>
    )
}
