import { createStitches } from '@stitches/core'
import type * as Stitches from '@stitches/core'

export const {
    css,
    globalCss,
    keyframes,
    getCssText,
    config,
    theme,
    createTheme,
} = createStitches({
    theme: {
        colors: {
            black: 'rgb(64, 63, 83)',
            white: 'rgba(255, 255, 255, 1)',
            gray: 'rgb(152, 159, 177)',
            blue: 'rgba(3, 136, 252, 1)',
            red: 'rgba(249, 16, 74, 1)',
            yellow: 'rgba(255, 221, 0, 1)',
            pink: 'rgba(232, 141, 163, 1)',
            turq: 'rgba(0, 245, 196, 1)',
            orange: 'rgba(255, 135, 31, 1)',
            copy: 'rgba(170, 170, 175, 1)',
        },
        fonts: {
            sans: 'Inter, sans-serif',
            mono: 'Fira Mono, monospace',
            web3: 'Pirata One',
        },
        fontSizes: {
            1: '12px',
            2: '14px',
            3: '16px',
            4: '20px',
            5: '24px',
            6: '32px',
            7: '48px',
            8: '64px',
            9: '72px',
        },
        space: {
            1: '4px',
            2: '8px',
            3: '16px',
            4: '32px',
            5: '64px',
            6: '128px',
            7: '256px',
            8: '512px',
        },
        sizes: {
            1: '4px',
            2: '8px',
            3: '16px',
            4: '32px',
            5: '64px',
            6: '128px',
            7: '256px',
            8: '512px',
        },
        lineHeights: {
            1: '18px',
            2: '21px',
            3: '24px',
            4: '30px',
            5: '36px',
            6: '48px',
            7: '72px',
            8: '96px',
            9: '108px',
        },
        radii: {
            1: '2px',
            2: '4px',
            3: '8px',
            round: '9999px',
        },
    },
    media: {
        bp1: '(min-width: 575px)',
        bp2: '(min-width: 750px)',
        bp3: '(min-width: 1000px)',
        bp4: '(min-width: 1200px)',
    },
    utils: {
        p: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingTop: value,
            paddingBottom: value,
            paddingLeft: value,
            paddingRight: value,
        }),
        pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingTop: value,
        }),
        pr: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingRight: value,
        }),
        pb: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingBottom: value,
        }),
        pl: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingLeft: value,
        }),
        px: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingLeft: value,
            paddingRight: value,
        }),
        py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingTop: value,
            paddingBottom: value,
        }),
        m: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginTop: value,
            marginBottom: value,
            marginLeft: value,
            marginRight: value,
        }),
        mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginTop: value,
        }),
        mr: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginRight: value,
        }),
        mb: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginBottom: value,
        }),
        ml: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginLeft: value,
        }),
        mx: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginLeft: value,
            marginRight: value,
        }),
        my: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginTop: value,
            marginBottom: value,
        }),
        size: (value: Stitches.PropertyValue<'width'>) => ({
            width: value,
            height: value,
        }),
        bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
            backgroundColor: value,
        }),
    },
})

export type CSS = Stitches.CSS<typeof config>

export const metaverse = createTheme('metaverse', {
    colors: {
        // black: 'rgba(255, 255, 255, 1)',
        // white: 'rgba(19, 19, 21, 1)',
        // gray: 'rgba(128, 128, 128, 1)',
        // blue: 'rgba(3, 136, 252, 1)',
        // red: 'rgba(249, 16, 74, 1)',
        // yellow: 'rgba(255, 221, 0, 1)',
        // pink: 'rgba(232, 141, 163, 1)',
        // turq: 'rgba(0, 245, 196, 1)',
        // orange: 'rgba(255, 135, 31, 1)',
        // copy: 'rgba(130, 130, 135, 1)',
    },
    fonts: {
        // sans: 'Pirata One',
        // mono: 'Pirata One',
        // web3: 'Pirata One',
    },
})
