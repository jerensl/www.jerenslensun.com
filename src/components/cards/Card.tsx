import clsx from 'clsx'
import React from 'react'

interface CardProps {
    variant: 'elevated' | 'filled' | 'outlined'
    children: React.ReactNode
    className?: string
    as?: React.ElementType
}

const Card = React.forwardRef<HTMLElement, CardProps>(function Grid(
    { children, className, as: Tag = 'article', variant },
    ref
) {
    return (
        <Tag
            ref={ref}
            className={clsx(
                'relative col-span-full sm:col-span-6 xl:col-span-4 rounded-medium h-[420px] sm:w-[320px] hover:bg-on-surface/8 active:bg-on-surface/12',
                {
                    'bg-surface border border-outline-variant':
                        variant === 'outlined',
                    'bg-surface-container-low shadow-elevation-1':
                        variant === 'elevated',
                    'bg-surface-container-high': variant === 'filled',
                },
                className
            )}
        >
            {children}
        </Tag>
    )
})

export default Card
