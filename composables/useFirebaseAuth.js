import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth"

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    setPersistence(auth, browserLocalPersistence)
        .then(async () => {
            return await signInWithPopup(auth, provider)
                .catch((error) => {
                    console.log(error.message)
                })
        })

}

export const signInWithIDPassword = async (email, password) => {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.log(error.message)
        })
}

export const registerWithEmailPassword = async (email, password) => {
    const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.log(error.message)
        })
}

export const signOutAccount = async () => {
    const auth = getAuth()
    console.log('Will be logged out,please wait')
    await auth.signOut()
}