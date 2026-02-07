import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { SearchArticles } from './SearchArticles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const meta: Meta<typeof SearchArticles> = {
    title: 'Components/Inputs',
    component: SearchArticles,
}

export default meta
type Story = StoryObj<typeof SearchArticles>

export const Basic: Story = {
    args: {
        name: 'Search',
        placeholder: 'Search',
    },
    decorators: [],
}
