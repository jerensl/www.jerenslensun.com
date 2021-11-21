module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
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
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
}
