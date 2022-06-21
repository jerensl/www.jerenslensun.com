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
import { useNotification } from '../hooks/useNotification'
import { toast } from 'react-toastify'
import Image, { ImageLoader } from 'next/image'

const blobStorageIoImageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const Notifications = (): React.ReactElement => {
    const [token, setToken] = React.useState<string>('')
    const [status, setStatus] = React.useState<boolean>(false)
    const { isLoading, data } = useNotification({ token, status })

    const handleSubscribeNotification = async () => {
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/notification/subscribe`,
            {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    token: token,
                }),
            }
        )
        setStatus(true)
    }

    const handleUnsubscribeNotification = async () => {
        await fetch(
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

            if (
                Notification.permission === 'denied' ||
                Notification.permission === 'default'
            ) {
                await Notification.requestPermission()
            } else {
                const app = await firebaseApp.Init()

                const messaging = getMessaging(app)

                const fcm_token: string = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
                })

                if (!fcm_token) {
                    return
                }

                setToken(fcm_token)

                onMessage(messaging, (payload: MessagePayload) => {
                    toast(
                        <Notify
                            title={payload.notification.title}
                            body={payload.notification.body}
                        />,
                        {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 10000,
                            hideProgressBar: true,
                        }
                    )
                })
            }
        }
        notification()
    }, [token])

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

    return (
        <>
            {data?.status ? (
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
            ) : (
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
            )}
        </>
    )
}

export const Notify = ({ title, body }): React.ReactElement => {
    return (
        <div className="w-full max-w-xs p-1 text-gray-500" role="alert">
            <div className="flex">
                <Image
                    loader={blobStorageIoImageLoader}
                    src="Jerens_WebArtboard_1_4x_cfulb5.png"
                    alt="Person"
                    objectFit="cover"
                    height="40px"
                    width="40px"
                    className="w-8 h-8 rounded-full shadow-lg"
                />
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 ">
                        {title}
                    </span>
                    <p className="mb-2 text-sm font-normal">{body}</p>
                </div>
            </div>
        </div>
    )
}
