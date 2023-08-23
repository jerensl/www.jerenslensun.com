import { ImageLoaderProps } from 'next/image'

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://ik.imagekit.io/jerensl/tr:di-default-content.jpg/${src}?tr=w-${width},q${quality}`
}
