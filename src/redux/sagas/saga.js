import { all } from 'redux-saga/effects';

import { INIT } from './init';
import { GET_USER_DATA } from './user';
import { watch_QUIZ_ACTIONS } from './quiz';

export default function* rootSaga() {
    yield all([
        INIT(),
        GET_USER_DATA(),
        watch_QUIZ_ACTIONS()
    ])
}
