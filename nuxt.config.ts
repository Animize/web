import {defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: ["@/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },
    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL
    },
})
