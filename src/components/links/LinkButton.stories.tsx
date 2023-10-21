import type { Meta, StoryObj } from '@storybook/react'
import { LinkButton } from './LinkButton'

const meta: Meta<typeof LinkButton> = {
    title: 'Components/Links/Button',
    component: LinkButton,
}

export default meta
type Story = StoryObj<typeof LinkButton>

export const Elevated: Story = {
    args: {
        href: '/',
        variant: 'elevated',
        label: 'Home',
    },
    decorators: [],
}

export const Filled: Story = {
    args: {
        href: '/',
        variant: 'filled',
        label: 'Home',
    },
    decorators: [],
}

export const FilledTonal: Story = {
    args: {
        href: '/',
        variant: 'filled-tonal',
        label: 'Home',
    },
    decorators: [],
}

export const Outlined: Story = {
    args: {
        href: '/',
        variant: 'outlined',
        label: 'Home',
    },
    decorators: [],
}

export const Text: Story = {
    args: {
        href: '/',
        variant: 'text',
        label: 'Home',
    },
    decorators: [],
}
