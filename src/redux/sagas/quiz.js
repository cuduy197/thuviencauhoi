import * as types from '../actions/_type'
import { quiz_error } from '../actions/quiz';
import { delay } from 'redux-saga'
import { put, call, takeEvery, takeLatest, all, take } from 'redux-saga/effects';
import { store } from '../store';
import { message, Modal, Button, notification } from 'antd';

const confirm = Modal.confirm;

export function* watch_QUIZ_ACTIONS() {

    yield takeLatest(types.QUIZ_ADD, (action) => {
        //console.log(action.payload)
        let p = action.payload;
        let _cauhoi = Parse.Object.extend(`${p.monhoc}_${p.chude}`);
        let cauhoi = new _cauhoi();

        cauhoi.set(action.payload.quiz);

        cauhoi.save()
            .then(result => {
                notification.success({ message: 'Đã tạo câu hỏi  ', description: 'ID câu hỏi : ' + result.id });
                store.dispatch({ type: types.QUIZ_ADD_RESULT, payload: true });
            })
            .catch(code => { quiz_error(code) })

    })

}
