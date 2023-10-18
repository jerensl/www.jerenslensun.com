import React from 'react'
import { StandardLink } from './StandardLink'
import clsx from 'clsx'

export type HighlightLinkProps = {
    href: string
    isExternal?: boolean
    type: 'filled' | 'outlined'
    label: string
}

export const LinkButton = ({
    href,
    isExternal,
    type,
    label,
}: HighlightLinkProps) => {
    return (
        <StandardLink
            href={href}
            className={clsx('rounded-full text-sm font-medium px-5 py-2', {
                'text-on-primary bg-primary hover:bg-[var(--md-ref-palette-primary35)] dark:hover:bg-[var(--md-ref-palette-primary90)]':
                    type === 'filled',
                'text-primary border border-outline bg-surface hover:bg-[var(--md-ref-palette-primary95)] dark:hover:bg-[var(--md-ref-palette-neutral20)]':
                    type === 'outlined',
            })}
            isExternal={isExternal}
        >
            {label}
        </StandardLink>
    )
}
