/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/index'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
}))

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /Jerens Lensun/i,
        })
        const subHeading = screen.getByText('Software Engineering')

        expect(heading).toBeInTheDocument()
        expect(subHeading).toBeInTheDocument()
    })
})
