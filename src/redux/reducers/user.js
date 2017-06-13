import * as types from '../actions/_type';
import { message, notification } from 'antd';

const userState = {
    name: 'Đang tải',
    email: 'Đang tải',
    uid: '',
    id: '',
    photoUrl: ''
};

const user = (state = userState, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            console.log('LOGIN!');
            state = action.payload;
            return {...state }
        case types.USER_UNLOGIN:
            console.log('UNLOGIN!!!');
            state = userState;
            return {...state }
        default:
            return state;
    }
};

export default user;
