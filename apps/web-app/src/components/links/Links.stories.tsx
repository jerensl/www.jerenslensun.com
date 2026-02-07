import type { Meta, StoryObj } from '@storybook/nextjs'
import { HighlightLink } from './HighlightLink'

const meta: Meta<typeof HighlightLink> = {
    title: 'Components/Links',
    component: HighlightLink,
}

export default meta
type Story = StoryObj<typeof HighlightLink>

export const Basic: Story = {
    args: {
        href: '/',
        isExternal: false,
        children: 'Home',
    },
    decorators: [],
}
