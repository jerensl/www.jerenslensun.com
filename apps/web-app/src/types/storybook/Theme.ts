import { ThemeColors, ThemeColorsBase } from '@/utils/storybook/createColors'
import { ThemeTypography } from './ThemeTypography'
import { ThemeShadows } from '@/utils/storybook/createShadows'
import { ThemeComponents } from '@/utils/storybook/createComponents'
import { ThemeSpacing } from '@/utils/storybook/createSpacing'
import { ThemeShape } from '@/utils/storybook/createShape'

export interface IDefaultTheme {
    name: string
    isDark: boolean
    isLight: boolean
    typography: ThemeTypography
    colors: ThemeColors
    shadows: ThemeShadows
    components: ThemeComponents
    spacing: ThemeSpacing
    shape: ThemeShape
}
