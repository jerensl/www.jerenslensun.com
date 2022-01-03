/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Navbar } from '../../src/components/Navbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faTwitterSquare, faLinkedin, faTimes, faBars)

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
