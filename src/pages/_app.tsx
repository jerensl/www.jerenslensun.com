import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faGithubSquare, faTwitterSquare, faLinkedin, faTimes, faBars)

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
