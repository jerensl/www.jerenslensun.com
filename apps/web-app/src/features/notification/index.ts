import type { INotification, IStatus } from '@/types/notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    subscribeNotification,
    unsubscribeNotification,
    statusNotification,
} from '../../utils/notificationApi'

export function useSubs() {
    const queryClient = useQueryClient()

    return useMutation(subscribeNotification, {
        onMutate: async (status) => {
            await queryClient.cancelQueries(['notification'])

            const prevStatus = queryClient.getQueryData(['notification'])

            queryClient.setQueryData(['notification'], () => [Notification])

            return { prevStatus }
        },
        onError: (err, newStatus, context) => {
            queryClient.setQueryData(['notification'], context?.prevStatus)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['notification'])
        },
    })
}

export function useUnsubs() {
    const queryClient = useQueryClient()

    return useMutation(unsubscribeNotification, {
        onMutate: async (status) => {
            await queryClient.cancelQueries(['notification'])

            const prevStatus = queryClient.getQueryData(['notification'])

            queryClient.setQueryData(['notification'], status)

            return { prevStatus }
        },
        onError: (err, newStatus, context) => {
            queryClient.setQueryData(['notification'], context?.prevStatus)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['notification'])
        },
    })
}

export function useNotification({ token }: INotification) {
    return useQuery(
        ['notification'],
        () => {
            return statusNotification({ token })
        },
        {
            enabled: !!token,
            staleTime: 1000,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )
}
