import { store } from '../store';
import { delay } from 'redux-saga';
import * as types from '../constants'

export function* GET_USER_DATA() {

    //Auth
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('You are login!')
            store.dispatch({
                type: types.GET_USER_DATA,
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

            store.dispatch({
                type: types.GET_USER_DATA,
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
            console.log('You are unlogin!')
        }

    });

    yield delay(1000);
    console.log('GET_USER_DATA DONE! ');

}
