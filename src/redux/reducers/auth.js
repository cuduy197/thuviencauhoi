import * as types from '../constants'

import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

export const authDefaultState = {
    islogin: null,
    userData: {
        name: 'Đang tải',
        email: 'Đang tải',
        uid: '',
        id: '',
        photoUrl: ''
    }
}

export default function(state = authDefaultState, action) {
    switch (action.type) {

        case types.ON_AUTH_CHANGED:
            //console.log(action.payload)
            state.userData = action.payload.userData;
            state.islogin = action.payload.islogin;
            return {...state, islogin: state.islogin, userData: state.userData } //ADD user data to state

        case types.LOGIN:
            console.log('LOGIN');
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider);
            return {...state }

        case types.LOGOUT:
            confirm({
                title: 'Bạn có muốn đăng xuất ? ',
                onOk() {
                    firebase.auth().signOut().then(function() {
                        console.log('LOGOUT');
                        setTimeout(() => { window.history.go(0) }, 500)
                    }).catch(function(error) {
                        alert('Có lỗi!!!')
                    });
                }
            });
            return {...state }

        default:
            return state;
    }
}
