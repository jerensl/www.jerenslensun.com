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
    const hrefPath =
        typeof href === 'string'
            ? href
            : (href as { pathname?: string })?.pathname

    const isActive =
        typeof hrefPath === 'string' &&
        (hrefPath === '/'
            ? router.pathname === '/'
            : router.pathname === hrefPath ||
              router.pathname.startsWith(`${hrefPath}/`))

    if (isExternal) {
        return (
            <Link
                target="_blank"
                rel="noopener noreferrer"
                href={href}
                {...rest}
                className={twMerge(
                    'text-primary underline decoration-1 underline-offset-2 transition-colors duration-200 ease-standard hover:text-primary/80',
                    className
                )}
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
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    )
}
