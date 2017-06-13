import { AUTH_LOGIN, AUTH_LOGOUT } from './_type'

export function auth_login() {
    return {
        type: AUTH_LOGIN
    }
}

export function auth_logout() {
    return {
        type: AUTH_LOGOUT
    }
}
