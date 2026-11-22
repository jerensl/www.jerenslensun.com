import React from 'react'
import clsx from 'clsx'

interface TagProps {
    onClick?: () => void
    text: string
    disabled?: boolean
    selected?: boolean
    count?: number
}

/**
 * M3 filter chip. Selected chips show a leading check and use the
 * secondary container role.
 */
export const Tag = ({
    text,
    onClick,
    disabled,
    selected = false,
    count,
}: TagProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-pressed={selected}
            className={clsx(
                'md-state-layer inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-sm border text-label-large transition-colors duration-200 ease-emphasized',
                'disabled:pointer-events-none disabled:border-on-surface/12 disabled:bg-on-surface/12 disabled:text-on-surface/38',
                {
                    'border-transparent bg-secondary-container pl-2 pr-3 text-on-secondary-container':
                        selected && !disabled,
                    'border-outline bg-surface px-3 text-on-surface-variant hover:border-on-surface-variant':
                        !selected,
                }
            )}
        >
            {selected ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="size-4 shrink-0"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                    />
                </svg>
            ) : null}
            <span>{text}</span>
            {typeof count === 'number' ? (
                <span
                    aria-hidden="true"
                    className={clsx(
                        'ml-1 rounded-full px-1.5 py-0.5 text-label-small',
                        selected
                            ? 'bg-on-secondary-container/12'
                            : 'bg-on-surface/8'
                    )}
                >
                    {count}
                </span>
            ) : null}
        </button>
    )
}
