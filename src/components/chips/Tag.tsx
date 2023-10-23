import React from 'react'
import clsx from 'clsx'

interface TagProps {
    onClick: () => void
    text: string
    disabled?: boolean
    isActive?: boolean
}

export const Tag = ({ text, onClick, disabled, isActive }: TagProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'inline-flex px-4 h-8 ml-2 text-center items-center rounded-small text-on-surface-variant border border-outline hover:bg-on-surface-variant/8 shadow-elevation-0',
                {
                    'text-on-surface/12 bg-on-surface-variant/12 border-on-surface/12 hover:text-on-surface/12 hover:bg-on-surface-variant/12':
                        disabled,
                    'text-on-secondary-container/100 bg-on-surface/12 border-none border-secondary-container hover:bg-on-secondary-container/8 hover:shadow-elevation-1':
                        isActive,
                }
            )}
        >
            {isActive && !disabled && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline w-4 h-4 mr-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>
            )}
            {text}
        </button>
    )
}
