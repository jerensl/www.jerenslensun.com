import React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'

export type StandardLinkProps = {
    className?: string
    isExternal?: boolean
    children: React.ReactNode
} & LinkProps &
    React.ComponentPropsWithoutRef<'a'>

export const StandardLink = ({
    children,
    className,
    isExternal = false,
    href,
    ...rest
}: StandardLinkProps) => {
    const router = useRouter()

    if (isExternal) {
        return (
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href={href}
                {...rest}
                className={twMerge('text-medium text-grey-500 hover:no-underline dark:hover:text-white', className)}
            >
                {children}
            </Link>
        )
    }

    return (
        <Link
            {...rest}
            href={href}
            className={twMerge('no-underline', className)}
            aria-current={router.pathname === href ? 'page' : undefined}
        >
            {children}
        </Link>
    )
}
