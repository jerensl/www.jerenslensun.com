import React from 'react'
import { LinkURL } from './LinkURL'

export const Navbar: React.FC = () => {
    return (
        <nav className="fixed w-full bg-white mx-auto px-4 sm:px-6">
            <div className="flex justify-between text-center border-b-2 h-full w-full border-gray-100">
                <LinkURL href="/">
                    <a className="font-bold text-xl py-4 w-24 hover:bg-gray-100">
                        Jerens
                    </a>
                </LinkURL>
                <LinkURL href="/about">
                    <a className="font-bold text-xl py-4 w-24 hover:bg-gray-100">
                        About
                    </a>
                </LinkURL>
            </div>
        </nav>
    )
}
