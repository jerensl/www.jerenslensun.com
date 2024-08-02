import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
    status: {
        tokenID: primaryKey(String),
        isActive: Boolean,
        updatedAt: Number,
    },
})
