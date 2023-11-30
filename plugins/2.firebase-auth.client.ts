import {defineNuxtPlugin, useCookie, useNuxtApp, useState} from "#app";
import {getAuth} from "firebase/auth";

export default defineNuxtPlugin(() => {
    const auth = getAuth()
    const credential = useState('credential')
    const isLoggedIn = useState('isLoggedIn')
    const signInDialogOpen = useState('signInDialogOpen')
    const animizeSessionCookie = useCookie('animize_session',{
        secure: true,
        sameSite :'strict'
    })

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            isLoggedIn.value = true
            credential.value = user
            animizeSessionCookie.value = await user.getIdToken()
            await useLazyAsyncData('populateUser', () => useAPI<any>('/auth/populate',
                {
                    method: 'POST'
                }
            ))
            signInDialogOpen.value = false
            await refreshData()
        } else {
            isLoggedIn.value = false
            credential.value = null
            animizeSessionCookie.value = null
            await refreshData()
        }
    })

    const refreshData = async () =>{

        let keys = Object.keys(useNuxtApp().payload.data)

        await refreshNuxtData(keys)
    }

})