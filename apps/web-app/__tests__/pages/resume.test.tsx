import React from 'react'
import { render } from '../../__mocks__/utils/test-providers'
import Resume from '@/pages/resume'

jest.mock('remark-math', () => jest.fn())
jest.mock('rehype-katex', () => jest.fn())
jest.mock('unist-util-visit', () => jest.fn())
jest.mock('hast-util-to-string', () => jest.fn())
jest.mock('refractor', () => jest.fn())
jest.mock('hast-util-to-html', () => jest.fn())
jest.mock('unified', () => jest.fn())
jest.mock('rehype-parse', () => jest.fn())
jest.mock('plaiceholder', () => ({
    getPlaiceholder: jest.fn(() => ({ base64: 'data:image/png;base64,AA' })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
    route: '/resume',
    pathname: '/resume',
}))

describe('Resume', () => {
    it('renders the resume heading, contact email, and PDF link', () => {
        const { getByRole, getAllByRole } = render(
            <Resume
                projects={[]}
                highlights={['One impact item']}
                currentYear={2026}
            />
        )

        const headings = getAllByRole('heading', { name: /Jerens S. Lensun/i })
        expect(headings.length).toBeGreaterThan(0)

        const downloadLinks = getAllByRole('link', { name: /download pdf/i })
        expect(downloadLinks.length).toBeGreaterThan(0)
        expect(downloadLinks[0]).toHaveAttribute('href', '/resume.pdf')

        expect(
            getByRole('link', { name: /jerensslensun@gmail.com/i })
        ).toHaveAttribute('href', expect.stringContaining('mailto:'))
    })

    it('renders featured projects and the last-updated note', () => {
        const { getByRole, getByText, getAllByRole } = render(
            <Resume
                projects={[
                    {
                        slug: 'servo',
                        title: 'Servo case study',
                        description: 'Browser engine work.',
                        tags: ['Rust'],
                    },
                ]}
                highlights={[]}
                currentYear={2026}
            />
        )

        expect(
            getByRole('link', { name: /Servo case study/i })
        ).toHaveAttribute('href', '/project/servo')

        expect(getByText(/Last updated/i)).toBeInTheDocument()
    })
})
