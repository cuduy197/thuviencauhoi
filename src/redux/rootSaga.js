import { all } from 'redux-saga/effects';
import { take } from 'redux-saga/effects'

import { INIT } from './sagas/init';
import { onAuthStateChanged } from './sagas/auth';
import { watch_QUIZ_ACTIONS } from './sagas/quiz';

function* logActions() {
    while (true) {
        const action = yield take('*') // correct
            //console.log(action)
    }
}

function* logTest() {
    while (true) {
        const { payload } = yield take('QUIZ_TEST') // Khi gọi QUIZ_TEST sẽ take(lấy) payload của object 'action'
        console.log(payload);
        console.log('test ok!');
    }
}

export default function* rootSaga() {
    yield all([
        INIT(),
        onAuthStateChanged(),
        watch_QUIZ_ACTIONS(),
        logActions(),
        logTest()
    ])
}
