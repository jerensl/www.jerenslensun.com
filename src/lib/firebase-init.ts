// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
    authDomain: 'jerens-app.firebaseapp.com',
    projectId: 'jerens-app',
    storageBucket: 'jerens-app.appspot.com',
    messagingSenderId: '1009489116025',
    appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
    measurementId: 'G-SNRQJJZH3L',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

const { FCM_VAPID_KEY } = process.env

export const getCredentialsToken = async () => {
    const messaging = getMessaging(firebaseApp)
    let currentToken = ''

    try {
        currentToken = await getToken(messaging, { vapidKey: FCM_VAPID_KEY })
        if (currentToken) {
            const response = await fetch(
                'https://api.jerenslensun.com/api/notification/subscribe',
                {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'include', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: currentToken,
                    }), // body data type must match "Content-Type" header
                }
            )
            console.log(response.json)
        } else {
            console.log(currentToken)
        }
    } catch (error) {
        console.log('An error occurred while retrieving token. ', error)
    }

    return currentToken
}
