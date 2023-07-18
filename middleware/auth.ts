export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return

    const auth = localStorage.getItem('auth')

    if (to.path == '/login') {
        if (auth != null && auth.expiration != null) {
            return navigateTo("/browse")
        }
    } else {
        if (auth == null || auth.expiration == null) {
            return navigateTo("/login")
        }
        if (new Date().getTime() > auth.expiration) {
            return navigateTo("/login")
        }
    }
})