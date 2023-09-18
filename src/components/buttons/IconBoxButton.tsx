import { cn } from '@/utils/style'
import React from 'react'

interface IconButtonProps {
    shape: 'standard' | 'circle'
    outlined?: boolean
}

export const IconButton: React.FC<
    React.ComponentPropsWithoutRef<'button'> & IconButtonProps
> = ({ children, className, shape, outlined = false, ...rest }) => {
    return (
        <button
            className={cn(
                'text-slate-800 rounded-lg hover:bg-slate-800 hover:bg-opacity-10 focus:outline-none font-medium text-sm p-2.5 m-auto text-center inline-flex items-center dark:text-slate-100 dark:hover:text-white dark:hover:bg-white dark:hover:bg-opacity-10',
                className,
                {
                    'rounded-full': shape === 'circle',
                    'border border-slate-700': outlined,
                }
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
