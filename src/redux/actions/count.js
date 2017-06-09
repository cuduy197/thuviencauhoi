import { INCREASE, DECREASE } from '../constants'

export function increase(n) {
  return {
    type: INCREASE,
    payload: n
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    payload: n
  }
}
