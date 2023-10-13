import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StandardLink } from './links/StandardLink'
import { HighlightLink } from './links/HighlightLink'
import { pageLinks } from '@/constant/page'
import { socialMediaLinks } from '@/constant/social-media'

function SitemapSection() {
    return (
        <div>
            <h2 className="text-lg font-bold text-gray-500 dark:text-white">
                Sitemap
            </h2>
            <div className="mt-2 flex font-semibold flex-col gap-1">
                {pageLinks.map(({ name, url }) => {
                    return (
                        <HighlightLink
                            key={name}
                            className="text-lg mr-auto"
                            href={url}
                        >
                            {name}
                        </HighlightLink>
                    )
                })}
            </div>
        </div>
    )
}

function ContactSection() {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-500 dark:text-white">
                Contact
            </h2>
            <div className="mt-2 flex font-semibold flex-col gap-1">
                {socialMediaLinks.map(({ name, url }) => {
                    return (
                        <HighlightLink
                            key={name}
                            className="text-lg not-italic mr-auto"
                            href={url}
                            isExternal
                        >
                            {name}
                        </HighlightLink>
                    )
                })}
            </div>
        </div>
    )
}

function AboutSection() {
    return (
        <div>
            <h1 className="text-xl font-bold text-center sm:text-left">
                Jerens S. Lensun
            </h1>
            <p className="text-secondary text-center sm:text-left mb-4 md:mb-6 max-w-md text-2xl">
                Software Engineering
            </p>
            <div className="flex space-x-6 h-10 justify-center sm:justify-start py-1">
                {socialMediaLinks
                    .filter(({ name }) => name !== 'RSS')
                    .map(({ icon, url }) => {
                        return (
                            <StandardLink
                                key={url}
                                href={url}
                                aria-label="Github"
                                isExternal
                            >
                                <FontAwesomeIcon
                                    className="hover:text-red-600 cursor-pointer"
                                    icon={icon}
                                    size="2x"
                                />
                            </StandardLink>
                        )
                    })}
            </div>
        </div>
    )
}

export const Footer = (): React.ReactElement => {
    return (
        <div className="relative px-5vw mt-10">
            <footer className="relative mx-auto grid max-w-7xl grid-cols-4 grid-rows-max-content gap-x-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6">
                <div className="col-span-full md:col-span-4 xl:col-span-6">
                    <AboutSection />
                </div>
                <div className="col-span-full md:col-span-2 mt-10 md:mt-0 xl:col-span-3">
                    <ContactSection />
                </div>
                <div className="col-span-full md:col-span-2 mt-10 md:mt-0 xl:col-span-1">
                    <SitemapSection />
                </div>
                <div className="col-span-full my-5 text-lg mb-24 md:mb-10 dark:text-blueGray-500 md:my-5 border-t border-gray-500">
                    <span>
                        © {new Date().getFullYear()} Jerens Lensun. All Rights
                        Reserved.
                    </span>
                </div>
            </footer>
        </div>
    )
}
