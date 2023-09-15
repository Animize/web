import {getAuth} from "firebase/auth";
import {NitroFetchOptions, NitroFetchRequest, TypedInternalResponse} from "nitropack";
import {POSITION, useToast} from "vue-toastification";
import {useCookie} from "#app";

interface UseAPIOptions {
    showToast?: boolean,
    logging?: boolean
}

export const useAPI = async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
    request: R,
    opts?: NitroFetchOptions<R> | undefined,
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
    } else if (process.server) {
        const animizeSessionCookie = useCookie('animize_session')
        if (animizeSessionCookie.value) {
            headers['Authorization'] = `Bearer ${animizeSessionCookie.value}`
        }
    }

    const customFetch = $fetch.create({
        baseURL: config.public.API_BASE_URL,
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

