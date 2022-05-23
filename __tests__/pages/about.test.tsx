/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '../../__mocks__/utils/test-providers'
import userEvent from '@testing-library/user-event'
import About from '../../src/pages/about'
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

describe('About', () => {
    it('Show answer on FAQ', () => {
        const { getByText, getByRole } = render(<About />)

        const hello = getByRole('heading', {
            name: /About Me/i,
        })
        expect(hello).toBeInTheDocument()
    })
})
