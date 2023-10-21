import React from 'react'
import { StandardLink } from './StandardLink'
import clsx from 'clsx'

type IButtonVariants =
    | 'elevated'
    | 'filled'
    | 'filled-tonal'
    | 'outlined'
    | 'text'

export type HighlightLinkProps = {
    href: string
    variant: IButtonVariants
    label: string
    fullWidth?: boolean
}

export const LinkButton = ({
    href,
    variant,
    label,
    fullWidth,
}: HighlightLinkProps) => {
    return (
        <StandardLink
            href={href}
            className={clsx(
                'rounded-full text-sm w-fit font-medium px-5 py-2 shadow-elevation-0',
                {
                    'text-primary shadow-elevation-1 hover:bg-primary/8 hover:shadow-elevation-2 focus:shadow-elevation-1':
                        variant === 'elevated',
                    'text-on-primary bg-primary hover:bg-[var(--md-ref-palette-primary35)] dark:hover:bg-[var(--md-ref-palette-primary70)]':
                        variant === 'filled',
                    'text-on-secondary-container bg-secondary-container hover:bg-[var(--md-ref-palette-secondary80)] dark:hover:bg-[var(--md-ref-palette-secondary20)]':
                        variant === 'filled-tonal',
                    'text-primary border border-outline bg-surface hover:bg-primary/8 dark:hover:bg-[var(--md-ref-palette-neutral20)]':
                        variant === 'outlined',
                    'text-primary hover:bg-primary/8': variant === 'text',
                    'block w-full': fullWidth,
                }
            )}
        >
            {label}
        </StandardLink>
    )
}
