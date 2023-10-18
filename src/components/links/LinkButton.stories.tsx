import type { Meta, StoryObj } from '@storybook/react'
import { LinkButton } from './LinkButton'

const meta: Meta<typeof LinkButton> = {
    title: 'Components/Buttons/LinkButton',
    component: LinkButton,
}

export default meta
type Story = StoryObj<typeof LinkButton>

export const Basic: Story = {
    args: {
        href: '/',
        type: 'filled',
        label: 'Home',
    },
    decorators: [],
}

export const Outlined: Story = {
    args: {
        href: '/',
        type: 'outlined',
        label: 'Home',
    },
    decorators: [],
}
