import { merge } from 'lodash'

export type ThemeColorsMode = 'light' | 'dark'

export interface ThemeColorsBase {
    mode: ThemeColorsMode

    text: {
        primary: string
        secondary: string
        disabled: string
        link: string
        /** Used for auto white or dark text on colored backgrounds */
        maxContrast: string
    }

    border: {
        weak: string
        medium: string
        strong: string
    }

    background: {
        /** Dashboard and body background */
        canvas: string
        /** Primary content pane background (panels etc) */
        primary: string
        /** Cards and elements that need to stand out on the primary background */
        secondary: string
    }
}

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export type ThemeColorsInput = DeepPartial<ThemeColorsBase>

class LightColors implements ThemeColorsBase {
    mode: ThemeColorsMode = 'light'

    blackBase = '36, 41, 46'

    text = {
        primary: `rgba(${this.blackBase}, 1)`,
        secondary: `rgba(${this.blackBase}, 0.75)`,
        disabled: `rgba(${this.blackBase}, 0.50)`,
        link: '#1F62E0',
        maxContrast: '#000000',
    }

    border = {
        weak: `rgba(${this.blackBase}, 0.12)`,
        medium: `rgba(${this.blackBase}, 0.30)`,
        strong: `rgba(${this.blackBase}, 0.40)`,
    }

    background = {
        canvas: '#F4F5F5',
        primary: '#FFFFFF',
        secondary: '#F4F5F5',
    }
}

class DarkColors implements ThemeColorsBase {
    mode: ThemeColorsMode = 'light'

    whiteBase = '204, 204, 220'

    text = {
        primary: `rgb(${this.whiteBase})`,
        secondary: `rgba(${this.whiteBase}, 0.65)`,
        disabled: `rgba(${this.whiteBase}, 0.6)`,
        link: '#6E9FFF',
        maxContrast: '#FFFFFF',
    }

    border = {
        weak: `rgba(${this.whiteBase}, 0.12)`,
        medium: `rgba(${this.whiteBase}, 0.20)`,
        strong: `rgba(${this.whiteBase}, 0.30)`,
    }

    background = {
        canvas: '#111217',
        primary: '#181b1f',
        secondary: '#22252b',
    }
}

export function createColors(colors: ThemeColorsInput): ThemeColorsBase {
    const light = new LightColors()
    const dark = new DarkColors()

    const base = (colors.mode ?? 'dark') === 'dark' ? dark : light
    return base
}
