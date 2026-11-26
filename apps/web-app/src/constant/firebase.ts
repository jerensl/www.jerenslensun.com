import { initializeApp, FirebaseApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseApp = {
    Init: async (): Promise<FirebaseApp> => {
        const app = initializeApp({
            apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
            authDomain: 'jerens-app.firebaseapp.com',
            projectId: 'jerens-app',
            storageBucket: 'jerens-app.appspot.com',
            messagingSenderId: '1009489116025',
            appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
            measurementId: 'G-SNRQJJZH3L',
        })

        return app
    },
    GetToken: async (): Promise<string> => {
        const app = await firebaseApp.Init()
        const messaging = getMessaging(app)
        const registration = await navigator.serviceWorker.ready
        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
            serviceWorkerRegistration: registration,
        })
        return token
    },
}

export { firebaseApp }