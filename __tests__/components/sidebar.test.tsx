/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import { Sidebar } from '../../src/components/Sidebar'
import userEvent from '@testing-library/user-event'
import { setupIntersectionObserverMock } from '../../__mocks__/api/interaction-observer-mock'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

library.add(faGithubSquare, faTwitterSquare, faLinkedin, faTimes, faBars)

beforeEach(() => {
    setupIntersectionObserverMock({
        observe: jest.fn(),
        disconnect: jest.fn(),
    })
})

jest.mock('next/router')

let eventName
let routeChangeHandler

useRouter.mockImplementation(() => {
    return {
        events: {
            on: jest.fn((event, callback) => {
                eventName = event
                routeChangeHandler = callback
            }),
            off: jest.fn((event, callback) => {
                eventName = event
                routeChangeHandler = callback
            }),
        },
    }
})

test('Test open & closed sidebar using button and overlay', async () => {
    const { queryByRole } = render(<Sidebar />)

    expect(queryByRole('dialog')).not.toBeInTheDocument()

    userEvent.click(screen.getByLabelText('Open Sidebar'))

    await waitFor(() => expect(queryByRole('dialog')).toBeInTheDocument())

    userEvent.click(screen.getByLabelText('Closed Sidebar'))

    await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())

    userEvent.click(screen.getByLabelText('Open Sidebar'))

    await waitFor(() => expect(queryByRole('dialog')).toBeInTheDocument())

    userEvent.click(screen.getByLabelText('Overlay'))

    await waitFor(() => expect(queryByRole('dialog')).not.toBeInTheDocument())
})
