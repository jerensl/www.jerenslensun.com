import React from 'react'

export const SearchArticles: React.FC<
    React.ComponentPropsWithoutRef<'input'>
> = (props) => {
    return (
        <label className="block w-full bg-transparent border rounded-full focus-within:border-primary focus-within:ring focus-within:ring-primary focus-within:ring-opacity-40">
            <input
                {...props}
                className="text-on-surface pl-4 placeholder:pl-2 placeholder-on-surface bg-transparent rounded-full appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0 p-2 w-full"
            />
        </label>
    )
}
