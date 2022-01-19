/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
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
            name: /Hi, I am Jerens/i,
        })
        expect(hello).toBeInTheDocument()

        userEvent.click(getByText('Where are you from?'))
        expect(getByText('I am from Manado, Indonesia.')).toBeInTheDocument()
    })

    it('Not showing answer on FAQ when not being openned', () => {
        const { queryByText, getByRole } = render(<About />)

        const hello = getByRole('heading', {
            name: /Hi, I am Jerens/i,
        })
        expect(hello).toBeInTheDocument()

        expect(
            queryByText('I am from Manado, Indonesia.')
        ).not.toBeInTheDocument()
    })
})
