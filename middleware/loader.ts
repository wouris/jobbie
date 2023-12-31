import { useLoaderStore } from '~/store/loaderStore';
export default defineNuxtRouteMiddleware((to, from) => {
    const store = useLoaderStore()

    if(from.path === "/"){
        store.setShowLoader(true)
    } else {
        store.setShowLoader(false)
    }
})