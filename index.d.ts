declare module 'nuxt/schema' {
    interface RuntimeConfig {
        public: {
            API_BASE_URL: String,
            RECAPTCHA_SITE_KEY: String,
            FIREBASE_API_KEY: String,
            FIREBASE_AUTH_DOMAIN: String,
            FIREBASE_DATABASE_URL: String,
            FIREBASE_PROJECT_ID: String,
            FIREBASE_STORAGE_BUCKET: String,
            FIREBASE_MESSAGING_SENDER_ID: String,
            FIREBASE_APP_ID: String,
            FIREBASE_MEASUREMENT_ID: String
        }
    }
}

export {}