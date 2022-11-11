import type { IStatus } from '@/types/notification'

export const statusNotification = async ({
    token,
}: {
    token: string
}): Promise<IStatus> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/status`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            tokenID: token,
        }),
    }).then((res) => res.json())
}

export const subscribeNotification = async ({
    token,
}: {
    token: string
}): Promise<IStatus> =>
    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notification/subscribe`,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                tokenID: token,
                updatedAt: new Date().getTime(),
            }),
        }
    ).then((res) => res.json())

export const unsubscribeNotification = async ({
    token,
}: {
    token: string
}): Promise<IStatus> =>
    await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notification/unsubscribe`,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                tokenID: token,
                updatedAt: new Date().getTime(),
            }),
        }
    ).then((res) => res.json())
