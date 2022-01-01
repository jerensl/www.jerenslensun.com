import React from 'react'
import { pre } from './Pre'

const components = {
    pre: ({ children, theme, showLineNumbers }) => {
        return (
            <pre
                className={pre({
                    theme,
                    showLineNumbers: typeof showLineNumbers === 'string',
                    css: {
                        mx: '-$3',
                        mt: '$3',
                        mb: '$5',

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
        )
    },
}

export { components }
