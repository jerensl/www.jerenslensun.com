/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import NotFound from '../../src/pages/404'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faTwitterSquare, faLinkedin, faTimes, faBars)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('NotFound', () => {
    it('renders a heading', () => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
        }))

        render(<NotFound />)

        const heading = screen.getByRole('heading', {
            name: /404 - Page Not Found/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
