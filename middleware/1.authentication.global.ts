export default defineNuxtRouteMiddleware(async (to, from) => {

    const config = useRuntimeConfig()
    console.info(`Changing route from ${from.path} to ${to.path}`)

    if ( to.path !== '/' && to.path !== '/forbidden') {
        const {data: routeCheck, error: routeError} = await useLazyAsyncData<any, any>(
            'routeCheck',
            () => useAPI<any>(`${config.public.API_BASE_URL}/auth/menu/check`, {
                method: 'POST',
                body: {
                    menuPath: to.path
                }
            }),
        )
        const error = routeError.value?.data as ResponseDTO
        if (error?.errCode === 403) {
            abortNavigation()
            return navigateTo({path: '/forbidden'})
        }
    }

})