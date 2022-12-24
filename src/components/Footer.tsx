import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithubSquare,
    faTwitterSquare,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function SitemapSection() {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-200">
                Sitemap
            </h2>
            <div className="mt-2 flex flex-col gap-1">
                <Link className="text-lg" href="/">
                    Home
                </Link>
                <Link className="text-lg" href="/blog">
                    Blog
                </Link>
                <Link className="text-lg" href="/project">
                    Project
                </Link>
                <Link className="text-lg" href="/about">
                    About
                </Link>
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
                <Link className="text-lg" href="https://twitter.com/jerensl22">
                    Twitter
                </Link>
                <Link className="text-lg" href="http://instagram.com/jerensl">
                    Instagram
                </Link>
                <Link
                    className="text-lg"
                    href="https://www.linkedin.com/in/jerensl/"
                >
                    linkedin
                </Link>
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
                <Link href="https://github.com/jerensl" aria-label="Github">
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faGithubSquare}
                        size="2x"
                    />
                </Link>
                <Link href="https://twitter.com/jerensl22" aria-label="Twitter">
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faTwitterSquare}
                        size="2x"
                    />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/jerensl/"
                    aria-label="Linkedin"
                >
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faLinkedin}
                        size="2x"
                    />
                </Link>
                <Link
                    href="https://www.jerenslensun.com/rss.xml"
                    aria-label="RSS"
                >
                    <FontAwesomeIcon
                        className="hover:text-red-600 cursor-pointer"
                        icon={faRssSquare}
                        size="2x"
                    />
                </Link>
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
