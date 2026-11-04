import React from 'react'

export const SearchArticles: React.FC<
    React.ComponentPropsWithoutRef<'input'>
> = (props) => {
    return (
        <label className="block w-full bg-transparent border border-outline-variant rounded-full focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/40">
            <input
                {...props}
                className="text-on-surface pl-4 placeholder:pl-2 placeholder-on-surface bg-transparent rounded-full appearance-none focus:outline-hidden focus:placeholder-transparent focus:ring-0 p-2 w-full"
            />
        </label>
    )
}
