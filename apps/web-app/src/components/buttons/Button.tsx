import React from 'react'
import {
    getButtonClasses,
    type ButtonSize,
    type ButtonVariant,
} from './buttonStyles'

export type ButtonProps = {
    onClick?: () => void
    variant: ButtonVariant
    label?: string
    size?: ButtonSize
    dataCy?: string
    fullWidth?: boolean
    className?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    ariaLabel?: string
    icon?: React.ReactNode
    trailingIcon?: React.ReactNode
    children?: React.ReactNode
}

export const Button = ({
    onClick,
    variant,
    label,
    size = 'base',
    fullWidth,
    dataCy,
    className,
    type = 'button',
    disabled,
    ariaLabel,
    icon,
    trailingIcon,
    children,
}: ButtonProps) => {
    return (
        <button
            data-cy={dataCy}
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={getButtonClasses({
                variant,
                size,
                fullWidth,
                className,
            })}
        >
            {icon ? <span aria-hidden="true">{icon}</span> : null}
            {children ?? label}
            {trailingIcon ? (
                <span aria-hidden="true">{trailingIcon}</span>
            ) : null}
        </button>
    )
}
