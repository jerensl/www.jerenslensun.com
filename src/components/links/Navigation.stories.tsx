import type { Meta, StoryObj } from '@storybook/react'
import { Navigation } from './Navigation'

const meta: Meta<typeof Navigation> = {
    title: 'Components/Links/Navigation',
    component: Navigation,
}

export default meta
type Story = StoryObj<typeof Navigation>

export const Elevated: Story = {
    args: {
        href: '/',
        variant: 'elevated',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const Filled: Story = {
    args: {
        href: '/',
        variant: 'filled',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const FilledTonal: Story = {
    args: {
        href: '/',
        variant: 'filled-tonal',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const Outlined: Story = {
    args: {
        href: '/',
        variant: 'outlined',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const Text: Story = {
    args: {
        href: '/',
        variant: 'text',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}
