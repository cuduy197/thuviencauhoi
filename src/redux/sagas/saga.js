import { delay } from 'redux-saga'
import { put, call, takeEvery, all } from 'redux-saga/effects'
import * as types from '../constants'

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { configFirebase, ParseAppID, ParseServerURL } from '../config';
import * as Parse from 'parse';

import { store } from '../store';

export default function* rootSaga() {
    yield all([
        initSaga(),
        watchIncrementAsync()
    ])
}

export function* initSaga() {
    yield put({ type: types.INIT })

    //Auth
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var facebookData = user.providerData[0];
            //console.log(facebookData);
            let userData = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                id: facebookData.uid,
                photoUrl: facebookData.photoURL
            }
            store.dispatch({ type: types.CHECK_AUTH, payload: true });
            store.dispatch({ type: types.GET_USER_DATA, payload: userData })

            return true
        } else {
            store.dispatch({ type: types.CHECK_AUTH, payload: false })
            console.log('You are unlogin!')
        }

    });

    //yield put({ type: types.CHECK_AUTH, payload: islogin })

    yield delay(1000)
    console.log('INIT DONE! ');

}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT', payload: 1 })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
