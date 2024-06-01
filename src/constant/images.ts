'use client'

import { ImageLoaderProps } from 'next/image'

export default function ImageLoader({ src, width, quality }: ImageLoaderProps) {
    return `https://ik.imagekit.io/jerensl/tr:di-project-default.webp,w-${width},q-${quality || 75}/${src}`
}

export const imageProjectLoader = ({
    src,
    width,
    quality,
}: ImageLoaderProps) => {
    return `https://ik.imagekit.io/jerensl/tr:di-project-default.webp/${src}?tr=w-${width},q${quality}`
}
