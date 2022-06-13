/**
 * @jest-environment jsdom
 */

import { renderWithClient } from '../../__mocks__/utils/react-query'
import { Notifications, Notify } from '../../src/components/Notifications'
import { useNotification } from '../../src/context/useNotification'
import userEvent from '@testing-library/user-event'

const mockedUseNotification = useNotification as jest.Mock

jest.mock('../../src/context/useNotification', () => ({
    useNotification: jest.fn(() => {}),
}))

jest.mock('firebase/messaging', () => jest.fn())
jest.mock('firebase/app', () => jest.fn())

describe('Notification', () => {
    it('Should render status not subscriber', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: false },
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('subscribe')).toBeInTheDocument()

        userEvent.click(
            result.getByRole('button', { name: 'turn on Notification' })
        )
    })

    it('Should render status subsrsiber', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: true },
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('unsubscribe')).toBeInTheDocument()

        userEvent.click(
            result.getByRole('button', { name: 'turn off Notification' })
        )
    })

    it('Should render status loading', async () => {
        mockedUseNotification.mockImplementation(() => ({
            isLoading: true,
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('loading')).toBeInTheDocument()
    })

    it('Should render notification when triggered', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: false },
        }))

        const result = renderWithClient(
            <Notify title="Test Notif" body="Test body" />
        )

        expect(await result.findByText(/Test Notif/i)).toBeInTheDocument()
    })
})
