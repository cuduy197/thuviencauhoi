import { SHOW_HELLO } from '../constants';

export function show_hello(n) {
	return {
		type: SHOW_HELLO,
		name: n
	}
}

