import React from 'react'
import Image, { ImageLoaderProps } from 'next/image'
import imageLoader from '@/constant/images'
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
    return (
        <Image
            loader={imageLoader}
            src={src}
            placeholder={blurDataURL ? (placeholder ?? 'blur') : 'empty'}
            blurDataURL={blurDataURL || undefined}
            alt={alt}
            height={height}
            width={width}
            quality={quality}
            className={className}
        />
    )
}
