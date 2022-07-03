/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '../../__mocks__/utils/test-providers'
import { CopyToClipboard } from '../../src/components/copy-clipboard'
import userEvent from '@testing-library/user-event'

describe('Should Test Copy Clipboard', () => {
    it('Should Copy the Text in the Element', async () => {
        const { getByRole, getByText } = render(
            <CopyToClipboard>
                <span>Hello</span>
            </CopyToClipboard>
        )

        const elm = getByText('Hello')

        userEvent.hover(elm)

        const button = getByRole('button')

        userEvent.click(button)

        expect(elm).toBeInTheDocument()
    })
})
