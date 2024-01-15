import React from 'react'
import clsx from 'clsx'

type IIconButtonVariants = 'filled' | 'filled-tonal' | 'outlined' | 'standard'

export type IconToggleProps = {
    onClick: () => void
    variant: IIconButtonVariants
    children: React.ReactNode
    dataCy?: string
    disabled?: boolean
    dataTestID?: string
    ariaLabel?: string
}

export const IconButtom = ({
    onClick,
    variant,
    children,
    disabled,
    dataCy,
    dataTestID,
    ariaLabel,
}: IconToggleProps) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            data-cy={dataCy}
            onClick={onClick}
            disabled={disabled}
            data-testid={dataTestID}
            className={clsx(
                'm-auto rounded-full text-sm font-medium w-10 h-10 disabled:text-on-surface/12 disabled:bg-on-surface-variant/12 disabled:filter-none hover:brightness-108 active:brightness-110',
                {
                    'bg-primary text-on-primary': variant === 'filled',
                    'bg-surface-variant text-on-surface-variant':
                        variant === 'filled-tonal',
                    'border border-outline text-on-surface-variant':
                        variant === 'outlined',
                    'text-primary': variant === 'standard',
                }
            )}
        >
            {children}
        </button>
    )
}
