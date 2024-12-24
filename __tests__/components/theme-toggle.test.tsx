/**
 * @jest-environment jsdom
 */

import ThemeToggle from '../../src/components/ThemeToggle'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/dom'
import { render } from '../../__mocks__/utils/test-providers'

describe('Theme', () => {
    it('Should switch theme dark or light', async () => {
        const result = render(<ThemeToggle />)

        expect(result.getByTestId('theme-light')).toBeInTheDocument()

        await waitFor(() =>
            userEvent.click(
                result.getByRole('button', { name: 'dark theme toggle' })
            )
        )

        expect(result.getByTestId('theme-light')).toBeInTheDocument()
    })
})
