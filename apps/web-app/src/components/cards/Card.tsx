import clsx from 'clsx'
import React from 'react'

interface CardProps {
    variant: 'elevated' | 'filled' | 'outlined'
    children: React.ReactNode
    className?: string
    as?: React.ElementType
    interactive?: boolean
}

/**
 * M3 card surface. Cards use tonal surface containers at rest and only add
 * shadow for the elevated variant. `interactive` adds the M3 hover/focus
 * state layer.
 */
const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
    { children, className, as: Tag = 'article', variant, interactive = false },
    ref
) {
    return (
        <Tag
            ref={ref}
            className={clsx(
                'relative overflow-hidden rounded-md',
                {
                    'bg-surface-container-low shadow-elevation-1':
                        variant === 'elevated',
                    'bg-surface-container-highest': variant === 'filled',
                    'border border-outline-variant bg-surface':
                        variant === 'outlined',
                    'md-state-layer cursor-pointer transition-shadow duration-200 ease-emphasized hover:shadow-elevation-2':
                        interactive,
                },
                className
            )}
        >
            {children}
        </Tag>
    )
})

export default Card
