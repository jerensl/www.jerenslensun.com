importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

const firebaseConfig = {
    apiKey: 'AIzaSyAlgD74xXwIcDLkdju_zeB9ntqCiGN5xko',
    authDomain: 'jerens-app.firebaseapp.com',
    projectId: 'jerens-app',
    storageBucket: 'jerens-app.appspot.com',
    messagingSenderId: '1009489116025',
    appId: '1:1009489116025:web:c64b30012bbc6a7f274da8',
    measurementId: 'G-SNRQJJZH3L',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload)

    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo192.png',
    }

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})
