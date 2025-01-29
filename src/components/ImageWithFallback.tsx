import React from 'react'
import Image, { ImageLoaderProps } from 'next/image'
import imageLoader, { validLocalImg } from '@/constant/images'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

interface ImagesProps extends ImageLoaderProps {
    alt: string
    height: number
    blurDataURL?: string
    className?: string
    placeholder: PlaceholderValue | undefined
    quality?: number
}

export default function Images({
    src,
    height,
    width,
    alt,
    blurDataURL,
    placeholder,
    className,
    quality,
}: ImagesProps) {
    if (process.env.NODE_ENV !== 'production') {
        const isValid = validLocalImg.includes(src)

        if (!isValid) {
            src = 'default-content.webp'
        }

        return (
            <picture>
                <img
                    src={`/images/${src}`}
                    height={height}
                    width={width}
                    alt={alt}
                    className="m-auto"
                />
            </picture>
        )
    }

    return (
        <Image
            loader={imageLoader}
            src={src}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            alt={alt}
            height={height}
            width={width}
            quality={quality}
            className={className}
        />
    )
}
