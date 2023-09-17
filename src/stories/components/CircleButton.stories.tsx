import type { Meta, StoryObj } from '@storybook/react'
import { IconBoxButton } from '../../components/buttons/IconBoxButton'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
})

const meta: Meta<typeof IconBoxButton> = {
    title: 'Components/IconBoxButton',
    component: IconBoxButton,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconBoxButton>

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
    },
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
