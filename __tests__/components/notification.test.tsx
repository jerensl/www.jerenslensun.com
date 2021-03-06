/**
 * @jest-environment jsdom
 */

import { renderWithClient } from '../../__mocks__/utils/react-query'
import { Notifications, Notify } from '../../src/components/notifications'
import { useNotification } from '../../src/hooks/useNotification'
import userEvent from '@testing-library/user-event'

const mockedUseNotification = useNotification as jest.Mock

jest.mock('../../src/hooks/useNotification', () => ({
    useNotification: jest.fn(() => {}),
    useSubs: jest.fn(() => {}),
    useUnsubs: jest.fn(() => {}),
}))

jest.mock('firebase/messaging', () => jest.fn())
jest.mock('firebase/app', () => jest.fn())

describe('Notification', () => {
    it('Should render status not subscriber', () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { isActive: false },
        }))

        const result = renderWithClient(<Notifications />)

        expect(result.getByTestId('subscribe')).toBeInTheDocument()

        userEvent.click(
            result.getByRole('button', { name: 'turn on Notification' })
        )
    })

    it('Should render status subsrsiber', () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { isActive: true },
        }))

        const result = renderWithClient(<Notifications />)

        expect(result.getByTestId('unsubscribe')).toBeInTheDocument()

        userEvent.click(
            result.getByRole('button', { name: 'turn off Notification' })
        )
    })

    it('Should render status loading', () => {
        mockedUseNotification.mockImplementation(() => ({
            isLoading: true,
        }))

        const result = renderWithClient(<Notifications />)

        expect(result.getByTestId('loading')).toBeInTheDocument()
    })

    it('Should render notification when triggered', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { isActive: false },
        }))

        const result = renderWithClient(
            <Notify title="Test Notif" body="Test body" />
        )

        expect(await result.findByText(/Test Notif/i)).toBeInTheDocument()
    })
})
