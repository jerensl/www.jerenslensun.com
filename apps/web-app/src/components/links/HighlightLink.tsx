import React from 'react'
import { StandardLink } from './StandardLink'
import { twMerge } from 'tailwind-merge'

export type HighlightLinkProps = {
    children: React.ReactNode
    href: string
    className: string
    isExternal?: boolean
}

export const HighlightLink = ({
    children,
    href,
    className,
    isExternal,
}: HighlightLinkProps) => {
    return (
        <StandardLink
            href={href}
            className={twMerge(
                "relative after:content-[''] after:absolute after:h-[3px] after:w-full after:bg-on-surface after:left-0 after:bottom-[-0.2rem] after:scale-x-0 after:scale-y-100 hover:after:scale-x-100 after:transition after:duration-20",
                className
            )}
            isExternal={isExternal}
        >
            {children}
        </StandardLink>
    )
}
