import React from 'react'
import { Navbar, NavbarMobile } from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <NavbarMobile />
            <main>{children}</main>
        </>
    )
}
