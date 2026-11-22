import { useOnScrollToc } from '@/hooks/useScrollToc'
import clsx from 'clsx'
import React from 'react'
import { MDXTitleHeadingLevels } from '@/types/content'
import { StandardLink } from './links/StandardLink'

interface TableOfContentProps {
    toc: Array<{ id: string; text: string; level: MDXTitleHeadingLevels }>
}

export default function TableOfContent({ toc }: TableOfContentProps) {
    const { active } = useOnScrollToc({ headers: toc })
    const headingVariants = {
        H2: 'pl-0',
        H3: 'pl-4',
    }

    if (toc.length === 0) return null

    return (
        <nav
            aria-label="Table of contents"
            className="max-h-[calc(100vh-9rem)] overflow-auto rounded-lg bg-surface-container-low p-4"
        >
            <h2 className="text-title-small text-on-surface">
                Table of Contents
            </h2>
            <ul className="mt-3 flex flex-col gap-0.5">
                {toc.map(({ id, text, level }) => {
                    const isActive = active === id

                    return (
                        <li key={id} className="w-full">
                            <StandardLink
                                href={`#${id}`}
                                aria-current={isActive ? 'location' : undefined}
                                className={clsx(
                                    'block rounded-sm py-1.5 pr-2 text-body-medium no-underline transition-colors duration-200 ease-standard',
                                    headingVariants[level] ?? 'pl-0',
                                    isActive
                                        ? 'bg-secondary-container pl-3 font-medium text-on-secondary-container'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                )}
                            >
                                {text}
                            </StandardLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
