import { filterPosts, tokenizeSearch } from '../../src/libs/search'
import { IBlogMetadata } from '../../src/types/blog'

const createPost = (
    overrides: Partial<IBlogMetadata> & Pick<IBlogMetadata, 'title'>
): IBlogMetadata => ({
    date: '2025-01-01',
    isPublished: true,
    description: '',
    slug: overrides.title.toLowerCase().replace(/\s+/g, '-'),
    cover: '/cover.png',
    tags: [],
    ...overrides,
})

const posts: IBlogMetadata[] = [
    createPost({
        title: 'Building a Load Balancer with Go',
        description: 'Distribute incoming traffic across multiple targets.',
        tags: ['golang', 'gateway'],
    }),
    createPost({
        title: 'Open Source Mentorship',
        description: 'Lessons from the Outreachy internship program.',
        tags: ['mentorship', 'outreachy', 'open-source'],
    }),
    createPost({
        title: 'Algorithm Fundamentals',
        description: 'An introduction to measuring algorithm complexity.',
        tags: ['algorithm'],
    }),
    createPost({
        title: 'Outreachy Final Project',
        description: 'Wrapping up the final project.',
        tags: ['mentorship', 'outreachy'],
    }),
]

describe('filterPosts', () => {
    it('returns all posts when there is no query or tag filter', () => {
        expect(filterPosts(posts, '')).toEqual(posts)
        expect(filterPosts(posts, '   ')).toEqual(posts)
    })

    it('matches titles, tags and descriptions', () => {
        expect(
            filterPosts(posts, 'balancer').map((post) => post.title)
        ).toEqual(['Building a Load Balancer with Go'])
        expect(
            filterPosts(posts, 'algorithm').map((post) => post.title)
        ).toEqual(['Algorithm Fundamentals'])
        expect(
            filterPosts(posts, 'internship').map((post) => post.title)
        ).toEqual(['Open Source Mentorship'])
    })

    it('requires every word of a multi-word query to match', () => {
        expect(
            filterPosts(posts, 'outreachy project').map((post) => post.title)
        ).toEqual(['Outreachy Final Project'])
        expect(filterPosts(posts, 'outreachy algorithm')).toEqual([])
    })

    it('treats hyphens and spaces in tags the same way', () => {
        expect(
            filterPosts(posts, 'open source').map((post) => post.title)
        ).toEqual(['Open Source Mentorship'])
        expect(
            filterPosts(posts, 'open-source').map((post) => post.title)
        ).toEqual(['Open Source Mentorship'])
    })

    it('finds posts when searching for a historical misspelling', () => {
        expect(
            filterPosts(posts, 'menthorship').map((post) => post.title)
        ).toEqual(['Open Source Mentorship', 'Outreachy Final Project'])
    })

    it('ranks an exact title match above other matches', () => {
        expect(filterPosts(posts, 'algorithm')[0].title).toBe(
            'Algorithm Fundamentals'
        )
    })

    it('requires all selected tags to be present', () => {
        expect(
            filterPosts(posts, '', ['mentorship']).map((post) => post.title)
        ).toEqual(['Open Source Mentorship', 'Outreachy Final Project'])

        expect(
            filterPosts(posts, '', ['mentorship', 'outreachy']).map(
                (post) => post.title
            )
        ).toEqual(['Open Source Mentorship', 'Outreachy Final Project'])

        expect(filterPosts(posts, '', ['algoritma', 'golang'])).toEqual([])
    })

    it('combines text search and tag filters', () => {
        expect(
            filterPosts(posts, 'project', ['mentorship', 'outreachy']).map(
                (post) => post.title
            )
        ).toEqual(['Outreachy Final Project'])
    })
})

describe('tokenizeSearch', () => {
    it('normalizes punctuation, aliases and duplicate words', () => {
        expect(
            tokenizeSearch('  Open-Source   Open Source menthorship ')
        ).toEqual(['open', 'source', 'mentorship'])
    })
})
