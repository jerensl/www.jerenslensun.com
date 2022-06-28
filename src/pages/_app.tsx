import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navbar, NavbarMobile } from '../components/navbar'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-toastify/dist/ReactToastify.css'
import * as React from 'react'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient())

    const Components = Component as any
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Navbar />
            <NavbarMobile />
            <Components {...pageProps} />
            {process.env.NODE_ENV ? (
                <ReactQueryDevtools initialIsOpen={false} />
            ) : null}
        </QueryClientProvider>
    )
}

export default MyApp
