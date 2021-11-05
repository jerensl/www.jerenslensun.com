import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LinkURLProps {
    href: string
    children: React.ReactElement
}

export const LinkURL = ({ href, children }: LinkURLProps) => {
    const child = React.Children.only(children)
    const router = useRouter()

    return (
        <Link href={href}>
            {React.cloneElement(child, {
                'aria-current': router.pathname === href ? 'page' : null,
            })}
        </Link>
    )
}
