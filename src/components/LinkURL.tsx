import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '@tanstack/react-query-devtools/build/lib/utils'

interface LinkURLProps extends LinkProps {
    className?: string
}

export type MyLinkProps = LinkURLProps

export const LinkURL = (props: PropsWithChildren<MyLinkProps>) => {
    const router = useRouter()
    const { children, className, ...linkProps } = props

    return (
        <Link
            {...linkProps}
            className={className}
            aria-current={router.pathname === props.href ? 'page' : undefined}
        >
            {children}
        </Link>
    )
}
