import React from 'react'
import { LinkURL } from './LinkURL'
import { Notifications } from './Notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faAddressCard,
    faFileCode,
    faCopy,
} from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

export const Navbar = (): React.ReactElement => {
    return (
        <nav className="fixed w-full z-10 bg-white dark:bg-neutral-900 px-5vw">
            <div className="flex text-center justify-between border-b-2 h-full w-full border-gray-100">
                <LinkURL
                    href="/"
                    className="font-semibold m-0 text-xl py-5 w-24 hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                    Jerens
                </LinkURL>
                <div className="flex text-center my-auto h-full">
                    <div className="text-center relative h-full w-full hidden md:flex">
                        <LinkURL
                            href="/blog"
                            className="hidden md:block font-semibold text-gray-800 dark:text-white text-xl py-5 w-24 hover:bg-gray-100 dark:hover:bg-neutral-800"
                        >
                            Blog
                        </LinkURL>
                        <LinkURL
                            href="/project"
                            className="hidden md:block font-semibold text-gray-800 dark:text-white text-xl py-5 w-24 hover:bg-gray-100 dark:hover:bg-neutral-800"
                        >
                            Project
                        </LinkURL>
                        <LinkURL
                            href="/about"
                            className="hidden md:block font-semibold text-gray-800 dark:text-white text-xl py-5 w-24 hover:bg-gray-100 dark:hover:bg-neutral-800"
                        >
                            About
                        </LinkURL>
                    </div>
                    <Notifications />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export const NavbarMobile = (): React.ReactElement => {
    return (
        <div className="fixed flex w-full px-10 py-2 bottom-0 h-18 bg-white dark:bg-neutral-800 z-40 md:hidden">
            <div className="flex justify-between w-full">
                <div className="flex-1 group">
                    <LinkURL
                        className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-600 dark:text-gray-200 group-hover:text-red-500 border-b-2 border-transparent group-hover:border-red-500"
                        href="/"
                    >
                        <span className="block px-1 pt-1 pb-2">
                            <FontAwesomeIcon className="block" icon={faHome} />
                            <span className="text-xs pb-1 block">Home</span>
                        </span>
                    </LinkURL>
                </div>
                <div className="flex-1 group">
                    <LinkURL
                        className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-600 dark:text-gray-200 group-hover:text-red-500 border-b-2 border-transparent group-hover:border-red-500"
                        href="/blog"
                    >
                        <span className="block px-1 pt-1 pb-2">
                            <FontAwesomeIcon className="block" icon={faCopy} />
                            <span className="text-xs pb-1 block">Blog</span>
                        </span>
                    </LinkURL>
                </div>
                <div className="flex-1 group">
                    <LinkURL
                        className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-600 dark:text-gray-200 group-hover:text-red-500 border-b-2 border-transparent group-hover:border-red-500"
                        href="/project"
                    >
                        <span className="block px-1 pt-1 pb-2">
                            <FontAwesomeIcon
                                className="block"
                                icon={faFileCode}
                            />
                            <span className="text-xs pb-1 block">Project</span>
                        </span>
                    </LinkURL>
                </div>
                <div className="flex-1 group">
                    <LinkURL
                        className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-600 dark:text-gray-200 group-hover:text-red-500 border-b-2 border-transparent group-hover:border-red-500"
                        href="/about"
                    >
                        <span className="block px-1 pt-1 pb-2">
                            <FontAwesomeIcon
                                className="block"
                                icon={faAddressCard}
                            />
                            <span className="text-xs pb-1 block">About</span>
                        </span>
                    </LinkURL>
                </div>
            </div>
        </div>
    )
}
