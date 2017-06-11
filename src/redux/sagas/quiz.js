import * as types from '../constants'
import { delay } from 'redux-saga'
import { put, call, takeEvery, takeLatest, all, take } from 'redux-saga/effects';
import { store } from '../store';
import { message, Modal, Button, notification } from 'antd';

const confirm = Modal.confirm;

export function* watch_QUIZ_ACTIONS() {

    yield takeLatest(types.ADD_QUIZ, (action) => {
        console.log(action.payload)
        let p = action.payload;
        let _cauhoi = Parse.Object.extend(`${p.monhoc}_${p.chude}`);
        let cauhoi = new _cauhoi();

        cauhoi.set(action.payload.quiz);
        cauhoi.save(null, {
            success: (cauhoi) => {
                notification.success({ message: 'Đã tạo câu hỏi  ', description: 'ID câu hỏi : ' + cauhoi.id });
                store.dispatch({ type: types.ADD_QUIZ_DONE, payload: true });
            },
            error: (cauhoi, error) => {
                message.error('Đã có lỗi!');
                store.dispatch({ type: types.ADD_QUIZ_DONE, payload: false });
                console.error('Failed to create new object, with error code: ' + error.message + '\nCode: ' + error.code);
            }
        });

    })

}
