import '../src/styles/globals.css'
import { withThemeByDataAttribute } from '@storybook/addon-styling'

export const decorators = [
    withThemeByDataAttribute({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'light',
        attributeName: 'data-mode',
    }),
]
