import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from '../../components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
})

const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Basic: Story = {
    args: {},
    decorators: [
        (Story) => {
            queryClient.setQueryData(['cash-key'], {
                //... set your mocked data here
            })
            return (
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            )
        },
    ],
}
