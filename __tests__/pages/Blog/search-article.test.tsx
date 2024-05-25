/**
 * @jest-environment jsdom
 */
import {
    render,
    waitFor,
    within,
} from '../../../__mocks__/utils/test-providers'
import userEvent from '@testing-library/user-event'
import { IBlogMetadata } from '../../../src/types/blog'
import Blog from '../../../src/pages/blog/index'

jest.mock('firebase/messaging', () => jest.fn())
jest.mock('firebase/app', () => jest.fn())

jest.mock('remark-math', () => jest.fn())
jest.mock('rehype-katex', () => jest.fn())
jest.mock('unist-util-visit', () => jest.fn())
jest.mock('hast-util-to-string', () => jest.fn())
jest.mock('refractor', () => jest.fn())
jest.mock('hast-util-to-html', () => jest.fn())
jest.mock('unified', () => jest.fn())
jest.mock('rehype-parse', () => jest.fn())

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
jest.mock('plaiceholder', () => ({
    getPlaiceholder: jest.fn(() => {
        return {
            base64: 'data:image/png;base64,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',
        }
    }),
}))

useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
}))

const posts: IBlogMetadata[] = [
    {
        title: 'Test First Article',
        date: '01-02-2021',
        fileName: 'id-test-first-article',
        isPublished: true,
        description: 'This is a summary',
        slug: 'id-test-first-title',
        cover: '/',
        tags: ['first'],
        blurDataURL: 'test-second-title',
        readTime: { text: '1 min read', time: 1, words: 1, minutes: 1 },
    },
    {
        title: 'Test Second Article',
        fileName: 'en-test-second-article',
        date: '01-03-2021',
        isPublished: true,
        description: 'this is a summary',
        slug: 'id-test-second-title',
        cover: '/',
        tags: ['second'],
        blurDataURL: 'test-second-title',
        readTime: { text: '1 min read', time: 1, words: 1, minutes: 1 },
    },
]

describe('Search Article', () => {
    const renderSearchArticlesComponent = async () => {
        const util = render(<Blog posts={posts} tags={['first', 'second']} />)

        const input = await util.findByPlaceholderText('Search Articles...')

        return {
            input,
            ...util,
        }
    }

    it('Should just have render Test First Article', async () => {
        const { input, getAllByRole, getByRole } =
            await renderSearchArticlesComponent()

        await userEvent.click(
            getByRole('button', { name: /Read in Bahasa Indonesia/i })
        )

        await userEvent.type(input, 'Test First Article')

        const result = await getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
[
  "Test First Article",
]
`)
    })

    it('Should render all post named contain article', async () => {
        const { input, getAllByRole, getByRole } =
            await renderSearchArticlesComponent()

        userEvent.click(
            getByRole('button', { name: /Read in Bahasa Indonesia/i })
        )

        await waitFor(() => userEvent.type(input, 'article'))

        const result = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
[
  "Test First Article",
  "Test Second Article",
]
`)
    })

    it('Should not found the article', async () => {
        const { input, getByText } = await renderSearchArticlesComponent()

        userEvent.type(input, 'Test Third Article')

        expect(getByText(/No Articles found./i)).toBeInTheDocument()
    })

    it('Should find tag second', async () => {
        const { getAllByRole, getByRole } =
            await renderSearchArticlesComponent()

        userEvent.click(
            getByRole('button', { name: /Read in Bahasa Indonesia/i })
        )

        await waitFor(() =>
            userEvent.click(getByRole('button', { name: /second/i }))
        )

        const result = getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
    [
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
    [
      "Test First Article",
      "Test Second Article",
    ]
`)
    })

    it('Should change languange to English', async () => {
        const { getByRole, findByText } = await renderSearchArticlesComponent()

        userEvent.click(
            getByRole('button', { name: /Read in Bahasa Indonesia/i })
        )

        const result = await findByText(/Read in English/i)

        expect(result).toBeInTheDocument()
    })
})
