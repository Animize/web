import {defineNuxtPlugin, useRuntimeConfig} from "#app";
import {FirebaseOptions, initializeApp} from "firebase/app";

export default defineNuxtPlugin((app) => {
    const config = useRuntimeConfig()

    const firebaseConfig : FirebaseOptions = {
        apiKey: String(config.public.FIREBASE_API_KEY),
        authDomain: String(config.public.FIREBASE_AUTH_DOMAIN),
        databaseURL: String(config.public.FIREBASE_DATABASE_URL),
        projectId: String(config.public.FIREBASE_PROJECT_ID),
        storageBucket: String(config.public.FIREBASE_STORAGE_BUCKET),
        messagingSenderId: String(config.public.FIREBASE_MESSAGING_SENDER_ID),
        appId: String(config.public.FIREBASE_APP_ID),
        measurementId: String(config.public.FIREBASE_MEASUREMENT_ID)
    };
    // Initialize Firebase
    initializeApp(firebaseConfig);
})