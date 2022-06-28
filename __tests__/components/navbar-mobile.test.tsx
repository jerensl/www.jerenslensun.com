/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '../../__mocks__/utils/test-providers'
import { NavbarMobile } from '../../src/components/navbar'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
jest.mock('firebase/messaging', () => jest.fn())
jest.mock('firebase/app', () => jest.fn())

describe('Navbar Mobile Aria Label', () => {
    it('Should have link redirect to homepage', () => {
        useRouter.mockImplementation(() => ({
            route: '/',
            pathname: '/',
        }))

        render(<NavbarMobile />)

        screen.getByRole('link', { current: 'page' })
    })

    it('Should have link redirect to blogpage', () => {
        useRouter.mockImplementation(() => ({
            route: '/blog',
            pathname: '/blog',
        }))

        render(<NavbarMobile />)

        screen.getByRole('link', { current: 'page' })
    })

    it('Should have link redirect to aboutpage', () => {
        useRouter.mockImplementation(() => ({
            route: '/about',
            pathname: '/about',
        }))

        render(<NavbarMobile />)

        screen.getByRole('link', { current: 'page' })
    })

    it('Should have link redirect to projectpage', () => {
        useRouter.mockImplementation(() => ({
            route: '/project',
            pathname: '/project',
        }))

        render(<NavbarMobile />)

        screen.getByRole('link', { current: 'page' })
    })
})
