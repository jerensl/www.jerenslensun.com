import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconBoxButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const meta: Meta<typeof IconButton> = {
    title: 'Components/IconButton',
    component: IconButton,
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Basic: Story = {
    args: {
        children: (
            <FontAwesomeIcon
                className="block"
                size="lg"
                icon={faSun}
                data-testid="theme-dark"
            />
        ),
        shape: 'standard',
    },
    decorators: [],
}

export const Circle: Story = {
    args: {
        children: (
            <FontAwesomeIcon
                className="block"
                size="lg"
                icon={faSun}
                data-testid="theme-dark"
            />
        ),
        shape: 'circle',
    },
    decorators: [],
}

export const Outlined: Story = {
    args: {
        children: (
            <FontAwesomeIcon
                className="block"
                size="lg"
                icon={faSun}
                data-testid="theme-dark"
            />
        ),
        shape: 'standard',
        outlined: true,
    },
    decorators: [],
}
