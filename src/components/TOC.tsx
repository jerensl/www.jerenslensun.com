import { useOnScrollToc } from '@/hooks/useScrollToc'
import React from 'react'
import { MDXTitleHeadingLevels } from '@/types/content'
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
