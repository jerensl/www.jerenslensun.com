import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        fontFamily: {
            display: ['Merriweather', 'serif'],
            body: ['Merriweather', 'serif'],
        },
        extend: {
            opacity: {
                '108': '1.08',
                '110': '1.10',
            },
            colors: {
                primary: 'var(--md-sys-color-primary)',
                'on-primary': 'var(--md-sys-color-on-primary)',
                'primary-container': 'var(--md-sys-color-primary-container)',
                'on-primary-container':
                    'var(--md-sys-color-on-primary-container)',
                secondary: 'var(--md-sys-color-secondary)',
                'on-secondary': 'var(--md-sys-color-on-secondary)',
                'secondary-container':
                    'var(--md-sys-color-secondary-container)',
                'on-secondary-container':
                    'var(--md-sys-color-on-secondary-container)',
                tertiary: 'var(--md-sys-color-tertiary)',
                'on-tertiary': 'var(--md-sys-color-on-tertiary)',
                'tertiary-container': 'var(--md-sys-color-tertiary-container)',
                'on-tertiary-container':
                    'var(--md-sys-color-on-tertiary-container)',
                error: 'var(--md-sys-color-error)',
                'on-error': 'var(--md-sys-color-on-error)',
                'error-container': 'var(--md-sys-color-error-container)',
                'on-error-container': 'var(--md-sys-color-on-error-container)',
                warning: 'var(--md-sys-color-warning)',
                'on-warning': 'var(--md-sys-color-on-warning)',
                'warning-container': 'var(--md-sys-color-warning-container)',
                'on-warning-container':
                    'var(--md-sys-color-on-warning-container)',
                success: 'var(--md-sys-color-success)',
                'on-success': 'var(--md-sys-color-on-success)',
                'success-container': 'var(--md-sys-color-success-container)',
                'on-success-container':
                    'var(--md-sys-color-on-success-container)',
                background: 'var(--md-sys-color-background)',
                'on-background': 'var(--md-sys-color-on-background)',
                surface: 'var(--md-sys-color-surface)',
                'on-surface': 'var(--md-sys-color-on-surface)',
                outline: 'var(--md-sys-color-outline)',
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
