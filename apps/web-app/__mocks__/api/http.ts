import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('*/status', () => {
        return HttpResponse.json({
            isActive: false,
            updatedAt: new Date().getTime(),
        })
    }),
    http.post('*/notification/subscribe', () => {
        return new HttpResponse(null, { status: 201 })
    }),
    http.post('*/notification/unsubscribe', () => {
        return new HttpResponse(null, { status: 200 })
    }),
    http.get(' https://ik.imagekit.io/jerensl/*', () => {
        return new HttpResponse(null, { status: 200 })
    }),
]
