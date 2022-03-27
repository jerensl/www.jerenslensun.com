import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NavbarMobile } from '@/components/NavbarMobile'
import { Notifications } from '@/components/Notifications'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <NavbarMobile />
            <Notifications />
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
