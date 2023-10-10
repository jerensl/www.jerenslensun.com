import { IDefaultTheme } from '@/types/storybook'
import { createTypography } from './generateTypography'

export function createTheme(): IDefaultTheme {
    const typography = createTypography()

    return {
        typography,
    }
}
