/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import NotFound from '../../src/pages/404'

describe('NotFound', () => {
    it('renders a heading', () => {
        render(<NotFound />)

        const heading = screen.getByRole('heading', {
            name: /404 - Page Not Found/i,
        })

        expect(heading).toBeInTheDocument()
    })
})
