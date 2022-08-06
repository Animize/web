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
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/line-clamp'),
    ]
};
