import {defineNuxtPlugin, useState} from "#app";
import {getAuth} from "firebase/auth";

export default defineNuxtPlugin(() => {
    const auth = getAuth()
    const credential = useState('credential')
    const isLoggedIn = useState('isLoggedIn')
    const signInDialogOpen = useState('signInDialogOpen')
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            isLoggedIn.value = true
            credential.value = user
            await useLazyAsyncData('populateUser', () => useAPI<any>('/auth/populate',
                {
                    method: 'POST'
                }
            ))
            signInDialogOpen.value = false
        } else {
            isLoggedIn.value = false
            credential.value = null
        }
    })
})