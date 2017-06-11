import * as types from '../constants';

const defaultState = {
    loading: null,
    done: null
};

const quiz = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_QUIZ_DONE:
            console.log('add quiz done!')
            console.log(action.payload);
            return {...state, done: action.payload, loading: false, }
        default:
            return state;
    }
};

export default quiz;
