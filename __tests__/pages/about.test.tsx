/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import About from '../../src/pages/about'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
}))

describe('About', () => {
    it('Show answer on FAQ', () => {
        const { getByText } = render(<About />)

        userEvent.click(getByText('Where are you from?'))

        expect(getByText('I am from Manado, Indonesia.'))
    })
})
