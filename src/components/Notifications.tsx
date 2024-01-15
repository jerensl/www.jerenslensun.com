import React from 'react'
import {
    getMessaging,
    MessagePayload,
    onMessage,
    getToken,
} from 'firebase/messaging'
import { firebaseApp } from '../constant/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {
    useNotification,
    useSubs,
    useUnsubs,
} from '../features/notification/index'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { imageLoader } from '../constant/images'
import { IconToggle } from './buttons/IconToggle'

interface NotifiationsProps {
    initStatus?: boolean
}

const Notifications: React.FC<NotifiationsProps> = ({ initStatus = false }) => {
    const [token, setToken] = React.useState<string>('')
    const [status, setStatus] = React.useState<boolean>(initStatus)
    const { data, isLoading, isError } = useNotification({ token })
    const subsMutation = useSubs()
    const unSubsMutation = useUnsubs()

    const handleNotification = async () => {
        if (data?.isActive) {
            subsMutation.mutate({ token })
        } else {
            unSubsMutation.mutate({ token })
        }
    }

    const handleNotificationPermission = async () => {
        await Notification.requestPermission()
        if (Notification.permission === 'granted') {
            setStatus(true)
        }
    }

    React.useEffect(() => {
        if (!('Notification' in window)) {
            return
        }
        if (
            Notification.permission === 'denied' ||
            Notification.permission === 'default'
        ) {
            setStatus(false)
        } else {
            setStatus(true)
            const notification = async () => {
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
                            title={payload.notification?.title}
                            body={payload.notification?.body}
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
        }
    }, [token, status])

    if (!status) {
        return (
            <IconToggle
                ariaLabel="Notification permission"
                onClick={handleNotificationPermission}
                variant="outlined"
                isSelected={false}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 m-auto"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M10.5 8.25h3l-3 4.5h3"
                    />
                </svg>
            </IconToggle>
        )
    }

    if (isLoading) {
        return (
            <div className="hover:bg-gray-100 dark:hover:bg-neutral-800 m-auto">
                <FontAwesomeIcon
                    className="animate-spin m-3"
                    size="lg"
                    icon={faSpinner}
                    data-testid="loading"
                />
            </div>
        )
    }

    if (isError) {
        return (
            <IconToggle
                ariaLabel="notification error"
                variant="outlined"
                isSelected={false}
                disabled={isError}
                onClick={() => {}}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 m-auto"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                </svg>
            </IconToggle>
        )
    }

    return (
        <IconToggle
            ariaLabel={
                data.isActive ? 'turn off Notification' : 'turn on Notification'
            }
            onClick={handleNotification}
            variant="outlined"
            isSelected={data.isActive}
            dataTestID={data.isActive ? 'unsubscribe' : 'subscribe'}
        >
            {data.isActive ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 m-auto"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 m-auto"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
                    />
                </svg>
            )}
        </IconToggle>
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
            className="hover:bg-gray-100 dark:hover:bg-neutral-800 m-auto rounded-full"
            onClick={handleClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}

interface NotifyProps {
    title: string | undefined
    body: string | undefined
}

export const Notify = ({ title, body }: NotifyProps): React.ReactElement => {
    return (
        <div className="w-full max-w-xs p-1 text-gray-500" role="alert">
            <div className="flex">
                <Image
                    loader={imageLoader}
                    src="logo.png"
                    alt="Person"
                    height="40"
                    width="40"
                    className="object-cover w-8 h-8 rounded-full shadow-lg"
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

export default Notifications
