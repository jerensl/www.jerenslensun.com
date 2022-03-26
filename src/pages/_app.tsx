import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { firebaseApp } from '../lib/firebase'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NavbarMobile } from '@/components/NavbarMobile'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <NavbarMobile />
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
