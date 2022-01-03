import React, { useState } from 'react'
import { LinkURL } from './LinkURL'
import { Sidebar } from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Navbar = (): React.ReactElement => {
    const [showSidebar, setShowSidebar] = useState(false)

    const handleOpenSidebar = () => setShowSidebar(true)

    const handleCloseSidebar = () => setShowSidebar(false)

    return (
        <nav className="fixed w-full z-10 bg-white mx-auto px-4 sm:px-10">
            <div className="flex justify-between text-center border-b-2 h-full w-full border-gray-100">
                <LinkURL href="/">
                    <a className="font-semibold text-xl py-4 w-24 hover:bg-gray-100">
                        Jerens
                    </a>
                </LinkURL>
                <div className="flex justify-end text-center h-full w-full">
                    <LinkURL href="/blog">
                        <a className="hidden md:block font-semibold text-xl py-4 w-24 hover:bg-gray-100">
                            Blog
                        </a>
                    </LinkURL>
                    <LinkURL href="/about">
                        <a className="hidden md:block font-semibold text-xl py-4 w-24 hover:bg-gray-100">
                            About
                        </a>
                    </LinkURL>
                    <button
                        className="block p-5 md:hidden md:p-4"
                        onClick={handleOpenSidebar}
                        aria-label="Open Sidebar"
                    >
                        <FontAwesomeIcon
                            className="text-xl"
                            icon={['fas', 'bars']}
                        />
                    </button>
                    <Sidebar
                        handleSidebarClosed={handleCloseSidebar}
                        showSidebar={showSidebar}
                    />
                </div>
            </div>
        </nav>
    )
}
