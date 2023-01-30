import {defineNuxtPlugin, useState} from "#app";
import {getAuth} from "firebase/auth";

export default defineNuxtPlugin(() => {
    const auth = getAuth()
    const credential = useState('credential')
    const isLoggedIn = useState('isLoggedIn')
    auth.onAuthStateChanged((user) => {
        if (user) {
            isLoggedIn.value = true
            credential.value = user
        } else {
            isLoggedIn.value = false
            credential.value = null
        }
    })
})