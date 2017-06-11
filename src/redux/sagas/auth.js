import { store } from '../store';
import { delay } from 'redux-saga';
import * as types from '../constants'

export function onAuthStateChanged() {

    //Auth
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Chào: ' + user.displayName)
            store.dispatch({
                type: types.ON_AUTH_CHANGED,
                payload: {
                    islogin: true,
                    userData: {
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        id: user.providerData[0].uid,
                        photoUrl: user.providerData[0].photoURL
                    }
                }
            })

        } else {
            console.log('Bạn chưa đăng nhập !');

            store.dispatch({
                type: types.ON_AUTH_CHANGED,
                payload: {
                    islogin: false,
                    userData: {
                        name: 'Đang tải',
                        email: 'Đang tải',
                        uid: '',
                        id: '',
                        photoUrl: ''
                    }
                }
            })
        }

    });

    console.log('onAuthStateChanged!');

}
