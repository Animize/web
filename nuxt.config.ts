import {defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },
    target: "server",
    ssr: true,
    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL
    },
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
    modules: ['@nuxtjs/tailwindcss'],
    loading: {
        color: 'green'
    },
    plugins: [
        {src: '~/plugins/flowbite.client.js', ssr: false}
    ]
})
