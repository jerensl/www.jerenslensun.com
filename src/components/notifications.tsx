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
import { useNotification, useSubs, useUnsubs } from '../hooks/useNotification'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { imageLoader } from '../lib/images'

export const Notifications = (): React.ReactElement => {
    const [token, setToken] = React.useState<string>('')
    const { isLoading, data } = useNotification({ token })
    const subsMutation = useSubs()
    const unSubsMutation = useUnsubs()

    const handleSubscribeNotification = async () => {
        if (!('Notification' in window)) {
            return
        }
        if (
            Notification.permission === 'denied' ||
            Notification.permission === 'default'
        ) {
            await Notification.requestPermission()
        } else {
            subsMutation.mutate({ token })
        }
    }

    const handleUnsubscribeNotification = async () => {
        unSubsMutation.mutate({ token })
    }

    React.useEffect(() => {
        const notification = async () => {
            if (
                !('Notification' in window) ||
                Notification.permission === 'denied' ||
                Notification.permission === 'default'
            ) {
                return
            }

            const app = await firebaseApp.Init()

            const messaging = getMessaging(app)

            const fcm_token: string = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
            })

            if (token === '') {
                setToken(fcm_token)
            }

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
        notification()
    }, [token])

    if (isLoading) {
        return (
            <div className="hover:bg-gray-100 m-auto">
                <FontAwesomeIcon
                    className="animate-spin m-3"
                    size="lg"
                    icon={faSpinner}
                    data-testid="loading"
                />
            </div>
        )
    }

    return (
        <>
            {data?.isActive ? (
                <NotificationButton
                    ariaLabel="turn off Notification"
                    handleClick={handleUnsubscribeNotification}
                >
                    <FontAwesomeIcon
                        className="block m-3"
                        size="lg"
                        icon={faBell}
                        data-testid="unsubscribe"
                    />
                </NotificationButton>
            ) : (
                <NotificationButton
                    ariaLabel="turn on Notification"
                    handleClick={handleSubscribeNotification}
                >
                    <FontAwesomeIcon
                        className="block m-3"
                        icon={faBellSlash}
                        size="lg"
                        data-testid="subscribe"
                    />
                </NotificationButton>
            )}
        </>
    )
}

interface NotificationButtonProps {
    children: React.ReactChild
    handleClick: () => void
    ariaLabel: string
}

const NotificationButton = ({
    children,
    handleClick,
    ariaLabel,
}: NotificationButtonProps): React.ReactElement => {
    return (
        <button
            className="hover:bg-gray-100 m-auto rounded-full"
            onClick={handleClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}

interface NotifyProps {
    title: string
    body: string
}

export const Notify = ({ title, body }: NotifyProps): React.ReactElement => {
    return (
        <div className="w-full max-w-xs p-1 text-gray-500" role="alert">
            <div className="flex">
                <Image
                    loader={imageLoader}
                    src="logo.png"
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
