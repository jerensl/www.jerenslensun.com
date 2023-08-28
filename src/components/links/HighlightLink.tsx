import React from 'react'
import { StandardLink } from './StandardLink'
import { twMerge } from 'tailwind-merge'

export type HighlightLinkProps = {
    children: React.ReactNode
    href: string
    className: string
}

export const HighlightLink = ({
    children,
    href,
    className,
}: HighlightLinkProps) => {
    return (
        <StandardLink
            href={href}
            className={twMerge(
                'group relative inline-block overflow-hidden dark:hover:text-white dark:text-gray-200',
                className
            )}
        >
            {children}
            <span className="ease-in-out absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white transition-all duration-400 group-hover:w-full"></span>
        </StandardLink>
    )
}
