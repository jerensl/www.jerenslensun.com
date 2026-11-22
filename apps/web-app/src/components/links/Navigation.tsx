import React from 'react'
import { StandardLink } from './StandardLink'
import {
    getButtonClasses,
    type ButtonSize,
    type ButtonVariant,
} from '../buttons/buttonStyles'

type NavigationProps = {
    href: string
    variant: ButtonVariant
    label: string
    fullWidth?: boolean
    isExternal?: boolean
    size?: ButtonSize
    className?: string
    icon?: React.ReactNode
    trailingIcon?: React.ReactNode
    onClick?: () => void
}

export const Navigation = ({
    href,
    variant,
    label,
    fullWidth,
    isExternal,
    size = 'base',
    className,
    icon,
    trailingIcon,
    onClick,
}: NavigationProps) => {
    return (
        <StandardLink
            href={href}
            isExternal={isExternal}
            onClick={onClick}
            className={getButtonClasses({
                variant,
                size,
                fullWidth,
                className,
            })}
        >
            {icon ? <span aria-hidden="true">{icon}</span> : null}
            {label}
            {trailingIcon ? (
                <span aria-hidden="true">{trailingIcon}</span>
            ) : null}
        </StandardLink>
    )
}
