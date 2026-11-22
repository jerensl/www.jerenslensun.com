import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StandardLink } from './links/StandardLink'
import { pageLinks } from '@/constant/page'
import { socialMediaLinks } from '@/constant/social-media'

function FooterHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="text-title-small text-on-surface">{children}</h2>
}

function SitemapSection() {
    return (
        <div>
            <FooterHeading>Sitemap</FooterHeading>
            <ul className="mt-3 flex flex-col gap-1">
                {pageLinks.map(({ name, url }) => (
                    <li key={name}>
                        <StandardLink
                            href={url}
                            className="inline-flex rounded-xs px-1 py-1 text-body-medium text-on-surface-variant transition-colors duration-200 ease-standard hover:text-primary"
                        >
                            {name}
                        </StandardLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ContactSection() {
    return (
        <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-3 flex flex-col gap-1">
                {socialMediaLinks.map(({ name, url }) => (
                    <li key={name}>
                        <StandardLink
                            href={url}
                            isExternal
                            className="inline-flex rounded-xs px-1 py-1 text-body-medium text-on-surface-variant no-underline transition-colors duration-200 ease-standard hover:text-primary"
                        >
                            {name}
                        </StandardLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function AboutSection() {
    return (
        <div className="max-w-md">
            <div className="flex items-center gap-2">
                <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-primary"
                />
                <span className="text-title-large font-medium text-on-surface">
                    Jerens S. Lensun
                </span>
            </div>
            <p className="mt-3 text-body-medium text-on-surface-variant">
                Software engineer working inside Servo, the Rust browser engine.
                Writing about web-platform behavior, developer tooling, and the
                systems that keep an engine maintainable.
            </p>
            <div className="mt-5 flex flex-wrap gap-1">
                {socialMediaLinks
                    .filter(({ name }) => name !== 'RSS')
                    .map(({ name, icon, url }) => (
                        <StandardLink
                            key={url}
                            href={url}
                            aria-label={name}
                            isExternal
                            className="md-state-layer inline-flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant no-underline transition-colors duration-200 ease-emphasized hover:text-primary"
                        >
                            <FontAwesomeIcon icon={icon} className="text-lg" />
                        </StandardLink>
                    ))}
            </div>
        </div>
    )
}

export const Footer = ({
    currentYear,
}: {
    currentYear: string | number
}): React.ReactElement => {
    return (
        <footer className="mt-16 border-t border-outline-variant bg-surface-container-low pb-24 md:mt-24 md:pb-0">
            <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <AboutSection />
                    </div>
                    <div className="md:col-span-3 md:col-start-7">
                        <SitemapSection />
                    </div>
                    <div className="md:col-span-3">
                        <ContactSection />
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-outline-variant pt-6 text-body-small text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {currentYear} Jerens Lensun. All rights reserved.
                    </span>
                    <div className="flex flex-wrap items-center gap-4">
                        <span>Built with Next.js · Material Design 3</span>
                        <a
                            href="#main-content"
                            className="inline-flex items-center gap-1 rounded-xs font-medium text-primary"
                        >
                            Back to top
                            <span aria-hidden="true">↑</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
