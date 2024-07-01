import { ImageLoaderProps } from 'next/image'

export default function ImageLoader({ src, width, quality }: ImageLoaderProps) {
    return `https://ik.imagekit.io/jerensl/tr:di-project-default.webp,w-${width},q-${quality || 75}/${src}`
}
