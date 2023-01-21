// https://v3.nuxtjs.org/api/configuration/nuxt.config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
    css: ["~/assets/css/tailwind.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite:{
        plugins:[
            svgLoader()
        ]
    },
    build: {
        transpile: ['@headlessui/vue']
    },
    ssr: true,
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image-edge',
        '@nuxtjs/color-mode'
    ],
    colorMode: {
        classSuffix: '',
        preference: 'system',
        storageKey: 'animize-theme'
    },
    app: {
        head: {
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=3.0'
                },
                {
                    hid: 'og:type', name: 'og:type', content: 'website'
                },
                {
                    hid: 'og:site_name', name: 'og:site_name', content: 'Animize'
                },
                {
                    hid: 'og:title', name: 'og:title', content: 'Animize - Streaming community'
                },
                {
                    hid: 'og:description', name: 'og:description',
                    content: 'Animize is a website to share your fans subbed and stream anime from the web.'
                }
            ]
        }
    }
})
