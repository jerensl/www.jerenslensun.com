import fs from 'fs/promises'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

async function validateLocalImageWithFallback(srcImg: string) {
    const fallbackSrc = 'default-content.webp'

    const localImages = await fs.readdir(
        path.join(process.cwd(), 'public', 'images')
    )

    const validLocalImg = localImages.includes(srcImg)

    if (validLocalImg) {
        return '/images/' + srcImg
    }

    return '/images/' + fallbackSrc
}

export function loadImageFrom(srcImg: string) {
    if (process.env.NODE_ENV === 'production') {
        return `${process.env.NEXT_PUBLIC_IMAGES_CDN}/${srcImg}`
    }
    return validateLocalImageWithFallback(srcImg)
}

export async function transformToImageBuffer(srcImg: string) {
    if (process.env.NODE_ENV === 'production') {
        const buffer = await fetch(srcImg).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        )
        const { base64 } = await getPlaiceholder(buffer, { size: 10 })

        return {
            blurDataURL: base64,
        }
    }

    return {
        blurDataURL: '',
    }
}
