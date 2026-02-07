import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { Navbar } from './Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
})

const meta: Meta<typeof Navbar> = {
    title: 'General/Navbar',
    component: Navbar,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Basic: Story = {
    args: {},
    decorators: [
        (Story) => {
            queryClient.setQueryData(['notification'], {})
            return (
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            )
        },
    ],
}
