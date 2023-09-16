import React from 'react'
import { twMerge } from 'tailwind-merge'

export const IconBoxButton: React.FC<
    React.ComponentPropsWithoutRef<'button'>
> = ({ children, className, ...rest }) => {
    return (
        <button
            className={twMerge(
                'text-slate-700 hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-full text-sm p-2.5 m-auto text-center inline-flex items-center dark:border-slate-500 dark:text-slate-100 dark:hover:text-white dark:focus:ring-slate-800 dark:hover:bg-slate-700',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
