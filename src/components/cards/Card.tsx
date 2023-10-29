import { imageLoader } from '@/constant/images'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface ContentCardProps {
    variant: 'elevated' | 'filled' | 'outlined'
    title: string
    description: string
    slug: string
    imageURL: string
    blurDataURL?: string
}

export const ContentCard: React.FC<ContentCardProps> = ({
    variant,
    title,
    description,
    slug,
    imageURL,
    blurDataURL,
}) => {
    return (
        <article
            className={clsx(
                'relative col-span-full md:col-span-4 lg:col-span-4 rounded-medium h-[400px] w-[320px]',
                {
                    'bg-surface border border-outline-variant':
                        variant === 'outlined',
                    'bg-surface-container-low shadow-elevation-1':
                        variant === 'elevated',
                    'bg-surface-container-high': variant === 'filled',
                }
            )}
        >
            <Link href={slug}>
                <div
                    className={clsx(
                        'absolute rounded-medium top-0 left-0 bottom-0 right-0 hover:bg-on-surface/8 active:bg-on-surface/12',
                        {}
                    )}
                ></div>
                <div className="relative overflow-auto">
                    <Image
                        loader={imageLoader}
                        src={imageURL}
                        alt={title}
                        blurDataURL={blurDataURL ?? undefined}
                        placeholder={blurDataURL ? 'blur' : 'empty'}
                        height="200"
                        width="450"
                        object-fit="cover"
                        className="cursor-pointer rounded-t-medium"
                    />
                </div>
                <div className="flex flex-col gap-1 mx-4 my-2">
                    <h2 className="text-2xl text-on-surface font-bold cursor-pointer">
                        {title}
                    </h2>
                    <p className="line-clamp-3 text-on-surface-variant">
                        {description}
                    </p>
                </div>
            </Link>
        </article>
    )
}
