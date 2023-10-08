import '../src/styles/globals.css'
import { withThemeByClassName } from '@storybook/addon-styling'
import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'

const preview: Preview = {
    decorators: [
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
        }),
    ],
    parameters: {
        docs: {
            theme: themes.light,
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            // Sort stories first by Docs Overview, then alphabetically
            // We should be able to use the builtin alphabetical sort, but is broken in SB 7.0
            // https://github.com/storybookjs/storybook/issues/22470
            storySort: (a, b) => {
                if (a.title.startsWith('Docs Overview')) {
                    if (b.title.startsWith('Docs Overview')) {
                        return 0
                    }
                    return -1
                } else if (b.title.startsWith('Docs Overview')) {
                    return 1
                }
                return a.id === b.id
                    ? 0
                    : a.id.localeCompare(b.id, undefined, { numeric: true })
            },
        },
    },
}

export default preview
