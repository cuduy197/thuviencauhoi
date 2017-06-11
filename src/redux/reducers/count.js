import * as types from '../constants';

const initialState = {
    number: 1
}

export default function count(state = initialState, action) {
    switch (action.type) {
        case types.INCREASE:
            console.log(state)
            return { number: state.number + action.payload }
        case types.DECREASE:
            return { number: state.number - action.payload }
        default:
            return state;
    }
}
