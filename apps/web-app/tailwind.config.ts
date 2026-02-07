import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-lora)'],
                mono: ['var(--font-merriweather)'],
            },
            borderRadius: {
                'extra-small': '4px',
                small: '8px',
                medium: '12px',
                large: '16px',
                'extra-large': '28px',
            },
            boxShadow: {
                'elevation-0':
                    'rgba(0, 0, 0, 0.2) 0px 0px 0px 0px, rgba(0, 0, 0, 0.14) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 0px 0px 0px',
                'elevation-1':
                    'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                'elevation-2':
                    'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
                'elevation-3':
                    'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px',
                'elevation-4':
                    'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
                'elevation-5':
                    'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
            },
            opacity: {
                '8': '.08',
                '12': '.12',
                '16': '.16',
                '38': '.38',
            },
            backdropOpacity: {
                8: '.08',
                12: '.12',
                16: '.16',
                38: '.38',
            },
            brightness: {
                108: '1.08',
                112: '1.12',
                116: '1.16',
                138: '1.38',
            },
            saturate: {
                108: '1.08',
                112: '1.12',
                116: '1.16',
                138: '1.38',
            },
            colors: {
                primary: 'rgb(var(--md-sys-color-primary) / <alpha-value>)',
                'on-primary':
                    'rgb(var(--md-sys-color-on-primary) / <alpha-value>)',
                'primary-container':
                    'rgb(var(--md-sys-color-primary-container) / <alpha-value>)',
                'on-primary-container':
                    'rgb(var(--md-sys-color-on-primary-container) / <alpha-value>)',
                secondary: 'rgb(var(--md-sys-color-secondary) / <alpha-value>)',
                'on-secondary':
                    'rgb(var(--md-sys-color-on-secondary) / <alpha-value>)',
                'secondary-container':
                    'rgb(var(--md-sys-color-secondary-container) / <alpha-value>)',
                'on-secondary-container':
                    'rgb(var(--md-sys-color-on-secondary-container) / <alpha-value>)',
                tertiary: 'rgb(var(--md-sys-color-tertiary)  / <alpha-value>)',
                'on-tertiary':
                    'rgb(var(--md-sys-color-on-tertiary) / <alpha-value>)',
                'tertiary-container':
                    'rgb(var(--md-sys-color-tertiary-container) / <alpha-value>)',
                'on-tertiary-container':
                    'rgb(var(--md-sys-color-on-tertiary-container) / <alpha-value>)',
                error: 'rgb(var(--md-sys-color-error) / <alpha-value>)',
                'on-error': 'rgb(var(--md-sys-color-on-error) / <alpha-value>)',
                'error-container':
                    'rgb(var(--md-sys-color-error-container) / <alpha-value>)',
                'on-error-container':
                    'rgb(var(--md-sys-color-on-error-container) / <alpha-value>)',
                background:
                    'rgb(var(--md-sys-color-background) / <alpha-value>)',
                'on-background':
                    'rgb(var(--md-sys-color-on-background) / <alpha-value>)',
                surface: 'rgb(var(--md-sys-color-surface) / <alpha-value>)',
                'on-surface':
                    'rgb(var(--md-sys-color-on-surface) / <alpha-value>)',
                'surface-variant':
                    'rgb(var(--md-sys-color-surface-variant) / <alpha-value>)',
                'on-surface-variant':
                    'rgb(var(--md-sys-color-on-surface-variant) / <alpha-value>)',
                'surface-container-lowest':
                    'rgb(var(--md-sys-color-surface-container-lowest) / <alpha-value>)',
                'surface-container-low':
                    'rgb(var(--md-sys-color-surface-container-low) / <alpha-value>)',
                'surface-container':
                    'rgb(var(--md-sys-color-surface-container) / <alpha-value>)',
                'surface-container-high':
                    'rgb(var(--md-sys-color-surface-container-high) / <alpha-value>)',
                'surface-container-highest':
                    'rgb(var(--md-sys-color-surface-container-highest) / <alpha-value>)',
                'inverse-on-surface':
                    'rgb(var(--md-sys-color-inverse-on-surface) / <alpha-value>)',
                'inverse-surface':
                    'rgb(var(--md-sys-color-inverse-surface) / <alpha-value>)',
                outline: 'rgb(var(--md-sys-color-outline) / <alpha-value>)',
                'outline-variant':
                    'rgb(var(--md-sys-color-outline-variant) / <alpha-value>)',
            },
            gridTemplateColumns: {
                'auto-fill': 'repeat(auto-fit, minmax(350px, 1fr))',
                'auto-fill-lg': 'repeat(auto-fit, minmax(400px, 1fr))',
            },
            height: {
                '9/10': '90vh',
                '1/10': '10vh',
                '40rem': '40rem',
            },
            minHeight: {
                '9/10': '90vh',
            },
            margin: ({ theme }) => ({
                '10vw': '10vw',
                ...theme('spacing'),
            }),
            padding: ({ theme }) => ({
                '5vw': '5vw',
                ...theme('spacing'),
            }),
            typography: () => ({
                DEFAULT: {
                    css: {
                        // maxWidth: '',
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
} satisfies Config
