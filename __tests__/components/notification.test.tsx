/**
 * @jest-environment jsdom
 */

import { renderWithClient } from '../../__mocks__/utils/react-query'
import { Notifications } from '../../src/components/Notifications'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faTwitterSquare, faLinkedin, faTimes, faBars)
import { useNotification } from '@/domain/useNotification'

const mockedUseNotification = useNotification as any

jest.mock('@/domain/useNotification', () => ({
    useNotification: jest.fn(() => {}),
}))

describe('Notification', () => {
    it('Should render status not subscriber', async () => {
        mockedUseNotification.mockImplementation(() => ({
            isSucces: true,
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('subscribe')).toBeInTheDocument()
    })

    it('Should render status subsrsiber', async () => {
        mockedUseNotification.mockImplementation(() => ({
            data: { status: true },
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('unsubscribe')).toBeInTheDocument()
    })

    it('Should render status loading', async () => {
        mockedUseNotification.mockImplementation(() => ({
            isLoading: true,
        }))

        const result = renderWithClient(<Notifications />)

        expect(await result.findByTitle('loading')).toBeInTheDocument()
    })
})
