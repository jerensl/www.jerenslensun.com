import React from 'react'
import clsx from 'clsx'

interface TagProps {
    onClick?: () => void
    text: string
    disabled?: boolean
    selected?: boolean
    count?: number
}

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
                'inline-flex h-8 text-center items-center rounded-small text-on-surface-variant border border-outline  shadow-elevation-0 disabled:text-on-surface/12 disabled:bg-on-surface-variant/12 disabled:border-on-surface/12 hover:bg-on-surface-variant/8',
                {
                    'pr-4 text-on-secondary-container bg-on-surface/12 border-none border-secondary-container hover:bg-on-secondary-container/8 hover:shadow-elevation-2':
                        selected,
                    'px-4': !selected,
                }
            )}
        >
            {selected && !disabled && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mx-2"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>
            )}
            <span>{text}</span>
            {typeof count === 'number' && (
                <span
                    aria-hidden="true"
                    className="ml-2 rounded-full bg-on-surface/8 px-1.5 py-0.5 text-xs"
                >
                    {count}
                </span>
            )}
        </button>
    )
}
