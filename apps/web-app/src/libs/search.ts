import { IBlogMetadata } from '@/types/blog'
import { normalizeTag, normalizeTags } from './tags'

/**
 * Normalizes text for comparison: lower-cases it, removes diacritics and turns
 * punctuation/hyphens into spaces. This makes `open-source`, `Open Source` and
 * `open source` behave the same when searching.
 */
export function normalizeSearchText(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[-_./\\]+/g, ' ')
        .replace(/[^a-z0-9\s]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function startsWithWord(value: string, token: string): boolean {
    return value.split(' ').some((word) => word.startsWith(token))
}

/**
 * Splits a search query into individual words. Each word is run through the tag
 * alias table so searching for an old misspelling (e.g. `menthorship`) still
 * finds posts tagged with the canonical value.
 */
export function tokenizeSearch(query: string): string[] {
    const tokens = normalizeSearchText(query)
        .split(' ')
        .flatMap((token) => normalizeSearchText(normalizeTag(token)).split(' '))
        .filter(Boolean)

    return Array.from(new Set(tokens))
}

function scoreToken(post: IBlogMetadata, token: string): number {
    const title = normalizeSearchText(post.title ?? '')
    const description = normalizeSearchText(post.description ?? '')
    const tags = normalizeTags(post.tags).map(normalizeSearchText)

    let score = 0

    if (title === token) {
        score = Math.max(score, 120)
    } else if (title.startsWith(token)) {
        score = Math.max(score, 100)
    } else if (startsWithWord(title, token)) {
        score = Math.max(score, 80)
    } else if (title.includes(token)) {
        score = Math.max(score, 60)
    }

    for (const tag of tags) {
        if (tag === token) {
            score = Math.max(score, 70)
            break
        }

        if (startsWithWord(tag, token)) {
            score = Math.max(score, 55)
        } else if (tag.includes(token)) {
            score = Math.max(score, 40)
        }
    }

    if (startsWithWord(description, token)) {
        score = Math.max(score, 35)
    } else if (description.includes(token)) {
        score = Math.max(score, 20)
    }

    return score
}

/**
 * Searches posts by title, tags and description, then applies the selected tag
 * filters.
 *
 * - Every word in the query must match somewhere in the post (AND semantics),
 *   which avoids returning unrelated posts for multi-word searches.
 * - Selecting more than one tag requires the post to contain all selected tags.
 * - Results are ranked by where the query matched: exact title, title prefix,
 *   tag, description, etc.
 */
export function filterPosts(
    posts: Array<IBlogMetadata>,
    search: string,
    selectedTags: Array<string> = []
): Array<IBlogMetadata> {
    const activeTags = normalizeTags(selectedTags)

    const tagFiltered =
        activeTags.length === 0
            ? posts
            : posts.filter((post) => {
                  const postTags = new Set(normalizeTags(post.tags))

                  return activeTags.every((tag) => postTags.has(tag))
              })

    const tokens = tokenizeSearch(search)

    if (tokens.length === 0) {
        return tagFiltered
    }

    return tagFiltered
        .map((post, index) => {
            const scores = tokens.map((token) => scoreToken(post, token))
            const matchesEveryToken = scores.every((score) => score > 0)

            return {
                post,
                index,
                score: matchesEveryToken
                    ? scores.reduce((total, score) => total + score, 0)
                    : 0,
            }
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map(({ post }) => post)
}
