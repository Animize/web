import {defineNuxtPlugin} from "#app";
import {initializeApp} from "firebase/app";

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);
})