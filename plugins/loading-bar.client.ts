import {defineNuxtPlugin, useNuxtApp} from "#app";

export default defineNuxtPlugin(() => {
    const app = useNuxtApp();

    app.hook('page:start', () => {

    });
    app.hook('page:finish', () => {
    });
});