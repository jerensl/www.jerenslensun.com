import { imageLoader } from '@/constant/images'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface ContentCardProps {
    variant: 'elevated' | 'filled' | 'outlined'
    slug: string
    imageURL: string
    blurDataURL: string
    header: ReactNode
    body: ReactNode
}

export const ContentCard: React.FC<ContentCardProps> = ({
    variant,
    slug,
    imageURL,
    blurDataURL,
    header,
    body,
}) => {
    return (
        <article
            className={clsx('rounded-small min-h-[250px] min-w-[300px]', {
                'bg-surface border border-outline-variant':
                    variant === 'outlined',
                'bg-surface-container-low shadow-elevation-1':
                    variant === 'elevated',
                'bg-surface-container-high': variant === 'filled',
            })}
        >
            <div className="relative overflow-auto">{header}</div>
            <div className="flex flex-col p-2 justify-between">{body}</div>
        </article>
    )
}
