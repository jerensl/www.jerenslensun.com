import React from 'react'
import { twMerge } from 'tailwind-merge'

export const IconBoxButton: React.FC<
    React.ComponentPropsWithoutRef<'button'>
> = ({ children, className, ...rest }) => {
    return (
        <button
            className={twMerge(
                'text-slate-800 hover:bg-slate-800 hover:bg-opacity-10 focus:outline-none font-medium rounded-full text-sm p-2.5 m-auto text-center inline-flex items-center dark:text-slate-100 dark:hover:text-white dark:hover:bg-white dark:hover:bg-opacity-10',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
