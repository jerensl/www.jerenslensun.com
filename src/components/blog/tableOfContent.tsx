import { useOnScrollToc } from '@/hooks/useScrollToc'
import clsx from 'clsx'
import React from 'react'
import { LinkURL } from '../LinkURL'

interface TableOfContentProps {
    toc: Array<{ id: string; text: string }>
}

export default function TableOfContent({ toc }: TableOfContentProps) {
    const { active } = useOnScrollToc({ headers: toc })

    return (
        <div className="hidden max-h-[calc(100vh-9rem-113px)] overflow-auto pb-4 px-12 lg:block">
            <h3 className="text-gray-900 dark:text-gray-100 md:text-xl">
                Table of Contents
            </h3>
            <ul className="mt-4 flex flex-col space-y-2 text-sm">
                {toc.map(({ id, text }) => {
                    return (
                        <li key={id}>
                            <LinkURL
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    document
                                        .querySelector(`#${id}`)!
                                        .scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                }}
                                className={clsx('', {
                                    'text-gray-900 dark:text-gray-100':
                                        id === active,
                                    'text-gray-400 dark:text-gray-500':
                                        id !== active,
                                })}
                            >
                                {text}
                            </LinkURL>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
