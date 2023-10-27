import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ContentCard } from './Card'

const meta: Meta<typeof ContentCard> = {
    title: 'Components/Cards/Content',
    component: ContentCard,
}

export default meta
type Story = StoryObj<typeof ContentCard>

export const Card: Story = {
    args: {
        variant: 'filled',
        blurDataURL: '',
        imageURL: '',
        slug: '/',
        header: '',
        body: '',
    },
    decorators: [],
}
