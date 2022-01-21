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
            },
            minHeight: {
                '9/10': '90vh',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
}
