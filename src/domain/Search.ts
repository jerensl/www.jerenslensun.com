import { Metadata } from './Blog'
import { matchSorter, rankings } from 'match-sorter'

export function filterPosts(posts: Array<Metadata>, search: string) {
    if (!search) return posts

    const options = {
        keys: [
            {
                key: 'title',
                threshold: rankings.CONTAINS,
            },
            {
                key: 'tags',
                threshold: rankings.CONTAINS,
            },
            {
                key: 'description',
                threshold: rankings.CONTAINS,
            },
        ],
    }

    const allResults = matchSorter(posts, search, options)

    const searches = new Set(search.split(' '))

    if (searches.size < 2) {
        return allResults
    }

    const [firstWord, ...restWords] = searches.values()
    if (!firstWord) {
        return []
    }

    const individualWordOptions = {
        ...options,
        keys: options.keys.map((key) => {
            return {
                ...key,
                maxRangkings: rankings.CASE_SENSITIVE_EQUAL,
                threshold: rankings.WORD_STARTS_WITH,
            }
        }),
    }

    let individualWordResults = matchSorter(
        posts,
        firstWord,
        individualWordOptions
    )

    for (const word of restWords) {
        const searchResult = matchSorter(
            individualWordResults,
            word,
            individualWordOptions
        )
        individualWordResults = individualWordResults.filter((r) =>
            searchResult.includes(r)
        )
    }

    return Array.from(new Set([...allResults, ...individualWordResults]))
}
