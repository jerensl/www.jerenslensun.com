import { IDefaultTheme } from '@/types/storybook/Theme'
import { ThemeTypographyInput, createTypography } from './createTypography'
import { ThemeColorsInput, createColors } from './createColors'
import { createComponents } from './createComponents'
import { createShadows } from './createShadows'

export interface NewThemeOptions {
    name?: string
    typography?: ThemeTypographyInput
    colors?: ThemeColorsInput
}

/** @internal */
export function createTheme(options: NewThemeOptions = {}): IDefaultTheme {
    const { colors: colorsInput = {}, typography: typographyInput = {} } =
        options

    const colors = createColors(colorsInput)
    const typography = createTypography(colors, typographyInput)
    const shadows = createShadows(colors)
    const components = createComponents(colors, shadows)

    const theme = {
        name: colors.mode === 'dark' ? 'Dark' : 'Light',
        isDark: colors.mode === 'dark',
        isLight: colors.mode === 'light',
        typography,
        shadows,
        components,
        colors,
    }

    return {
        ...theme,
    }
}
