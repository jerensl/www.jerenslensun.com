import React from 'react'
import { render } from '../../../__mocks__/utils/test-providers'
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
    getPlaiceholder: jest.fn(() => ({ base64: '' })),
}))

useRouter.mockImplementation(() => ({ route: '/', pathname: '/' }))

const tags = [
    'mentorship',
    'outreachy',
    'open-source',
    'meshery',
    'golang',
    'gateway',
    'algorithm',
    'data',
    'strategy',
    'life',
    'conference',
    'oss-summit',
]

const posts: IBlogMetadata[] = [
    {
        title: 'Topic panel test',
        date: '2025-01-01',
        isPublished: true,
        description: 'Testing the topic panel',
        slug: 'en-topic-panel',
        cover: 'default.png',
        tags,
    },
]

const renderTopicPanel = () => render(<Blog posts={posts} tags={tags} />)

describe('Blog topic panel', () => {
    it('shows the most popular tags and expands all topics', async () => {
        const utils = renderTopicPanel()

        expect(
            utils.queryByRole('button', { name: /oss-summit/i })
        ).not.toBeInTheDocument()

        await userEvent.click(
            utils.getByRole('button', { name: /Show all 12 topics/i })
        )

        expect(
            utils.getByRole('button', { name: /Hide topics/i })
        ).toBeInTheDocument()
        expect(
            utils.getByRole('button', { name: /oss-summit/i })
        ).toBeInTheDocument()
        expect(
            utils.getByRole('button', { name: /Open Source & Community/i })
        ).toBeInTheDocument()
    })

    it('filters topics and hides empty groups', async () => {
        const utils = renderTopicPanel()

        await userEvent.click(
            utils.getByRole('button', { name: /Show all 12 topics/i })
        )

        await userEvent.type(
            utils.getByPlaceholderText('Filter topics...'),
            'golang'
        )

        expect(
            utils.getByRole('button', { name: /Engineering & Tooling/i })
        ).toBeInTheDocument()
        expect(
            utils.getByRole('button', { name: /golang/i })
        ).toBeInTheDocument()
        expect(
            utils.queryByRole('button', {
                name: /Open Source & Community/i,
            })
        ).not.toBeInTheDocument()
        expect(
            utils.queryByRole('button', { name: /oss-summit/i })
        ).not.toBeInTheDocument()
    })

    it('collapses and expands a topic group', async () => {
        const utils = renderTopicPanel()

        await userEvent.click(
            utils.getByRole('button', { name: /Show all 12 topics/i })
        )

        const eventsGroup = utils.getByRole('button', { name: /Events/i })

        expect(eventsGroup).toHaveAttribute('aria-expanded', 'true')
        expect(
            utils.getByRole('button', { name: /oss-summit/i })
        ).toBeInTheDocument()

        await userEvent.click(eventsGroup)

        expect(eventsGroup).toHaveAttribute('aria-expanded', 'false')
        expect(
            utils.queryByRole('button', { name: /oss-summit/i })
        ).not.toBeInTheDocument()

        await userEvent.click(eventsGroup)

        expect(eventsGroup).toHaveAttribute('aria-expanded', 'true')
        expect(
            utils.getByRole('button', { name: /oss-summit/i })
        ).toBeInTheDocument()
    })
})
