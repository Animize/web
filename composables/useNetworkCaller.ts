import {getAuth} from "firebase/auth";
import {NitroFetchRequest, TypedInternalResponse} from "nitropack";
import {FetchOptions} from "ofetch";
import {POSITION, useToast} from "vue-toastification";

export const useAPI = async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, opts?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
    const config = useRuntimeConfig()
    const headers: Record<string, any> = {}

    if (process.client) {
        const auth = getAuth()
        const token = await auth?.currentUser?.getIdToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
    }

    const customFetch = $fetch.create({
        baseURL: config.API_BASE_URL,
        headers: headers,
        onRequest({request, options}) {
            console.log("Intercepted API", request);
        },
        onResponseError({response}): Promise<void> | void {
            if (process.client) {
                const toast = useToast()
                toast.error(response._data.message, {
                    position: POSITION.BOTTOM_RIGHT
                })
            }
            console.log(response._data.message)
        }
    })

    // @ts-ignore
    return customFetch(request, opts)
}

