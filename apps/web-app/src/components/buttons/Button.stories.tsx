import type { Meta, StoryObj } from '@storybook/nextjs'
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
        size: 'base',
    },
    decorators: [],
}

export const Filled: Story = {
    args: {
        onClick: () => {},
        variant: 'filled',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const FilledTonal: Story = {
    args: {
        onClick: () => {},
        variant: 'filled-tonal',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const Outlined: Story = {
    args: {
        onClick: () => {},
        variant: 'outlined',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}

export const Text: Story = {
    args: {
        onClick: () => {},
        variant: 'text',
        label: 'Home',
        size: 'base',
    },
    decorators: [],
}
