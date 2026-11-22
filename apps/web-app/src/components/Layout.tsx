import React from 'react'
import { Navbar, NavbarMobile } from './Navbar'
import Analytics from './Analytics'
import { Roboto, Roboto_Mono } from 'next/font/google'

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: 'variable',
    display: 'swap',
})

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    weight: 'variable',
    display: 'swap',
})

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={`${roboto.variable} ${robotoMono.variable} min-h-svh bg-surface font-sans text-on-surface`}
        >
            <a
                href="#main-content"
                className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-label-large text-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
                Skip to content
            </a>
            <Analytics />
            <Navbar />
            <main id="main-content" className="pb-20 md:pb-0">
                {children}
            </main>
            <NavbarMobile />
        </div>
    )
}
