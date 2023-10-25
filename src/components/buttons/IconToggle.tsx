import React from 'react'
import clsx from 'clsx'

type IIconToggleVariants = 'filled' | 'filled-tonal' | 'outlined' | 'standard'

export type IconToggleProps = {
    onClick: () => void
    variant: IIconToggleVariants
    children: React.ReactNode
    isSelected: boolean
    dataCy?: string
    disabled?: boolean
    ariaLabel?: string
}

export const IconToggle = ({
    onClick,
    variant,
    children,
    isSelected = false,
    disabled,
    dataCy,
    ariaLabel,
}: IconToggleProps) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            data-cy={dataCy}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'm-auto rounded-full text-sm font-medium w-10 h-10 disabled:text-on-surface/12 disabled:bg-on-surface-variant/12 hover:brightness-108 active:brightness-110',
                {
                    'bg-surface-variant text-primary':
                        variant === 'filled' && !isSelected,
                    'bg-primary text-on-primary':
                        variant === 'filled' && isSelected,
                    'bg-surface-variant text-on-surface-variant':
                        variant === 'filled-tonal' && !isSelected,
                    'bg-secondary-container text-on-secondary-container':
                        variant === 'filled-tonal' && isSelected,
                    'border border-outline text-on-surface-variant':
                        variant === 'outlined' && !isSelected,
                    'bg-inverse-surface text-inverse-on-surface':
                        variant === 'outlined' && isSelected,
                    'text-primary': variant === 'standard',
                }
            )}
        >
            {children}
        </button>
    )
}
