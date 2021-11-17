import { createStitches } from '@stitches/react'

export const { styled } = createStitches({
    theme: {
        fonts: {
            mono: 'Fira Code, monospace',
        },
        fontSizes: {
            1: '12px',
            2: '14px',
        },
        colors: {
            black: 'rgba(19, 19, 21, 1)',
            white: 'rgba(255, 255, 255, 1)',
            gray: 'rgba(128, 128, 128, 1)',
            blue: 'rgba(3, 136, 252, 1)',
            red: 'rgba(249, 16, 74, 1)',
            yellow: 'rgba(255, 221, 0, 1)',
            pink: 'rgba(232, 141, 163, 1)',
            turq: 'rgba(0, 245, 196, 1)',
            orange: 'rgba(255, 135, 31, 1)',
        },
        space: {
            1: '4px',
            2: '8px',
            3: '16px',
        },
        radii: {
            1: '2px',
            2: '4px',
        },
    },
})
