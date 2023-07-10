/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        screens: {
            xs: '320px',
            sm: '576px',
            md: '800px',
            lg: '1440px',
        },
    },
    plugins: [],
}
