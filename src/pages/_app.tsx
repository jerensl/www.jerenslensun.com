import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getCredentialsToken } from '../lib/firebase-init'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faBars, faTimes, faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { Notifications } from '../components/Notifications'

library.add(
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
    faTimes,
    faBars,
    faRssSquare
)

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification')
        } else if (Notification.permission === 'granted') {
            // If it's okay let's create a notification
            getCredentialsToken()
            // onMessageListener()
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission((status) => {
                // If the user accepts, let's create a notification
                if (status === 'granted') {
                    new Notification('Thank you for subscribe!')
                }
            })
        }
    }, [])
    return <Component {...pageProps} />
}

export default MyApp
