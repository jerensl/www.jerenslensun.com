import React, { useEffect } from 'react'
import { Navbar, NavbarMobile } from './Navbar'
import { pageview } from '@/libs/gtm'
import { usePathname, useSearchParams } from 'next/navigation'
import Analytics from './Analytics'

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (pathname) {
            pageview(pathname)
        }
    }, [pathname, searchParams])

    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
        return null
    }

    return (
        <>
            <Analytics />
            <Navbar />
            <NavbarMobile />
            <main>{children}</main>
        </>
    )
}
