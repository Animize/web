export default defineNuxtRouteMiddleware(async (to, from) => {

    const config = useRuntimeConfig()
    console.info(`Changing route from ${from.path} to ${to.path}`)

    if (to.path !== from.path) {
        const {data: routeCheck} = await useLazyAsyncData(
            'routeCheck',
            () => useAPI<any>(`${config.public.API_BASE_URL}/auth/menu/check`, {
                method: 'POST'
            }),
        )
    }

})