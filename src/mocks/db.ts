import { Collection } from '@msw/data'
import z from 'zod'

export const status = new Collection({
    schema: z.object({
        tokenID: z.string(),
        isActive: z.boolean(),
        updatedAt: z.number(),
    }),
})
