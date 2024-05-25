import { render } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const handlers = [
    http.post('*/status', () => {
        return HttpResponse.json({
            isActive: false,
            updatedAt: new Date().getTime(),
        })
    }),
    http.post('*/notification/subscribe', () => {
        return new HttpResponse(null, { status: 201 })
    }),
    http.post('*/notification/unsubscribe', () => {
        return new HttpResponse(null, { status: 200 })
    }),
    http.get(' https://ik.imagekit.io/jerensl/*', () => {
        return new HttpResponse(null, { status: 200 })
    }),
]

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>
                    {rerenderUi}
                </QueryClientProvider>
            ),
    }
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient()
    // eslint-disable-next-line react/display-name
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>
            {children}
        </QueryClientProvider>
    )
}
