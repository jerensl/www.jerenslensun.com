import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type IIconToggleVariants = 'filled' | 'filled-tonal' | 'outlined' | 'standard'

export type IconToggleProps = {
    onClick: () => void
    variant: IIconToggleVariants
    children: React.ReactNode
    isSelected?: boolean
    dataCy?: string
    disabled?: boolean
    dataTestID?: string
    ariaLabel?: string
    className?: string
}

/**
 * M3 icon button. `isSelected` turns it into a toggle button and exposes
 * `aria-pressed` to assistive technology.
 */
export const IconToggle = ({
    onClick,
    variant,
    children,
    isSelected = false,
    disabled,
    dataCy,
    dataTestID,
    ariaLabel,
    className,
}: IconToggleProps) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            aria-pressed={isSelected}
            data-cy={dataCy}
            onClick={onClick}
            disabled={disabled}
            data-testid={dataTestID}
            className={twMerge(
                clsx(
                    'md-state-layer inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-emphasized [&_svg]:size-5 disabled:pointer-events-none disabled:opacity-38',
                    {
                        'text-on-surface-variant hover:text-on-surface':
                            variant === 'standard' && !isSelected,
                        'text-primary': variant === 'standard' && isSelected,
                        'bg-surface-container-highest text-on-surface-variant':
                            variant === 'filled' && !isSelected,
                        'bg-primary text-on-primary':
                            variant === 'filled' && isSelected,
                        'bg-surface-container-high text-on-surface-variant':
                            variant === 'filled-tonal' && !isSelected,
                        'bg-secondary-container text-on-secondary-container':
                            variant === 'filled-tonal' && isSelected,
                        'border border-outline text-on-surface-variant':
                            variant === 'outlined' && !isSelected,
                        'bg-inverse-surface text-inverse-on-surface':
                            variant === 'outlined' && isSelected,
                    }
                ),
                className
            )}
        >
            {children}
        </button>
    )
}
