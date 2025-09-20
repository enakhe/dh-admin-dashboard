/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['Montserrat', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#0659b4',
                    dark: '#054a9a',
                    light: '#289df9',
                },
                secondary: {
                    DEFAULT: '#289df9',
                    dark: '#1e8ce8',
                    light: '#4fb3ff',
                }
            }
        },
    },
    plugins: [],
}
