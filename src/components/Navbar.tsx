import React from 'react'
import { LinkURL } from './LinkURL'

export const Navbar = (): React.ReactElement => {
    return (
        <nav className="fixed w-full z-10 bg-white mx-auto px-4 sm:px-10">
            <div className="flex text-center border-b-2 h-full w-full border-gray-100">
                <LinkURL
                    href="/"
                    className="font-semibold m-auto md:m-0 text-xl py-5 w-24 hover:bg-gray-100"
                >
                    Jerens
                </LinkURL>
                <div className="justify-end text-center h-full w-full hidden md:flex">
                    <LinkURL
                        href="/blog"
                        className="hidden md:block font-semibold text-gray-800 text-xl py-5 w-24 hover:bg-gray-100"
                    >
                        Blog
                    </LinkURL>
                    <LinkURL
                        href="/about"
                        className="hidden md:block font-semibold text-gray-800 text-xl py-5 w-24 hover:bg-gray-100"
                    >
                        About
                    </LinkURL>
                </div>
            </div>
        </nav>
    )
}
