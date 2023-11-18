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
    dataTestID?: string
    ariaLabel?: string
}

export const IconToggle = ({
    onClick,
    variant,
    children,
    isSelected = false,
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
                'm-auto rounded-full text-sm font-medium w-10 h-10 disabled:bg-on-surface/12 disabled:text-on-surface/38',
                {
                    'bg-surface-container-highest text-primary hover:bg-primary/':
                        variant === 'filled' && !isSelected,
                    'bg-primary text-on-primary hover:bg-primary/8':
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
