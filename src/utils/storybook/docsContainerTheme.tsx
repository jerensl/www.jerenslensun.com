// Wrap the DocsContainer for storybook-dark-mode theme switching support.
import React from 'react'
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs'
import { useDarkMode } from 'storybook-dark-mode'
import {
    DefaultThemeDark,
    DefaultThemeLight,
} from '../../../.storybook/defaultTheme'

type Props = {
    context: DocsContextProps
    children?: React.ReactNode
}

export const ThemedDocsContainer = ({ children, context }: Props) => {
    const dark = useDarkMode()
    return (
        <DocsContainer
            theme={dark ? DefaultThemeDark : DefaultThemeLight}
            context={context}
        >
            {children}
        </DocsContainer>
    )
}
