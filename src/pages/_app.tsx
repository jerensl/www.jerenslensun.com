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
    useEffect(() => {
        if (!('Notification' in window)) {
            console.error('This browser does not support desktop notification')
            return
        }

        firebaseApp.Init()
    }, [])
    return (
        <div>
            <NavbarMobile />
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
