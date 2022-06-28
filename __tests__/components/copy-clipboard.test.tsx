/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '../../__mocks__/utils/test-providers'
import { CopyToClipboard } from '../../src/components/copy-clipboard'
import userEvent from '@testing-library/user-event'

describe('Should Test Copy Clipboard', () => {
    it('Should have link redirect to homepage', async () => {
        const { getByRole, getByText } = render(
            <CopyToClipboard>Hello</CopyToClipboard>
        )

        userEvent.click(getByText('Hello'))

        const button = getByRole('button')

        userEvent.click(button)
    })
})
