import type { Meta, StoryObj } from '@storybook/nextjs'
import { ContentCard } from './Content'

const meta: Meta<typeof ContentCard> = {
    title: 'Components/Cards/Content',
    component: ContentCard,
}

export default meta
type Story = StoryObj<typeof ContentCard>

export const Card: Story = {
    args: {
        variant: 'filled',
        imageURL:
            'https://ik.imagekit.io/jerensl/tr:di-default-content.jpg/none.png',
        slug: '/',
        title: 'Content Title',
        description: 'Content description...',
    },
    decorators: [],
}
