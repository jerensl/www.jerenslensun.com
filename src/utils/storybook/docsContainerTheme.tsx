// Wrap the DocsContainer for storybook-dark-mode theme switching support.
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs'
import React from 'react'
import { DefaultTheme } from '../../../.storybook/defaultTheme'

type Props = {
    context: DocsContextProps
    children?: React.ReactNode
}

export const ThemedDocsContainer = ({ children, context }: Props) => {
    return (
        <DocsContainer theme={DefaultTheme} context={context}>
            {children}
        </DocsContainer>
    )
}
