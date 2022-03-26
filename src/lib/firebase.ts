import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseApp = {
    Init: async (): Promise<string | null> => {
        const app = initializeApp({
            apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
            authDomain: 'jerens-app.firebaseapp.com',
            projectId: 'jerens-app',
            storageBucket: 'jerens-app.appspot.com',
            messagingSenderId: '1009489116025',
            appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
            measurementId: 'G-SNRQJJZH3L',
        })

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
                    console.log(fcm_token)
                    new Notification('Thank you for subscribe!')
                    return fcm_token
                }
            }
        } catch (error) {
            console.error(error)
            return null
        }
        return null
    },
}

export { firebaseApp }
