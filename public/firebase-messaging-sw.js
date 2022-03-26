importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
    authDomain: 'jerens-app.firebaseapp.com',
    projectId: 'jerens-app',
    storageBucket: 'jerens-app.appspot.com',
    messagingSenderId: '1009489116025',
    appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
    measurementId: 'G-SNRQJJZH3L',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192x192.png',
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
