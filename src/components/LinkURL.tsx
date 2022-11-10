import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface LinkURLProps extends LinkProps {
    className?: string
}

export type MyLinkProps = LinkURLProps

export const LinkURL = (props: PropsWithChildren<MyLinkProps>) => {
    const router = useRouter()
    const { children, className, ...linkProps } = props

    return (
        <Link {...linkProps} passHref>
            <a
                className={className}
                href="passRef"
                aria-current={
                    router.pathname === props.href ? 'page' : undefined
                }
            >
                {children}
            </a>
        </Link>
    )
}
