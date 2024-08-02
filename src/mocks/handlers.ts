import { http, HttpResponse } from 'msw'
import { db } from './db'

export const handlers = [
    http.post('https://api.jerenslensun.com/api/notification/status', () => {
        const data = db.status.findFirst({
            where: {
                tokenID: {
                    equals: '1234',
                },
            },
        })

        const isEmpty = data === null

        const isActive = false
        const updatedAt = new Date().getTime()

        if (isEmpty) {
            db.status.create({
                tokenID: '1234',
                isActive: isActive,
                updatedAt: updatedAt,
            })
        }

        return HttpResponse.json({
            isActive: isEmpty ? isActive : data.isActive,
            updatedAt: isEmpty ? updatedAt : data.updatedAt,
        })
    }),

    http.post('https://api.jerenslensun.com/api/notification/subscribe', () => {
        const data = db.status.update({
            where: {
                tokenID: {
                    equals: '1234',
                },
            },
            data: {
                isActive: true,
                updatedAt: new Date().getTime(),
            },
        })

        return HttpResponse.json({
            isActive: data?.isActive,
            updatedAt: data?.updatedAt,
        })
    }),
    http.post(
        'https://api.jerenslensun.com/api/notification/unsubscribe',
        () => {
            const data = db.status.update({
                where: {
                    tokenID: {
                        equals: '1234',
                    },
                },
                data: {
                    isActive: false,
                    updatedAt: new Date().getTime(),
                },
            })

            return HttpResponse.json({
                isActive: data?.isActive,
                updatedAt: data?.updatedAt,
            })
        }
    ),
]
