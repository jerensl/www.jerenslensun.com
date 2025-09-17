import type { Meta, StoryObj } from '@storybook/nextjs'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
    title: 'Components/Chips',
    component: Tag,
}

export default meta
type Story = StoryObj<typeof Tag>

export const Unchecked: Story = {
    args: {
        onClick: () => {},
        text: 'Unchecked',
    },
    decorators: [],
}

export const Checked: Story = {
    args: {
        onClick: () => {},
        text: 'Checked',
        selected: true,
    },
    decorators: [],
}

export const Disabled: Story = {
    args: {
        onClick: () => {},
        text: 'Disabled',
        disabled: true,
    },
    decorators: [],
}
