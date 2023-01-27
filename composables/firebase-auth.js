import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    await signInWithPopup(auth, provider)
        .then((result) => {

        })
}

export const signInWithIDPassword = async (identifier, password) => {
    console.log('TO BE IMPLEMENTED')
}

export const registerWithIDPassword = async (identifier, password) => {
    console.log('TO BE IMPLEMENTED')
}

export const signOutAccount = async () => {
    console.log('TO BE IMPLEMENTED')
}