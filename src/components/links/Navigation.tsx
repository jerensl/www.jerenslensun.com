import React from 'react'
import { StandardLink } from './StandardLink'
import clsx from 'clsx'

type IButtonVariants =
    | 'elevated'
    | 'filled'
    | 'filled-tonal'
    | 'outlined'
    | 'text'

type ILinkButtonSizeVariants = 'small' | 'base' | 'large'

type NavigationProps = {
    href: string
    variant: IButtonVariants
    label: string
    fullWidth?: boolean
    size: ILinkButtonSizeVariants
}

export const Navigation = ({
    href,
    variant,
    label,
    fullWidth,
    size,
}: NavigationProps) => {
    return (
        <StandardLink
            role="button"
            href={href}
            className={clsx(
                'relative rounded-full w-fit min-h-10 font-normal font-sans shadow-elevation-0',
                {
                    'text-sm px-3 py-1.5': size === 'small',
                    'text-sm px-5 py-2': size === 'base',
                    'text-base px-5 py-2.5': size === 'large',
                    'text-primary bg-surface-container-low shadow-elevation-1 hover:shadow-elevation-2 focus:shadow-elevation-1':
                        variant === 'elevated',
                    'text-on-primary bg-primary': variant === 'filled',
                    'text-on-secondary-container bg-secondary-container ':
                        variant === 'filled-tonal',
                    'text-primary border border-outline bg-surface':
                        variant === 'outlined',
                    'text-primary hover:bg-primary/8': variant === 'text',
                    'block w-full': fullWidth,
                }
            )}
        >
            <div
                className={clsx('absolute inset-0 w-full h-full rounded-full', {
                    'hover:bg-primary/8 active:bg-primary/10':
                        variant === 'elevated' ||
                        variant === 'outlined' ||
                        variant === 'text',
                    'hover:bg-on-primary/8 active:bg-on-primary/10':
                        variant === 'filled',
                    'hover:bg-on-secondary-container/8 active:bg-on-secondary-container/10':
                        variant === 'filled-tonal',
                })}
            />
            {label}
        </StandardLink>
    )
}
