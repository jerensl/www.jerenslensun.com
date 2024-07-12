/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '../../__mocks__/utils/test-providers'
import { CopyToClipboard } from '../../src/components/CopyClipboard'
import userEvent from '@testing-library/user-event'

describe('Copy To Clipboard', () => {
    it('copy all text inside the element', async () => {
        const user = userEvent.setup()

        const { getByRole, getByText } = render(
            <CopyToClipboard>
                <span>Hello</span>
            </CopyToClipboard>
        )

        const elm = getByText('Hello')

        await user.hover(elm)

        const button = getByRole('button')

        await user.click(button)

        const clipboardText = await navigator.clipboard.readText()

        expect(elm).toBeInTheDocument()
        expect(clipboardText).toBe('Hello')
    })
})
