import {getAuth} from "firebase/auth";
import {NitroFetchRequest, TypedInternalResponse} from "nitropack";
import {FetchOptions} from "ofetch";

export const testFetch = $fetch
    .create({

        async onRequest({options}) {
            const auth = getAuth()
            const token = await auth?.currentUser?.getIdToken()
            options.headers = new Headers(options.headers);
            console.log('a')
            //options.headers.set("Authorization", `Bearer ${token}`)
        }
    })

export const useAPI = async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, opts?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
    const config = useRuntimeConfig()
    const auth = getAuth()
    const token = await auth?.currentUser?.getIdToken()

    const customFetch = $fetch.create({
        baseURL: config.API_BASE_URL,
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        onRequest({request, options}) {
            console.log("Intercepted API", request);
        }
    })

    // @ts-ignore
    return customFetch(request, opts)
}

export const animizeFetcher = async function () {

    return $fetch
        .create({
            baseURL: useRuntimeConfig().API_BASE_URL,
            onRequest({options}): Promise<void> | void {
            }
        })
}

