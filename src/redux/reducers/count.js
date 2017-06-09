import { INCREASE, DECREASE } from '../constants'

const initialState = {
  number: 1
}

export default function count(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE':
      console.log('INCREASE');
      return { number: state.number + action.payload }
    case 'DECREASE':
      console.log('DECREASE');
      return { number: state.number - action.payload }
    default:
      return state;
  }
}

