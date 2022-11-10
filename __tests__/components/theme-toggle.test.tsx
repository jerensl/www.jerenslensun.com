/**
 * @jest-environment jsdom
 */

import { renderWithClient } from '../../__mocks__/utils/react-query'
import ThemeToggle from '../../src/components/ThemeToggle'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/dom'

describe('Theme', () => {
    it('Should switch theme dark or light', async () => {
        const result = renderWithClient(<ThemeToggle />)

        expect(result.getByTestId('theme-light')).toBeInTheDocument()

        await waitFor(() =>
            userEvent.click(
                result.getByRole('button', { name: 'dark theme toggle' })
            )
        )

        expect(result.getByTestId('theme-light')).toBeInTheDocument()
    })
})
