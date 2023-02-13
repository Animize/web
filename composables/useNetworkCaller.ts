import {getAuth} from "firebase/auth";
import {NitroFetchRequest, TypedInternalResponse} from "nitropack";
import {FetchOptions} from "ofetch";
import {POSITION, useToast} from "vue-toastification";

interface UseAPIOptions {
    showToast: boolean,
    logging: boolean
}

export const useAPI = async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
    request: R,
    opts?: FetchOptions | undefined,
    apiOpts?: UseAPIOptions | undefined
): Promise<TypedInternalResponse<R, T>> => {
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
                if (apiOpts?.showToast ?? false) {
                    const toast = useToast()
                    toast.error(response._data.message, {
                        position: POSITION.BOTTOM_RIGHT
                    })
                }
            }
            if (apiOpts?.logging ?? false) {
                console.log(response._data.message)
            }
        }
    })

    // @ts-ignore
    return customFetch(request, opts)
}

