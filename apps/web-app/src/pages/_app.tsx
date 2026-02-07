import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css'
import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import Layout from '@/components/Layout'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())
    const mockingEnabled = !!process.env.NEXT_PUBLIC_API_MOCKING
    const [shouldRender, setShouldRender] = React.useState(!mockingEnabled)

    React.useEffect(() => {
        if (mockingEnabled) {
            import('../mocks/init').then(async ({ initMocks }) => {
                await initMocks()
                setShouldRender(true)
            })
        }
    }, [])

    if (!shouldRender) {
        return 'Loading mocks...'
    }

    const Components = Component as any
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <Layout>
                    <Components {...pageProps} />
                    {process.env.NODE_ENV ? (
                        <ReactQueryDevtools initialIsOpen={false} />
                    ) : null}
                </Layout>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default MyApp
