import React from 'react'
import Notifications from './Notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeToggle from './ThemeToggle'
import { StandardLink } from './links/StandardLink'
import { HighlightLink } from './links/HighlightLink'
import { pageLinks } from '@/constant/page'

export const Navbar: React.FC = () => {
    return (
        <nav className="fixed w-full z-10 bg-background px-5vw">
            <div className="flex text-center justify-between h-full w-full border-gray-100">
                <HighlightLink
                    href="/"
                    className="font-sans font-medium text-xl my-5 py-2"
                >
                    Jerens
                </HighlightLink>
                <div className="flex text-center my-auto gap-2">
                    <div className="text-center relative h-full hidden md:flex">
                        {pageLinks
                            .filter(({ name }) => name !== 'Home')
                            .map(({ name, url }) => {
                                return (
                                    <HighlightLink
                                        key={url}
                                        href={url}
                                        className="font-sans hidden md:block font-medium text-gray-800 dark:text-white text-xl my-4 mx-5 py-2"
                                    >
                                        {name}
                                    </HighlightLink>
                                )
                            })}
                    </div>
                    <Notifications />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export const NavbarMobile: React.FC = () => {
    return (
        <div className="fixed flex w-full px-10 py-2 bottom-0 h-18 bg-white dark:bg-neutral-800 z-40 md:hidden">
            <div className="flex justify-between w-full">
                {pageLinks.map(({ name, url, icon }) => {
                    return (
                        <div className="flex-1 group" key={name}>
                            <StandardLink
                                className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-600 dark:text-gray-200 group-hover:text-red-500 border-b-2 border-transparent group-hover:border-red-500"
                                href={url}
                            >
                                <span className="block px-1 pt-1 pb-2">
                                    <FontAwesomeIcon
                                        className="block"
                                        icon={icon}
                                    />
                                    <span className="text-xs pb-1 block">
                                        {name}
                                    </span>
                                </span>
                            </StandardLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
