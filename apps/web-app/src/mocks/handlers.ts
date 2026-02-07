import { http, HttpResponse } from 'msw'
import { status } from './db'

export const handlers = [
    http.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notification/status`,
        async () => {
            const data = status.findFirst((q) => q.where({ tokenID: '1234' }))

            const isEmpty = data === undefined || data === null

            const isActive = false
            const updatedAt = new Date().getTime()

            if (isEmpty) {
                await status.create({
                    tokenID: '1234',
                    isActive: isActive,
                    updatedAt: updatedAt,
                })
            }

            return HttpResponse.json({
                isActive: isEmpty ? isActive : data?.isActive,
                updatedAt: isEmpty ? updatedAt : data?.updatedAt,
            })
        }
    ),
    http.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notification/subscribe`,
        async () => {
            const data = await status.update(
                (q) => q.where({ tokenID: '1234' }),
                {
                    data(user) {
                        user.isActive = true
                        user.updatedAt = new Date().getTime()
                    },
                }
            )

            return HttpResponse.json({
                isActive: data?.isActive,
                updatedAt: data?.updatedAt,
            })
        }
    ),
    http.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notification/unsubscribe`,
        async () => {
            const data = await status.update(
                (q) => q.where({ tokenID: '1234' }),
                {
                    data(user) {
                        user.isActive = false
                        user.updatedAt = new Date().getTime()
                    },
                }
            )

            return HttpResponse.json({
                isActive: data?.isActive,
                updatedAt: data?.updatedAt,
            })
        }
    ),
]
