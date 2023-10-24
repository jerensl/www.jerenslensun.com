import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'Components/Buttons/Button',
    component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Elevated: Story = {
    args: {
        onClick: () => {},
        variant: 'elevated',
        label: 'Home',
    },
    decorators: [],
}

export const Filled: Story = {
    args: {
        onClick: () => {},
        variant: 'filled',
        label: 'Home',
    },
    decorators: [],
}

export const FilledTonal: Story = {
    args: {
        onClick: () => {},
        variant: 'filled-tonal',
        label: 'Home',
    },
    decorators: [],
}

export const Outlined: Story = {
    args: {
        onClick: () => {},
        variant: 'outlined',
        label: 'Home',
    },
    decorators: [],
}

export const Text: Story = {
    args: {
        onClick: () => {},
        variant: 'text',
        label: 'Home',
    },
    decorators: [],
}
