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
            animation: {
                blob: 'blob 7s infinite',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'tranlate(0px, 0px) scale(1)',
                    },
                },
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
