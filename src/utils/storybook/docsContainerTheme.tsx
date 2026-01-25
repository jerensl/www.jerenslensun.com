// Wrap the DocsContainer for storybook dark mode theme switching support.
import React from 'react'
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs/blocks'
import {
    DefaultThemeDark,
    DefaultThemeLight,
} from '../../../.storybook/defaultTheme'
import { ThemeVars } from '@storybook/theming'
import { UPDATE_GLOBALS } from '@storybook/core-events'

export const ThemedDocsContainer = (props: {
    children: React.ReactNode
    context: DocsContextProps
    theme?: ThemeVars
}) => {
    const { channel, store } = props.context
    const [isDark, setDark] = React.useState(true)

    React.useEffect(() => {
        const handleGlobalsChange = ({
            globals,
        }: {
            globals: { theme?: string }
        }) => {
            if (globals.theme) {
                setDark(globals.theme === 'dark')
            }
        }

        channel.on(UPDATE_GLOBALS, handleGlobalsChange)
        return () => channel.off(UPDATE_GLOBALS, handleGlobalsChange)
    }, [channel])

    return (
        <DocsContainer
            {...props}
            theme={isDark ? DefaultThemeDark : DefaultThemeLight}
        />
    )
}
