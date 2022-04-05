import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NavbarMobile } from '@/components/NavbarMobile'
import { QueryClient, QueryClientProvider } from 'react-query'

config.autoAddCss = false

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <NavbarMobile />
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    )
}

export default MyApp
