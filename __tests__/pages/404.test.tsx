/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '../../__mocks__/utils/test-providers'
import NotFound from '../../src/pages/404'

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
