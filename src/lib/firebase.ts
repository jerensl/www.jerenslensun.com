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
            const messaging = getMessaging(app)
            //requesting notification permission from browser
            const status = await Notification.requestPermission()
            if (status && status === 'granted') {
                //getting token from FCM
                const fcm_token: string = await getToken(messaging, {
                    vapidKey: process.env.FCM_VAPID_KEY,
                })

                if (fcm_token) {
                    return fcm_token
                }
            }
        } catch (error) {
            console.error(error)
            return null
        }
        return null
    },
    Status: async (token: string): Promise<object | null> => {
        try {
            const response = await fetch(
                'https://api.jerenslensun.com/api/notification/status',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                    }),
                }
            )
            return response.json()
        } catch (error) {
            console.error(error)
            return null
        }
    },

    Subscribe: async (token: string): Promise<boolean | null> => {
        try {
            const response = await fetch(
                'https://api.jerenslensun.com/api/notification/subscribe',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                    }),
                }
            )

            return response.ok
        } catch (error) {
            console.error(error)
            return null
        }
    },
}

export { firebaseApp }
