import {getAuth} from "firebase/auth";
import {NitroFetchRequest, TypedInternalResponse} from "nitropack";
import {FetchOptions} from "ofetch";
import {POSITION, useToast} from "vue-toastification";

export const useAPI = async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, opts?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
    const config = useRuntimeConfig()
    const auth = getAuth()
    const token = await auth?.currentUser?.getIdToken()
    const headers = {}

    if (token && process.client) {
        // @ts-ignore
        headers['Authorization'] = `Bearer ${token}`
    }

    const customFetch = $fetch.create({
        baseURL: config.API_BASE_URL,
        headers: headers,
        onRequest({request, options}) {
            console.log("Intercepted API", request);
        },
        onResponseError({response}): Promise<void> | void {
            const toast = useToast()
            // @ts-ignore
            toast.error(response._data.message, {
                position: POSITION.BOTTOM_RIGHT
            })
        }
    })

    // @ts-ignore
    return customFetch(request, opts)
}

