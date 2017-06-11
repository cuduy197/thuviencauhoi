import * as types from '../constants'

export function login() {
    return {
        type: types.LOGIN
    }
}

export function logout() {
    return {
        type: types.LOGOUT
    }
}
