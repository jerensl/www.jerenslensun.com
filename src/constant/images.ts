import { ImageLoaderProps } from 'next/image'

export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://ik.imagekit.io/jerensl/tr:di-default-content.jpg/${src}?tr=w-${width},q${quality}`
}

export const imageProjectLoader = ({
    src,
    width,
    quality,
}: ImageLoaderProps) => {
    return `https://ik.imagekit.io/jerensl/tr:di-project-default.webp/${src}?tr=w-${width},q${quality}`
}
