import * as types from '../constants'
import * as firebase from 'firebase';
import { configFirebase, ParseAppID, ParseServerURL } from '../config';
import * as Parse from 'parse';

import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

const initialState = {
    islogin: null,
    userData: {
        name: 'Đang tải',
        email: 'Đang tải',
        uid: '',
        id: '',
        photoUrl: ''
    }
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case types.INIT:
            console.log('INIT FIREBASE!');
            firebase.initializeApp(configFirebase);
            Parse.initialize(ParseAppID);
            Parse.serverURL = ParseServerURL;
            return state

        case types.CHECK_AUTH:
            console.log(action.payload)
            state.islogin = action.payload;
            return {...state, islogin: state.islogin }

        case types.GET_USER_DATA:
            //console.log(action.payload)
            state.userData = action.payload;

            return {...state, userData: state.userData } //ADD user data to state

        case types.LOGIN:
            console.log('LOGIN');
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider);

            return state

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

            return state
        default:
            return state;
    }
}
