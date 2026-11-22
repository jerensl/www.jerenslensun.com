import clsx from 'clsx'
import React from 'react'

interface SectionHeaderProps {
    eyebrow?: React.ReactNode
    title: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    align?: 'left' | 'center'
    titleAs?: 'h1' | 'h2' | 'h3'
    className?: string
    titleClassName?: string
}

/**
 * Shared page/section heading using the M3 display and body roles.
 */
export const SectionHeader = ({
    eyebrow,
    title,
    description,
    action,
    align = 'left',
    titleAs: Title = 'h2',
    className,
    titleClassName,
}: SectionHeaderProps) => {
    return (
        <div
            className={clsx(
                'flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
                className
            )}
        >
            <div
                className={clsx('max-w-3xl', {
                    'mx-auto text-center': align === 'center',
                })}
            >
                {eyebrow ? (
                    <p className="mb-2 text-label-large uppercase tracking-[0.14em] text-primary">
                        {eyebrow}
                    </p>
                ) : null}
                <Title
                    className={clsx(
                        'text-display-small font-medium tracking-[-0.01em] md:text-display-medium',
                        titleClassName
                    )}
                >
                    {title}
                </Title>
                {description ? (
                    <p
                        className={clsx(
                            'mt-3 max-w-2xl text-body-large text-on-surface-variant',
                            { 'mx-auto': align === 'center' }
                        )}
                    >
                        {description}
                    </p>
                ) : null}
            </div>
            {action ? (
                <div className="flex shrink-0 flex-wrap items-center gap-3">
                    {action}
                </div>
            ) : null}
        </div>
    )
}
