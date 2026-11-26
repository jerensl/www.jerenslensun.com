// Firebase Messaging (merged from firebase-messaging-sw.js to avoid two root-scope SWs)
declare function importScripts(...urls: string[]): void
declare let firebase: any

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

firebase.initializeApp({
    apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
    authDomain: 'jerens-app.firebaseapp.com',
    projectId: 'jerens-app',
    storageBucket: 'jerens-app.appspot.com',
    messagingSenderId: '1009489116025',
    appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
    measurementId: 'G-SNRQJJZH3L',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload: any) => {})

// Workbox caching
import { setCacheNameDetails } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

self.__WB_DISABLE_DEV_LOGS = true

setCacheNameDetails({
    prefix: 'jerens-app',
    suffix: 'v1',
})

// Cache page navigations (html) with a Network First strategy
registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'pages',
        networkTimeoutSeconds: 3,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    })
)

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new StaleWhileRevalidate({
        cacheName: 'static-assets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    })
)

// Cache images with a Cache First strategy
registerRoute(
    ({ request }) => request.destination === 'image',
    new StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
            }),
        ],
    })
)

registerRoute(
    ({ url }) => url.origin === 'https://ik.imagekit.io/jerensl/',
    new StaleWhileRevalidate({
        cacheName: 'cdn-images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
                maxEntries: 30,
            }),
        ],
    })
)