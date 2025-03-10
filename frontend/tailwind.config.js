/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb',
                    dark: '#1d4ed8',
                    light: '#3b82f6'
                },
                secondary: {
                    DEFAULT: '#f3f4f6',
                    dark: '#e5e7eb',
                    light: '#f9fafb'
                },
                accent: {
                    DEFAULT: '#ffffff',
                    dark: '#f3f4f6'
                }
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '1rem'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
}