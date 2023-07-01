import { render, waitFor, within } from '../../__mocks__/utils/test-providers'
import userEvent from '@testing-library/user-event'
import { Layout } from '../../src/components/blog/layout'
import { Metadata } from '../../src/libs/blog'

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
        const util = render(<Layout posts={posts} tags={['first', 'second']} />)
        const input = util.getByPlaceholderText('Search Articles...')

        return {
            input,
            ...util,
        }
    }

    it('Should just have render Test First Article', async () => {
        const { input, getAllByRole, getByRole } =
            renderSearchArticlesComponent()

        userEvent.click(getByRole('button', { name: /Read in English/i }))

        await waitFor(() => userEvent.type(input, 'Test First Article'))

        const result = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
Array [
  "Test First Article",
]
`)
    })

    it('Should render all post named contain article', async () => {
        const { input, getAllByRole, getByRole } =
            renderSearchArticlesComponent()

        userEvent.click(getByRole('button', { name: /Read in English/i }))

        await waitFor(() => userEvent.type(input, 'article'))

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

        userEvent.click(getByRole('button', { name: /Read in English/i }))

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

    it('Should change languange to English', async () => {
        const { getByRole, findByText } = renderSearchArticlesComponent()

        userEvent.click(getByRole('button', { name: /Read in English/i }))

        const result = await findByText(/Read in Bahasa Indonesia/i)

        expect(result).toBeInTheDocument()
    })
})
