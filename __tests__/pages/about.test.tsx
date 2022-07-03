/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '../../__mocks__/utils/test-providers'
import About from '../../src/pages/about'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
}))

describe('About', () => {
    it('Show Title in About Page', () => {
        const { getByRole } = render(<About />)

        const hello = getByRole('heading', {
            name: /About Me/i,
        })
        expect(hello).toBeInTheDocument()
    })
})
