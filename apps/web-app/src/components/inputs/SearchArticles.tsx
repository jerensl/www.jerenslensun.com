import React from 'react'

interface SearchArticlesProps extends React.ComponentPropsWithoutRef<'input'> {
    onClear?: () => void
}

export const SearchArticles: React.FC<SearchArticlesProps> = ({
    onClear,
    value,
    ...props
}) => {
    const hasValue = typeof value === 'string' && value.length > 0

    return (
        <div className="relative w-full">
            <label className="block w-full bg-transparent border border-outline-variant rounded-full focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/40">
                <input
                    type="search"
                    aria-label={props.placeholder ?? 'Search articles'}
                    {...props}
                    value={value}
                    className="text-on-surface pl-4 placeholder:pl-2 placeholder-on-surface bg-transparent rounded-full appearance-none focus:outline-hidden focus:placeholder-transparent focus:ring-0 p-2 w-full pr-12 [&::-webkit-search-cancel-button]:hidden"
                />
            </label>
            {hasValue && onClear ? (
                <button
                    type="button"
                    onClick={onClear}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface-variant/8"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            ) : null}
        </div>
    )
}
