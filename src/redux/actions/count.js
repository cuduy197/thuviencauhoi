import * as types from '../constants'

export function increase(n) {
    return {
        type: types.INCREASE,
        payload: n
    }
}

export function decrease(n) {
    return {
        type: types.DECREASE,
        payload: n
    }
}
