import * as types from '../actions/_type';
import { message, notification } from 'antd';

const defaultState = {
    done: false
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case types.QUIZ_ADD_RESULT:
            return {...state, done: action.payload }

        case types.QUIZ_ERROR:
            let error = action.error;
            message.error('Đã có lỗi ! [ ' + error.code + ' ]');
            console.error(error.message + '\nCode: ' + error.code);
            return {...state, done: false }

        case 'QUIZ_TEST':
            console.log('QUIZ TEST!');
            return {...state }

        default:
            return state;
    }
};
