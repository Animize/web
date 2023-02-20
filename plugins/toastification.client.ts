import {defineNuxtPlugin, useNuxtApp} from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


export default defineNuxtPlugin(() =>{
    const app = useNuxtApp()
    app.vueApp.use(Toast)
})