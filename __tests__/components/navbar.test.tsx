/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '../../__mocks__/utils/test-providers'
import { Navbar } from '../../src/components/Navbar'

jest.mock('firebase/messaging', () => jest.fn())
jest.mock('firebase/app', () => jest.fn())

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Navbar Aria Label', () => {
    it('Should have link redirect to homepage', () => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
        }))

        render(<Navbar />)

        screen.getByRole('link', { current: 'page' })
    })

    it('Should have link redirect to about', () => {
        useRouter.mockImplementation(() => ({
            route: '/blog',
            pathname: '/blog',
        }))

        render(<Navbar />)

        screen.getByRole('link', { current: 'page' })
    })

    it('Should have link redirect to about', () => {
        useRouter.mockImplementation(() => ({
            route: '/about',
            pathname: '/about',
        }))

        render(<Navbar />)

        screen.getByRole('link', { current: 'page' })
    })
})
