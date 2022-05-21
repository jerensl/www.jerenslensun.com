module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            display: ['Merriweather', 'serif'],
            body: ['Merriweather', 'serif'],
        },
        extend: {
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
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
}
