// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["~/assets/css/tailwind.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['@headlessui/vue']
    },
    ssr: true,
    runtimeConfig: {
        public:{
            API_BASE_URL: process.env.API_BASE_URL
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge'
    ],
})
