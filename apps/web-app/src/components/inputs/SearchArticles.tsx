import React from 'react'

interface SearchArticlesProps extends React.ComponentPropsWithoutRef<'input'> {
    onClear?: () => void
}

/**
 * M3 search bar: 56dp tall, full shape, surface-container-high at rest and a
 * state layer for the clear action.
 */
export const SearchArticles: React.FC<SearchArticlesProps> = ({
    onClear,
    value,
    ...props
}) => {
    const hasValue = typeof value === 'string' && value.length > 0

    return (
        <div role="search" className="relative w-full">
            <label className="flex h-14 w-full items-center gap-3 rounded-full bg-surface-container-high px-4 transition-colors duration-200 ease-emphasized focus-within:bg-surface-container-highest focus-within:ring-2 focus-within:ring-primary/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 shrink-0 text-on-surface-variant"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                <input
                    type="search"
                    aria-label={props.placeholder ?? 'Search articles'}
                    {...props}
                    value={value}
                    className="h-full w-full flex-1 appearance-none bg-transparent text-body-large text-on-surface placeholder:text-on-surface-variant focus:outline-hidden [&::-webkit-search-cancel-button]:hidden"
                />
                {hasValue && onClear ? (
                    <button
                        type="button"
                        onClick={onClear}
                        aria-label="Clear search"
                        className="md-state-layer -mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-on-surface-variant"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-5"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                ) : null}
            </label>
        </div>
    )
}
