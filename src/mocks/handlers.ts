import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('https://api.jerenslensun.com/api/notification/status', () => {
        return HttpResponse.json({
            isActive: false,
            updatedAt: new Date().getTime(),
        })
    }),
    http.post('https://api.jerenslensun.com/api/notification/subscribe', () => {
        return HttpResponse.json({
            isActive: true,
            updatedAt: new Date().getTime(),
        })
    }),
    http.post(
        'https://api.jerenslensun.com/api/notification/unsubscribe',
        () => {
            return HttpResponse.json({
                isActive: false,
                updatedAt: new Date().getTime(),
            })
        }
    ),
]
