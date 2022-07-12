import { useQuery, useMutation, QueryCache, useQueryClient } from 'react-query'

export interface Notification {
    token: string
}

export function useSubs() {
    const queryClient = useQueryClient()

    return useMutation(subscribeNotification, {
        onMutate: async (status) => {
            await queryClient.cancelQueries('notification')

            const prevStatus = queryClient.getQueryData('notification')

            queryClient.setQueryData('notification', () => [Notification])

            return { prevStatus }
        },
        onError: (err, newStatus, context) => {
            queryClient.setQueryData('notification', context.prevStatus)
        },
        onSettled: () => {
            queryClient.invalidateQueries('notification')
        },
    })
}

export function useUnsubs() {
    const queryClient = useQueryClient()

    return useMutation(unsubscribeNotification, {
        onMutate: async (status) => {
            await queryClient.cancelQueries('notification')

            const prevStatus = queryClient.getQueryData('notification')

            queryClient.setQueryData('notification', status)

            return { prevStatus }
        },
        onError: (err, newStatus, context) => {
            queryClient.setQueryData('notification', context.prevStatus)
        },
        onSettled: () => {
            queryClient.invalidateQueries('notification')
        },
    })
}

export function useNotification({ token }: Notification) {
    return useQuery(
        'notification',
        () => {
            return statusNotification({ token })
        },
        {
            enabled: !!token,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )
}

interface Status {
    isActive: boolean
    updatedAt: number
}

const statusNotification = async ({
    token,
}: {
    token: string
}): Promise<Status> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notification/status`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            tokenID: token,
        }),
    }).then((res) => res.json())
}

const subscribeNotification = async ({
    token,
}: {
    token: string
}): Promise<Status> =>
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

const unsubscribeNotification = async ({
    token,
}: {
    token: string
}): Promise<Status> =>
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
