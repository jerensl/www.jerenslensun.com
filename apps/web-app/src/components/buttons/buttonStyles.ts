import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ButtonVariant =
    'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text'

export type ButtonSize = 'small' | 'base' | 'large'

type ButtonStyleOptions = {
    variant: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    className?: string
}

const sizeClasses: Record<ButtonSize, string> = {
    small: 'h-8 text-label-medium',
    base: 'h-10 text-label-large',
    large: 'h-12 text-title-small',
}

const paddingClasses: Record<ButtonVariant, Record<ButtonSize, string>> = {
    elevated: {
        small: 'px-3',
        base: 'px-6',
        large: 'px-6',
    },
    filled: {
        small: 'px-3',
        base: 'px-6',
        large: 'px-6',
    },
    'filled-tonal': {
        small: 'px-3',
        base: 'px-6',
        large: 'px-6',
    },
    outlined: {
        small: 'px-3',
        base: 'px-6',
        large: 'px-6',
    },
    text: {
        small: 'px-3',
        base: 'px-3',
        large: 'px-4',
    },
}

const variantClasses: Record<ButtonVariant, string> = {
    elevated:
        'bg-surface-container-low text-primary shadow-elevation-1 hover:shadow-elevation-2 active:shadow-elevation-1',
    filled: 'bg-primary text-on-primary hover:shadow-elevation-1',
    'filled-tonal':
        'bg-secondary-container text-on-secondary-container hover:shadow-elevation-1',
    outlined: 'border border-outline bg-transparent text-primary',
    text: 'bg-transparent text-primary',
}

/**
 * Shared M3 button surface used by both <button> and link buttons.
 *
 * The state layer is a `currentColor` overlay at M3 opacities, so filled,
 * tonal, outlined and text buttons all get the correct hover, focus and
 * pressed treatment without duplicating color logic.
 */
export const getButtonClasses = ({
    variant,
    size = 'base',
    fullWidth,
    className,
}: ButtonStyleOptions) =>
    twMerge(
        clsx(
            'md-state-layer inline-flex w-fit shrink-0 select-none items-center justify-center gap-2 rounded-full font-sans font-medium no-underline transition-[box-shadow,background-color,color] duration-200 ease-emphasized',
            'disabled:pointer-events-none disabled:opacity-38',
            '[&_svg]:size-5 [&_svg]:shrink-0',
            sizeClasses[size],
            paddingClasses[variant][size],
            variantClasses[variant],
            fullWidth && 'flex w-full',
            className
        )
    )
