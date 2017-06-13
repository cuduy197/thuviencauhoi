import * as types from './_type'
import { store } from '../store';

export function quiz_add(payload) {
    return {
        type: types.QUIZ_ADD,
        payload
    }
}

export function quiz_error(error) {
    store.dispatch({ type: types.QUIZ_ERROR, error });

}
