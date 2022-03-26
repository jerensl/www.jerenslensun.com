import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getCredentialsToken } from '../lib/firebase-init'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NavbarMobile } from '@/components/NavbarMobile'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification')
        } else if (window.Notification.permission === 'granted') {
            // If it's okay let's create a notification
            getCredentialsToken()
        } else if (window.Notification.permission !== 'denied') {
            Notification.requestPermission((status) => {
                // If the user accepts, let's create a notification
                if (status === 'granted') {
                    new Notification('Thank you for subscribe!')
                }
            })
        }
    }, [])
    return (
        <div>
            <NavbarMobile />
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
