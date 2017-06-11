import * as types from '../constants';

const defaultState = {
    loading: null,
    done: null
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case types.ADD_QUIZ_RESULT:
            return {...state, done: action.payload, loading: false, }
        case 'QUIZ_TEST':
            return state
        default:
            return state;
    }
};
