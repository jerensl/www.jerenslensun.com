import type { Config } from 'tailwindcss'

const color = (token: string) => `rgb(var(${token}) / <alpha-value>)`

/**
 * Material Design 3 theme.
 *
 * Color, shape, elevation, motion and type-scale values are exposed as
 * Tailwind utilities backed by the CSS custom properties in
 * `src/styles/tokens.css`. Keeping the tokens in CSS lets the theme flip
 * between light and dark without duplicating utility classes.
 */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'var(--font-roboto)',
                    'Roboto',
                    'system-ui',
                    'sans-serif',
                ],
                mono: [
                    'var(--font-roboto-mono)',
                    'Roboto Mono',
                    'ui-monospace',
                    'monospace',
                ],
                display: [
                    'var(--font-roboto)',
                    'Roboto',
                    'system-ui',
                    'sans-serif',
                ],
            },
            fontSize: {
                'display-large': [
                    'var(--md-sys-typescale-display-large-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-display-large-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-display-large-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-display-large-weight)',
                    },
                ],
                'display-medium': [
                    'var(--md-sys-typescale-display-medium-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-display-medium-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-display-medium-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-display-medium-weight)',
                    },
                ],
                'display-small': [
                    'var(--md-sys-typescale-display-small-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-display-small-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-display-small-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-display-small-weight)',
                    },
                ],
                'headline-large': [
                    'var(--md-sys-typescale-headline-large-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-headline-large-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-headline-large-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-headline-large-weight)',
                    },
                ],
                'headline-medium': [
                    'var(--md-sys-typescale-headline-medium-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-headline-medium-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-headline-medium-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-headline-medium-weight)',
                    },
                ],
                'headline-small': [
                    'var(--md-sys-typescale-headline-small-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-headline-small-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-headline-small-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-headline-small-weight)',
                    },
                ],
                'title-large': [
                    'var(--md-sys-typescale-title-large-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-title-large-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-title-large-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-title-large-weight)',
                    },
                ],
                'title-medium': [
                    'var(--md-sys-typescale-title-medium-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-title-medium-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-title-medium-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-title-medium-weight)',
                    },
                ],
                'title-small': [
                    'var(--md-sys-typescale-title-small-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-title-small-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-title-small-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-title-small-weight)',
                    },
                ],
                'body-large': [
                    'var(--md-sys-typescale-body-large-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-body-large-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-body-large-tracking)',
                        fontWeight: 'var(--md-sys-typescale-body-large-weight)',
                    },
                ],
                'body-medium': [
                    'var(--md-sys-typescale-body-medium-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-body-medium-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-body-medium-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-body-medium-weight)',
                    },
                ],
                'body-small': [
                    'var(--md-sys-typescale-body-small-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-body-small-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-body-small-tracking)',
                        fontWeight: 'var(--md-sys-typescale-body-small-weight)',
                    },
                ],
                'label-large': [
                    'var(--md-sys-typescale-label-large-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-label-large-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-label-large-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-label-large-weight)',
                    },
                ],
                'label-medium': [
                    'var(--md-sys-typescale-label-medium-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-label-medium-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-label-medium-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-label-medium-weight)',
                    },
                ],
                'label-small': [
                    'var(--md-sys-typescale-label-small-size)',
                    {
                        lineHeight:
                            'var(--md-sys-typescale-label-small-line-height)',
                        letterSpacing:
                            'var(--md-sys-typescale-label-small-tracking)',
                        fontWeight:
                            'var(--md-sys-typescale-label-small-weight)',
                    },
                ],
            },
            borderRadius: {
                xs: 'var(--md-sys-shape-corner-extra-small)',
                sm: 'var(--md-sys-shape-corner-small)',
                md: 'var(--md-sys-shape-corner-medium)',
                lg: 'var(--md-sys-shape-corner-large)',
                xl: 'var(--md-sys-shape-corner-extra-large)',
                '2xl': 'var(--md-sys-shape-corner-extra-large-increased)',
                '3xl': 'var(--md-sys-shape-corner-extra-extra-large)',
                'extra-small': 'var(--md-sys-shape-corner-extra-small)',
                small: 'var(--md-sys-shape-corner-small)',
                medium: 'var(--md-sys-shape-corner-medium)',
                large: 'var(--md-sys-shape-corner-large)',
                'extra-large': 'var(--md-sys-shape-corner-extra-large)',
                full: 'var(--md-sys-shape-corner-full)',
            },
            boxShadow: {
                'elevation-0': 'var(--md-sys-elevation-level0)',
                'elevation-1': 'var(--md-sys-elevation-level1)',
                'elevation-2': 'var(--md-sys-elevation-level2)',
                'elevation-3': 'var(--md-sys-elevation-level3)',
                'elevation-4': 'var(--md-sys-elevation-level4)',
                'elevation-5': 'var(--md-sys-elevation-level5)',
            },
            colors: {
                primary: color('--md-sys-color-primary'),
                'on-primary': color('--md-sys-color-on-primary'),
                'primary-container': color('--md-sys-color-primary-container'),
                'on-primary-container': color(
                    '--md-sys-color-on-primary-container'
                ),
                secondary: color('--md-sys-color-secondary'),
                'on-secondary': color('--md-sys-color-on-secondary'),
                'secondary-container': color(
                    '--md-sys-color-secondary-container'
                ),
                'on-secondary-container': color(
                    '--md-sys-color-on-secondary-container'
                ),
                tertiary: color('--md-sys-color-tertiary'),
                'on-tertiary': color('--md-sys-color-on-tertiary'),
                'tertiary-container': color(
                    '--md-sys-color-tertiary-container'
                ),
                'on-tertiary-container': color(
                    '--md-sys-color-on-tertiary-container'
                ),
                error: color('--md-sys-color-error'),
                'on-error': color('--md-sys-color-on-error'),
                'error-container': color('--md-sys-color-error-container'),
                'on-error-container': color(
                    '--md-sys-color-on-error-container'
                ),
                background: color('--md-sys-color-background'),
                'on-background': color('--md-sys-color-on-background'),
                surface: color('--md-sys-color-surface'),
                'on-surface': color('--md-sys-color-on-surface'),
                'surface-variant': color('--md-sys-color-surface-variant'),
                'on-surface-variant': color(
                    '--md-sys-color-on-surface-variant'
                ),
                outline: color('--md-sys-color-outline'),
                'outline-variant': color('--md-sys-color-outline-variant'),
                'surface-tint': color('--md-sys-color-surface-tint'),
                'inverse-surface': color('--md-sys-color-inverse-surface'),
                'inverse-on-surface': color(
                    '--md-sys-color-inverse-on-surface'
                ),
                'inverse-primary': color('--md-sys-color-inverse-primary'),
                'surface-dim': color('--md-sys-color-surface-dim'),
                'surface-bright': color('--md-sys-color-surface-bright'),
                'surface-container-lowest': color(
                    '--md-sys-color-surface-container-lowest'
                ),
                'surface-container-low': color(
                    '--md-sys-color-surface-container-low'
                ),
                'surface-container': color('--md-sys-color-surface-container'),
                'surface-container-high': color(
                    '--md-sys-color-surface-container-high'
                ),
                'surface-container-highest': color(
                    '--md-sys-color-surface-container-highest'
                ),
                'primary-fixed': color('--md-sys-color-primary-fixed'),
                'primary-fixed-dim': color('--md-sys-color-primary-fixed-dim'),
                'on-primary-fixed': color('--md-sys-color-on-primary-fixed'),
                'on-primary-fixed-variant': color(
                    '--md-sys-color-on-primary-fixed-variant'
                ),
                'secondary-fixed': color('--md-sys-color-secondary-fixed'),
                'secondary-fixed-dim': color(
                    '--md-sys-color-secondary-fixed-dim'
                ),
                'on-secondary-fixed': color(
                    '--md-sys-color-on-secondary-fixed'
                ),
                'on-secondary-fixed-variant': color(
                    '--md-sys-color-on-secondary-fixed-variant'
                ),
                'tertiary-fixed': color('--md-sys-color-tertiary-fixed'),
                'tertiary-fixed-dim': color(
                    '--md-sys-color-tertiary-fixed-dim'
                ),
                'on-tertiary-fixed': color('--md-sys-color-on-tertiary-fixed'),
                'on-tertiary-fixed-variant': color(
                    '--md-sys-color-on-tertiary-fixed-variant'
                ),
                shadow: color('--md-sys-color-shadow'),
                scrim: color('--md-sys-color-scrim'),
            },
            opacity: {
                8: '0.08',
                10: '0.1',
                12: '0.12',
                16: '0.16',
                38: '0.38',
            },
            transitionTimingFunction: {
                emphasized: 'var(--md-sys-motion-easing-emphasized)',
                'emphasized-decelerate':
                    'var(--md-sys-motion-easing-emphasized-decelerate)',
                'emphasized-accelerate':
                    'var(--md-sys-motion-easing-emphasized-accelerate)',
                standard: 'var(--md-sys-motion-easing-standard)',
                'standard-decelerate':
                    'var(--md-sys-motion-easing-standard-decelerate)',
                'standard-accelerate':
                    'var(--md-sys-motion-easing-standard-accelerate)',
            },
            transitionDuration: {
                'short-1': 'var(--md-sys-motion-duration-short1)',
                'short-2': 'var(--md-sys-motion-duration-short2)',
                'short-3': 'var(--md-sys-motion-duration-short3)',
                'short-4': 'var(--md-sys-motion-duration-short4)',
                'medium-1': 'var(--md-sys-motion-duration-medium1)',
                'medium-2': 'var(--md-sys-motion-duration-medium2)',
                'medium-3': 'var(--md-sys-motion-duration-medium3)',
                'medium-4': 'var(--md-sys-motion-duration-medium4)',
                'long-1': 'var(--md-sys-motion-duration-long1)',
                'long-2': 'var(--md-sys-motion-duration-long2)',
                'long-3': 'var(--md-sys-motion-duration-long3)',
                'long-4': 'var(--md-sys-motion-duration-long4)',
            },
            gridTemplateColumns: {
                'auto-fill': 'repeat(auto-fit, minmax(320px, 1fr))',
                'auto-fill-lg': 'repeat(auto-fit, minmax(380px, 1fr))',
            },
            maxWidth: {
                content: '80rem',
            },
            minHeight: {
                'screen-safe': '100svh',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            keyframes: {
                'fade-up': {
                    from: { opacity: '0', transform: 'translateY(16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.96)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                'fade-up':
                    'fade-up var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized-decelerate) both',
                'fade-in':
                    'fade-in var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-standard) both',
                'scale-in':
                    'scale-in var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized-decelerate) both',
            },
            typography: () => ({
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                    },
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config
