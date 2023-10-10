import { create } from '@storybook/theming/create'
import { createTheme } from '../src/utils/storybook/createTheme'
import { IDefaultTheme } from '../src/types/storybook'

const createStorybookTheme = (theme: IDefaultTheme) => {
    return create({
        base: 'light',
        // Typography
        fontBase: '"Inter", "Helvetica", "Arial", sans-serif',
        fontCode: "'Roboto Mono', monospace",

        brandTitle: 'Jerens',
        brandUrl: 'https://www.jerensl.com',
        brandTarget: '_self',
    })
}

const DefaultTheme = createStorybookTheme(createTheme())

export { DefaultTheme }
