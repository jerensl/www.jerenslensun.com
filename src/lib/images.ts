import { ImageLoaderProps } from 'next/image'

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://ik.imagekit.io/jerensl/${src}?tr=w-${width},q${quality}`
}
