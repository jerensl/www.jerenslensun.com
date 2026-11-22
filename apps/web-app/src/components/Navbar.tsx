import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Notifications from './Notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeToggle from './ThemeToggle'
import { StandardLink } from './links/StandardLink'
import { pageLinks } from '@/constant/page'

const isActivePath = (pathname: string, href: string) =>
    href === '/'
        ? pathname === '/'
        : pathname === href || pathname.startsWith(`${href}/`)

/**
 * M3 small top app bar. At rest it sits flat on the surface; once the page
 * scrolls it moves to surface-container with a level-2 shadow.
 */
export const Navbar: React.FC = () => {
    const router = useRouter()
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4)

        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={clsx(
                'fixed inset-x-0 top-0 z-40 h-16 border-b transition-[background-color,box-shadow,border-color] duration-200 ease-emphasized',
                scrolled
                    ? 'border-transparent bg-surface-container shadow-elevation-2'
                    : 'border-outline-variant/60 bg-surface'
            )}
        >
            <div className="mx-auto flex h-full max-w-content items-center gap-2 px-4 sm:px-6 lg:px-8">
                <StandardLink
                    href="/"
                    aria-label="Jerens Lensun — home"
                    className="mr-2 inline-flex items-center gap-2 rounded-full px-2 py-1 text-title-large font-medium text-on-surface"
                >
                    <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full bg-primary"
                    />
                    Jerens
                </StandardLink>

                <nav
                    aria-label="Primary"
                    className="ml-2 hidden items-center gap-1 md:flex"
                >
                    {pageLinks
                        .filter(({ name }) => name !== 'Home')
                        .map(({ name, url }) => {
                            const active = isActivePath(router.pathname, url)

                            return (
                                <StandardLink
                                    key={url}
                                    href={url}
                                    className={clsx(
                                        'md-state-layer rounded-full px-4 py-2 text-label-large transition-colors duration-200 ease-emphasized',
                                        active
                                            ? 'bg-secondary-container text-on-secondary-container'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                    )}
                                >
                                    {name}
                                </StandardLink>
                            )
                        })}
                </nav>

                <div className="ml-auto flex items-center gap-1">
                    <Notifications />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

/**
 * M3 navigation bar for compact layouts. The active destination gets the
 * 32dp secondary-container indicator pill.
 */
export const NavbarMobile: React.FC = () => {
    const router = useRouter()

    return (
        <nav
            aria-label="Primary mobile"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant bg-surface-container pb-[env(safe-area-inset-bottom)] md:hidden"
        >
            <div className="flex h-20 items-stretch justify-around px-2">
                {pageLinks.map(({ name, url, icon }) => {
                    const active = isActivePath(router.pathname, url)

                    return (
                        <StandardLink
                            key={name}
                            href={url}
                            className="group flex flex-1 flex-col items-center justify-center gap-1 rounded-lg"
                        >
                            <span
                                className={clsx(
                                    'flex h-8 w-16 items-center justify-center rounded-full transition-colors duration-200 ease-emphasized',
                                    active
                                        ? 'bg-secondary-container text-on-secondary-container'
                                        : 'text-on-surface-variant group-hover:bg-on-surface/8'
                                )}
                            >
                                <FontAwesomeIcon
                                    icon={icon}
                                    className="text-[18px]"
                                />
                            </span>
                            <span
                                className={clsx(
                                    'text-label-medium',
                                    active
                                        ? 'font-semibold text-on-surface'
                                        : 'text-on-surface-variant'
                                )}
                            >
                                {name}
                            </span>
                        </StandardLink>
                    )
                })}
            </div>
        </nav>
    )
}
