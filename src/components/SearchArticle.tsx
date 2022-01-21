import React from 'react'
import { Metadata } from '../domain/Blog'
import { filterPosts } from '../domain/Search'
import { Tag } from './Tag'
import { Articles } from './Articles'

const blobStorageIoImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const SearchArticle = ({
    posts,
    tags,
}: {
    posts: Metadata[]
    tags: string[]
}): React.ReactElement => {
    const [query, setQuery] = React.useState<string>('')
    const [globalLang, setGlobalLang] = React.useState<boolean>(true)

    const englishLang = posts.filter((p) => !p.slug.startsWith('id-'))
    const indonesiaLang = posts.filter((p) => p.slug.startsWith('id-'))

    const clearSearch = () => setQuery('')

    const matchingPosts = React.useMemo(() => {
        let filteredPosts = globalLang ? englishLang : indonesiaLang

        return filterPosts(filteredPosts, query)
    }, [globalLang, query])

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
        <section className="grid grid-cols-auto-fill lg:grid-cols-auto-fill-lg gap-5 lg:max-w-7xl lg:m-auto">
            <div className="col-span-full w-full">
                <div className="w-full bg-transparent border rounded-md focus-within:border-red-500 focus-within:ring focus-within:ring-red-400 focus-within:ring-opacity-40">
                    <input
                        className="text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0 p-2 w-full"
                        placeholder="Search Articles..."
                        aria-label="Search Articles"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                    />
                </div>
                <div>
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
                        onClick={() => {
                            setGlobalLang((b) => !b)
                            clearSearch()
                        }}
                        className="text-sm my-2 mr-4 px-4 py-2 w-auto h-auto rounded-md cursor-pointer transition font-semibold text-white bg-red-500 opacity-100"
                    >
                        Read in {globalLang ? 'Bahasa Indonesia' : 'English'}
                    </button>
                </div>
            </div>
            {matchingPosts.length ? null : <p>No articles found.</p>}
            {matchingPosts?.map(Articles)}
        </section>
    )
}
