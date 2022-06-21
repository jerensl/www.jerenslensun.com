import { useQuery } from 'react-query'

interface Notification {
    token: string
    status: boolean
}

export function useNotification({ token, status }: Notification) {
    return useQuery(
        ['notification', status],
        () => {
            return fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/notification/status`,
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        token: token,
                    }),
                }
            ).then((res) => res.json())
        },
        {
            enabled: !!token,
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )
}
