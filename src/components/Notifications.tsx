import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {
    getMessaging,
    MessagePayload,
    onMessage,
    getToken,
} from 'firebase/messaging'
import { firebaseApp } from '../lib/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBellSlash,
    faBell,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { useNotification } from '@/domain/useNotification'

export const Notifications = (): React.ReactElement => {
    const [token, setToken] = React.useState<string | null>('')
    const [status, setStatus] = React.useState<boolean>(false)
    const { isLoading, data } = useNotification({ token, status })

    const handleSubscribeNotification = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/subscribe`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                token: token,
            }),
        }).then((res) => {
            if (res.ok) {
                setStatus(true)
            }
        })
    }

    const handleUnsubscribeNotification = () => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/notification/unsubscribe`,
            {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    token: token,
                }),
            }
        ).then((res) => {
            if (res.ok) {
                setStatus(false)
            }
        })
    }

    React.useEffect(() => {
        const notification = async () => {
            if (!('Notification' in window)) {
                return
            }

            const app = await firebaseApp.Init()

            if (
                Notification.permission === 'denied' ||
                Notification.permission === 'default'
            ) {
                await Notification.requestPermission()
            } else {
                const messaging = getMessaging(app)

                const fcm_token: string = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
                })

                if (!fcm_token) {
                    return
                }
                setToken(fcm_token)
            }

            const messaging = getMessaging(app)

            onMessage(messaging, (payload: MessagePayload) => {
                notify(
                    '/icons/icon-512x512.png',
                    payload.notification.title,
                    payload.notification.body
                )
            })
        }
        notification()
    }, [token, data])

    if (isLoading) {
        return (
            <FontAwesomeIcon
                className="animate-spin mx-4 h-full m-auto"
                size="lg"
                icon={faSpinner}
                title="loading"
            />
        )
    }

    if (data?.status) {
        return (
            <>
                <button
                    className="hover:bg-gray-100"
                    onClick={handleUnsubscribeNotification}
                    aria-label="turn off Notification"
                >
                    <FontAwesomeIcon
                        className="block mx-4 h-full m-auto"
                        size="lg"
                        icon={faBell}
                        title="unsubscribe"
                    />
                </button>
                <Toaster position="top-center" reverseOrder={false} />
            </>
        )
    }

    return (
        <>
            <button
                className="hover:bg-gray-100"
                onClick={handleSubscribeNotification}
                aria-label="turn on Notification"
            >
                <FontAwesomeIcon
                    className="block mx-4 m-auto h-full"
                    icon={faBellSlash}
                    size="lg"
                    title="subscribe"
                />
            </button>
        </>
    )
}

const notify = (image, title, message) =>
    toast.custom((t) => (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Close
                </button>
            </div>
        </div>
    ))
