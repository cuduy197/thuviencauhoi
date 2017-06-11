import * as types from '../constants'

export function add_quiz(n) {
    return {
        type: types.ADD_QUIZ,
        payload: n
    }
}
