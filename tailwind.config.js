/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./assets/**/*.css",
        "./components/*.{vue,js}",
        "./components/**/*.{vue,js}",
        "./pages/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./*.{vue,js,ts}",
        "./nuxt.config.{js,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            lineClamp: {
                7: '7',
                8: '8',
                9: '9',
                10: '10',
                11: '11',
                12: '12',
            }
        },
    },
    variants: {
        extend: {
            lineClamp: ['responsive', 'hover']
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/line-clamp'),
    ]
};
