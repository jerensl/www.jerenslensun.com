// Wrap the DocsContainer for storybook-dark-mode theme switching support.
import React from 'react'
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs/blocks'
import {
  DefaultThemeDark,
  DefaultThemeLight,
} from '../../../.storybook/defaultTheme'
import { ThemeVars } from '@storybook/theming'

export const ThemedDocsContainer = (props: {
  children: React.ReactNode
  context: DocsContextProps
  theme?: ThemeVars
}) => {
  const [isDark, setDark] = React.useState(true)

  // React.useEffect(() => {
  //     props.context.channel.on(DARK_MODE_EVENT_NAME, setDark)
  //
  //     return () =>
  //         props.context.channel.removeListener(DARK_MODE_EVENT_NAME, setDark)
  // }, [props.context.channel])

  return (
    <DocsContainer
      {...props}
      theme={isDark ? DefaultThemeDark : DefaultThemeLight}
    />
  )
}
