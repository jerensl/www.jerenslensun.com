/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../../src/pages/blog/index'
import {
    getAllPublishArticle,
    sortByLatestDate,
} from '../../../src/domain/Blog'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes, faRssSquare } from '@fortawesome/free-solid-svg-icons'

library.add(
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
    faTimes,
    faBars,
    faRssSquare
)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
}))

const renderBlogSlug = async () => {
    const posts = await getAllPublishArticle(
        '__mocks__/contents',
        sortByLatestDate
    )

    const utils = render(<Blog posts={posts} tags={['Testing 101']} />)

    return { utils }
}

describe('Blog', () => {
    it('Show Title Page', async () => {
        const { utils } = await renderBlogSlug()

        const heading = utils.getByRole('heading', {
            name: /Blog/i,
        })

        expect(heading).toBeInTheDocument()
    })

    it('This blog pages will show the list of article', async () => {
        const { utils } = await renderBlogSlug()

        userEvent.click(utils.getByRole('button', { name: /Read in English/i }))

        const result = utils.getAllByRole('article').map((article) => {
            return within(article).getByRole('heading').textContent
        })

        expect(result).toMatchInlineSnapshot(`
      Array [
        "Testing 101",
      ]
      `)
    })
})
