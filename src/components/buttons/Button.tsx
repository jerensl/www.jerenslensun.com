import React from 'react'
import clsx from 'clsx'

type IButtonVariants =
    | 'elevated'
    | 'filled'
    | 'filled-tonal'
    | 'outlined'
    | 'text'

type IButtonSizeVariants = 'small' | 'base' | 'large'

export type ButtonProps = {
    onClick: () => void
    variant: IButtonVariants
    label: string
    size: IButtonSizeVariants
    dataCy?: string
    fullWidth?: boolean
}

export const Button = ({
    onClick,
    variant,
    label,
    size,
    fullWidth,
    dataCy,
}: ButtonProps) => {
    return (
        <button
            data-cy={dataCy}
            onClick={onClick}
            className={clsx(
                'rounded-full font-medium w-fit shadow-elevation-0',
                {
                    'text-sm px-3 py-1.5': size === 'small',
                    'text-sm px-5 py-2': size === 'base',
                    'text-base px-5 py-2.5': size === 'large',
                    'text-primary shadow-elevation-1 hover:bg-primary/8 hover:shadow-elevation-2 focus:shadow-elevation-1':
                        variant === 'elevated',
                    'text-on-primary bg-primary hover:brightness-108 hover:saturate-108':
                        variant === 'filled',
                    'text-on-secondary-container bg-secondary-container hover:brightness-108 hover:saturate-108':
                        variant === 'filled-tonal',
                    'text-primary border border-outline bg-surface hover:brightness-108 hover:saturate-108':
                        variant === 'outlined',
                    'text-primary hover:bg-primary/8': variant === 'text',
                    'block w-full': fullWidth,
                }
            )}
        >
            {label}
        </button>
    )
}
