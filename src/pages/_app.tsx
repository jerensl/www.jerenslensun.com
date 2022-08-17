import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar, NavbarMobile } from '../components/navbar'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css'
import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())

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
