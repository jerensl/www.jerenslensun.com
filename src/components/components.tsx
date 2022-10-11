import React from 'react'
import { pre } from './pre'
import { CopyToClipboard } from './copy-clipboard'

interface Components {
    children?: React.ReactNode
    theme?: 'pink' | 'turq' | 'orange'
    showlinenumbers?: any
}

const components = {
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
    h2: ({ children }: any) => {
        return <h2 className="text-xl">{children}</h2>
    },
    blockquote: ({ children }: any) => {
        return (
            <div className="px-4 border-l-4 border-l-red-500 bg-opacity-10 bg-red-500 text-red-500 font-bold">
                {children}
            </div>
        )
    },
}

export { components }
