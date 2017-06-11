import * as types from '../constants'

export function add_quiz(payload) {
    return {
        type: types.ADD_QUIZ,
        payload
    }
}
