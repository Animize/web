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
    vite: {
        plugins: [
            svgLoader()
        ]
    },
    build: {
        transpile: ['@headlessui/vue']
    },
    ssr: true,
    runtimeConfig: {
        public: {
            API_BASE_URL: '',
            RECAPTCHA_SITE_KEY: '',
            FIREBASE_API_KEY: '',
            FIREBASE_AUTH_DOMAIN: '',
            FIREBASE_DATABASE_URL: '',
            FIREBASE_PROJECT_ID: '',
            FIREBASE_STORAGE_BUCKET: '',
            FIREBASE_MESSAGING_SENDER_ID: '',
            FIREBASE_APP_ID: '',
            FIREBASE_MEASUREMENT_ID: ''
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        '@nuxtjs/color-mode'
    ],
    image: {
        domains: ['cdn.dvnlabs.xyz']
    },
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
                    name: 'og:type', content: 'website'
                },
                {
                    name: 'og:site_name', content: 'Animize'
                },
                {
                    name: 'og:title', content: 'Animize - Streaming community'
                },
                {
                    name: 'og:description',
                    content: 'Animize is a website to share your fans subbed and stream anime from the web.'
                }
            ]
        }
    }
})
