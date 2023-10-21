import { useOnScrollToc } from '@/hooks/useScrollToc'
import clsx from 'clsx'
import React from 'react'
import { MDXTitleHeadingLevels } from '@/types/content'
import { StandardLink } from './links/StandardLink'
import { LinkButton } from './links/LinkButton'

interface TableOfContentProps {
    toc: Array<{ id: string; text: string; level: MDXTitleHeadingLevels }>
}

export default function TableOfContent({ toc }: TableOfContentProps) {
    const { active } = useOnScrollToc({ headers: toc })
    const headingVariants = {
        H2: 'ml-0',
        H3: 'ml-6',
    }

    return (
        <div className="hidden max-h-[calc(100vh-9rem-113px)] overflow-auto pb-4 px-12 lg:block">
            <h3 className="text-gray-900 dark:text-gray-100 md:text-xl font-bold">
                Table of Contents
            </h3>
            <ul className="mt-4 flex flex-col space-y-2 text-sm">
                {toc.map(({ id, text, level }) => {
                    return (
                        <li key={id} className="w-full">
                            {/* <StandardLink
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    document
                                        .querySelector(`#${id}`)!
                                        .scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                }}
                                className={clsx(`${headingVariants[level]}`, {
                                    'text-gray-900 dark:text-gray-100':
                                        id === active,
                                    'text-gray-400 dark:text-gray-500':
                                        id !== active,
                                })}
                            >
                                {text}
                            </StandardLink> */}
                            <LinkButton
                                href={`#${id}`}
                                variant="text"
                                label={text}
                                fullWidth
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
