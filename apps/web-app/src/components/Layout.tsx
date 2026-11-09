import React from 'react'
import { Navbar, NavbarMobile } from './Navbar'
import Analytics from './Analytics'
import { Merriweather, Lora } from 'next/font/google'

const merriweather = Merriweather({
    subsets: ['latin'],
    variable: '--font-merriweather',
    weight: ['300', '400', '700', '900'],
})

const lora = Lora({
    subsets: ['latin'],
    variable: '--font-lora',
    weight: ['400', '500', '600', '700'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={`${merriweather.variable} ${lora.variable} font-mono`}>
            <Analytics />
            <Navbar />
            <NavbarMobile />
            <main>{children}</main>
        </main>
    )
}
