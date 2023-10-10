import React from 'react'

const Tag: React.FC<React.ComponentPropsWithoutRef<'button'>> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <button
            className="relative disabled:opacity-30 block mb-4 mr-4 px-4 md:py-1 w-auto h-auto rounded-full cursor-pointer transition text-primary bg-gray-200 dark:bg-neutral-800 focus:ring focus:ring-red-200 dark:focus:ring-red-700 opacity-100 active:bg-red-400 dark:active:bg-red-700"
            {...rest}
        >
            {children}
        </button>
    )
}

export default Tag
