import { initializeApp, FirebaseApp } from 'firebase/app'

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
}

export { firebaseApp }
