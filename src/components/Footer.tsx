import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { StandardLink } from './links/StandardLink'

function SitemapSection() {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-200">
                Sitemap
            </h2>
            <div className="mt-2 flex flex-col gap-1">
                <StandardLink className="text-lg" href="/">
                    Home
                </StandardLink>
                <StandardLink className="text-lg" href="/blog">
                    Blog
                </StandardLink>
                <StandardLink className="text-lg" href="/project">
                    Project
                </StandardLink>
                <StandardLink className="text-lg" href="/about">
                    About
                </StandardLink>
            </div>
        </div>
    )
}

function ContactSection() {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-200">
                Contact
            </h2>
            <div className="mt-2 flex flex-col gap-1">
                <StandardLink
                    className="text-lg not-italic"
                    href="https://twitter.com/jerensl22"
                    isExternal={true}
                >
                    Twitter
                </StandardLink>
                <StandardLink
                    className="text-lg not-italic"
                    href="http://instagram.com/jerensl"
                    isExternal={true}
                >
                    Instagram
                </StandardLink>
                <StandardLink
                    className="text-lg not-italic"
                    href="https://www.linkedin.com/in/jerensl/"
                    isExternal={true}
                >
                    linkedin
                </StandardLink>
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
                <StandardLink
                    href="https://github.com/jerensl"
                    aria-label="Github"
                    isExternal={true}
                >
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faGithubSquare}
                        size="2x"
                    />
                </StandardLink>
                <StandardLink
                    href="https://twitter.com/jerensl22"
                    aria-label="Twitter"
                    isExternal={true}
                >
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faTwitterSquare}
                        size="2x"
                    />
                </StandardLink>
                <StandardLink
                    href="https://www.linkedin.com/in/jerensl/"
                    aria-label="Linkedin"
                    isExternal={true}
                >
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faLinkedin}
                        size="2x"
                    />
                </StandardLink>
                <StandardLink
                    href="https://www.jerenslensun.com/rss.xml"
                    aria-label="RSS"
                >
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faRssSquare}
                        size="2x"
                    />
                </StandardLink>
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
