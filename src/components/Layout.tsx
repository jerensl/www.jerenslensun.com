import React from 'react'
import { Navbar, NavbarMobile } from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <NavbarMobile />
            <main>{children}</main>
        </>
    )
}
