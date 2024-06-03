import React from 'react'
import { pre } from '../styles/code'
import { CopyToClipboard } from './CopyClipboard'
import { StandardLink } from './links/StandardLink'
import Image from 'next/image'

interface Components {
    children?: React.ReactNode
    theme?: 'pink' | 'turq' | 'orange'
    showlinenumbers?: any
}

const components: import('mdx/types').MDXComponents = {
    pre: ({ children, theme, showlinenumbers }: Components) => {
        return (
            <CopyToClipboard>
                <pre
                    className={pre({
                        theme,
                        showlinenumbers: typeof showlinenumbers === 'string',
                        css: {
                            mx: '-$3',
                            mt: '$3',
                            mb: '$4',

                            '[data-preview] + &': {
                                marginTop: '0',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            },

                            '@bp1': {
                                mx: 0,
                                borderRadius: '$3',
                            },
                        },
                    })}
                >
                    {children}
                </pre>
            </CopyToClipboard>
        )
    },
    h2: ({ children, id }: React.HTMLProps<HTMLHeadingElement>) => {
        return (
            <h2 id={id} className="text-lg scroll-mt-20">
                {children}
            </h2>
        )
    },
    h3: ({ children, id }: React.HTMLProps<HTMLHeadingElement>) => {
        return (
            <h3 id={id} className="text-base scroll-mt-20">
                {children}
            </h3>
        )
    },
    h4: ({ children, id }: React.HTMLProps<HTMLHeadingElement>) => {
        return (
            <h4 id={id} className="text-sm scroll-mt-20">
                {children}
            </h4>
        )
    },
    blockquote: ({ children }: React.HTMLProps<HTMLQuoteElement>) => {
        return (
            <div className="px-4 border-l-4 border-l-red-500 font-bold italic">
                {children}
            </div>
        )
    },
    a: ({ children, href }: React.HTMLProps<HTMLAnchorElement>) => {
        return (
            <StandardLink href={href as string} isExternal={true}>
                {children}
            </StandardLink>
        )
    },
    img: ({ src, alt, width, height }: React.HTMLProps<HTMLImageElement>) => {
        return (
            <Image
                src={src as string}
                alt={alt as string}
                width={width as number}
                height={height as number}
            />
        )
    },
}

export { components }
