export const Tag = ({
    children,
    className,
    ...rest
}: React.ComponentPropsWithoutRef<'button'>) => {
    return (
        <button
            className="relative disabled:opacity-30 active:bg-red-400 block mb-4 mr-4 px-4 py-1 w-auto h-auto rounded-full cursor-pointer transition text-primary bg-gray-200 focus:ring focus:ring-red-200 opacity-100"
            {...rest}
        >
            {children}
        </button>
    )
}
