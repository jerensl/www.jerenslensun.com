import { IDefaultTheme } from '@/types/storybook/Theme'
import { ThemeTypographyInput, createTypography } from './createTypography'
import { ThemeColorsInput, createColors } from './createColors'
import { createComponents } from './createComponents'
import { createShadows } from './createShadows'
import { ThemeSpacingOptions, createSpacing } from './createSpacing'
import { ThemeShapeInput, createShape } from './createShape'

export interface NewThemeOptions {
    name?: string
    typography?: ThemeTypographyInput
    colors?: ThemeColorsInput
    shape?: ThemeShapeInput
    spacing?: ThemeSpacingOptions
}

export function createTheme(options: NewThemeOptions = {}): IDefaultTheme {
    const {
        colors: colorsInput = {},
        typography: typographyInput = {},
        shape: shapeInput = {},
        spacing: spacingInput = {},
    } = options

    const colors = createColors(colorsInput)
    const typography = createTypography(colors, typographyInput)
    const shadows = createShadows(colors)
    const components = createComponents(colors, shadows)
    const spacing = createSpacing(spacingInput)
    const shape = createShape(shapeInput)

    const theme = {
        name: colors.mode === 'dark' ? 'Dark' : 'Light',
        isDark: colors.mode === 'dark',
        isLight: colors.mode === 'light',
        typography,
        shadows,
        components,
        spacing,
        colors,
        shape,
    }

    return {
        ...theme,
    }
}
