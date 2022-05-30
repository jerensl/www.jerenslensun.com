import React from 'react'
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
import { useNotification } from '../context/useNotification'
import { toast } from 'react-toastify'

export const Notifications = (): React.ReactElement => {
    const [token, setToken] = React.useState<string | null>('')
    const [status, setStatus] = React.useState<boolean>(false)
    const { isLoading, isError, data } = useNotification({ token, status })

    const handleSubscribeNotification = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/subscribe`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                token: token,
            }),
        })
        setStatus(true)
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
        )
        setStatus(false)
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
                toast(
                    <Notify
                        title={payload.notification.title}
                        body={payload.notification.body}
                        image={payload.notification.image}
                    />,
                    {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 10000,
                        hideProgressBar: true,
                    }
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

const Notify = ({ title, body, image }): React.ReactElement => {
    return (
        <div className="w-full max-w-xs p-1 text-gray-500" role="alert">
            <div className="flex">
                <img
                    className="w-8 h-8 rounded-full shadow-lg"
                    src={image}
                    alt="Logo"
                />
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 ">
                        {title}
                    </span>
                    <div className="mb-2 text-sm font-normal">{body}</div>
                </div>
            </div>
        </div>
    )
}
