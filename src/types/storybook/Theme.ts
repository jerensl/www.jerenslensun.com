import { ThemeColorsBase } from '@/utils/storybook/createColors'
import { ThemeTypography } from './ThemeTypography'
import { ThemeShadows } from '@/utils/storybook/createShadows'
import { ThemeComponents } from '@/utils/storybook/createComponents'

export interface IDefaultTheme {
    name: string
    isDark: boolean
    isLight: boolean
    typography: ThemeTypography
    colors: ThemeColorsBase
    shadows: ThemeShadows
    components: ThemeComponents
}
