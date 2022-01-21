import { render, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchArticle } from '../../src/components/SearchArticle'
import { Metadata } from '../../src/domain/Blog'

const posts: Metadata[] = [
    {
        title: 'Test First Article',
        date: '01-02-2021',
        fileName: 'test-first-article',
        isPublished: true,
        description: 'This is a summary',
        slug: 'test-first-title',
        cover: '/',
        tags: ['first'],
        blurDataURL: 'test-second-title',
        readTime: { text: '1 min read', time: 1, words: 1, minutes: 1 },
    },
    {
        title: 'Test Second Article',
        fileName: 'test-second-article',
        date: '01-03-2021',
        isPublished: true,
        description: 'this is a summary',
        slug: 'test-second-title',
        cover: '/',
        tags: ['second'],
        blurDataURL: 'test-second-title',
        readTime: { text: '1 min read', time: 1, words: 1, minutes: 1 },
    },
]

describe('Search Article', () => {
    const renderSearchArticlesComponent = () => {
        const util = render(
            <SearchArticle posts={posts} tags={['first', 'second']} />
        )
        const input = util.getByPlaceholderText('Search Articles...')

        return {
            input,
            ...util,
        }
    }

    it('Should just have render Test First Article', () => {
        const { input, getAllByRole } = renderSearchArticlesComponent()

        userEvent.type(input, 'Test First Article')

        const result = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
Array [
  "Test First Article",
]
`)
    })

    it('Should render all post named contain article', () => {
        const { input, getAllByRole } = renderSearchArticlesComponent()

        userEvent.type(input, 'article')

        const result = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
Array [
  "Test First Article",
  "Test Second Article",
]
`)
    })

    it('Should not found the article', () => {
        const { input, getByText } = renderSearchArticlesComponent()

        userEvent.type(input, 'Test Third Article')

        expect(getByText(/No Articles found./i)).toBeInTheDocument()
    })

    it('Should find tag second', async () => {
        const { getAllByRole, getByRole } = renderSearchArticlesComponent()

        await waitFor(() =>
            userEvent.click(getByRole('button', { name: /second/i }))
        )

        const result = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
    Array [
      "Test Second Article",
    ]
    `)

        await waitFor(() =>
            userEvent.click(getByRole('button', { name: /second/i }))
        )

        const resultTwo = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(resultTwo).toMatchInlineSnapshot(`
Array [
  "Test First Article",
  "Test Second Article",
]
`)
    })
})
