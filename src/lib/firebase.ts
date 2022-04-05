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

    Messaging: async (app: FirebaseApp): Promise<string | null> => {
        try {
            if (!('Notification' in window)) {
                throw new Error('This browser does not support notifications.')
            } else {
                if (
                    Notification.permission === 'denied' ||
                    Notification.permission === 'default'
                ) {
                    await Notification.requestPermission()
                } else {
                    const messaging = getMessaging(app)

                    //getting token from FCM
                    const fcm_token: string = await getToken(messaging, {
                        vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
                    })

                    if (fcm_token) {
                        return fcm_token
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
        return null
    },
}

export { firebaseApp }
