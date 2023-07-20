import React from 'react'

interface TableOfContentProps {
    toc: Array<{ id: string; text: string }>
}

export default function TableOfContent({ toc }: TableOfContentProps) {
    return (
        <div className="hidden max-h-[calc(100vh-9rem-113px)] overflow-auto pb-4 px-12 lg:block">
            <h3 className="text-gray-900 dark:text-gray-100 md:text-xl">
                Table of Contents
            </h3>
            <ul className="mt-4 flex flex-col space-y-2 text-sm">
                {toc.map(({ id, text }) => {
                    return (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    document
                                        .querySelector(`#${id}`)!
                                        .scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                }}
                            >
                                {text}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
