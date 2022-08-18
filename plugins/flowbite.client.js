import flowbite from 'flowbite';
import {defineNuxtPlugin} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(flowbite);
});