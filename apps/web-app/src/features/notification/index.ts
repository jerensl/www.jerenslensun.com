import type { INotification, IStatus } from '@/types/notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    subscribeNotification,
    unsubscribeNotification,
    statusNotification,
} from '../../utils/notificationApi'

const notificationQueryKey = ['notification'] as const

export function useSubs() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: subscribeNotification,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: notificationQueryKey })

            const prevStatus =
                queryClient.getQueryData<IStatus>(notificationQueryKey)

            queryClient.setQueryData<IStatus>(
                notificationQueryKey,
                (currentStatus) =>
                    currentStatus
                        ? {
                              ...currentStatus,
                              isActive: true,
                              updatedAt: new Date().getTime(),
                          }
                        : currentStatus
            )

            return { prevStatus }
        },
        onError: (_err, _newStatus, context) => {
            queryClient.setQueryData(notificationQueryKey, context?.prevStatus)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: notificationQueryKey })
        },
    })
}

export function useUnsubs() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: unsubscribeNotification,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: notificationQueryKey })

            const prevStatus =
                queryClient.getQueryData<IStatus>(notificationQueryKey)

            queryClient.setQueryData<IStatus>(
                notificationQueryKey,
                (currentStatus) =>
                    currentStatus
                        ? {
                              ...currentStatus,
                              isActive: false,
                              updatedAt: new Date().getTime(),
                          }
                        : currentStatus
            )

            return { prevStatus }
        },
        onError: (_err, _newStatus, context) => {
            queryClient.setQueryData(notificationQueryKey, context?.prevStatus)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: notificationQueryKey })
        },
    })
}

export function useNotification({ token }: INotification) {
    return useQuery({
        queryKey: notificationQueryKey,
        queryFn: () => statusNotification({ token }),
        enabled: !!token,
        staleTime: 1000,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}
