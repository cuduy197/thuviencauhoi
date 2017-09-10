import * as types from "../actions/_type";
import { quiz_error } from "../actions/quiz";
import { delay } from "redux-saga";
import { push } from "react-router-redux";
import { put, call, takeEvery, takeLatest, all, take } from "redux-saga/effects";
import { store } from "../store";
import { message, Modal, Button, notification } from "antd";

const confirm = Modal.confirm;

export function* watch_QUIZ_ACTIONS() {
  //add
  yield takeLatest(types.QUIZ_ADD, action => {
    Parse.initialize("cunghoctot");
    Parse.serverURL = "http://35.185.176.28:1337/parse";

    console.log(action.payload);
    let p = action.payload;

    if (p.id) {
      new Parse.Query(new Parse.Object("cauhoi"))
        .equalTo("objectId", p.id)
        .first()
        .then(cauhoi => {
          console.log(cauhoi);
          cauhoi.set(action.payload.quiz);

          cauhoi
            .save()
            .then(result => {
              notification.success({ message: "Đã tạo câu hỏi  ", description: "ID câu hỏi : " + result.id });
              store.dispatch({ type: types.QUIZ_ADD_RESULT, payload: true });

              store.dispatch(push("/view"));
            })
            .catch(code => {
              quiz_error(code);
            });
        })
        .catch(e => console.log(e));
    } else {
      let _cauhoi = Parse.Object.extend(`${p.monhoc}${p.chude ? "_" + p.chude : ""}`);
      let cauhoi = new _cauhoi();

      cauhoi.set(action.payload.quiz);

      cauhoi
        .save()
        .then(result => {
          notification.success({ message: "Đã tạo câu hỏi  ", description: "ID câu hỏi : " + result.id });
          store.dispatch({ type: types.QUIZ_ADD_RESULT, payload: true });
        })
        .catch(code => {
          quiz_error(code);
        });
    }
  });

  yield takeLatest("FETCH_QUIZ", action => {
    console.log("FETCH_QUIZ");
    let skip = action.skip || 1;

    Parse.initialize("cunghoctot");
    Parse.serverURL = "http://35.185.176.28:1337/parse";

    let query = new Parse.Query(new Parse.Object("cauhoi"));
    query.skip((skip - 1) * 10).limit(10);
    query.descending("createdAt");

    action.mode === "me" && query.equalTo("author_id", window.localStorage.id);
    action.mode === "custom" && query.equalTo("author", window.prompt("Nhập tên tác giả"));
    action.mode === "id" && query.equalTo("objectId", window.prompt("Nhập id câu hỏi"));

    query
      .find()
      .then(result => {
        result.length <= 0 && message.info("Không có dữ liệu");
        new Parse.Query(new Parse.Object("cauhoi"))
          .count()
          .then(count => {
            store.dispatch({ type: "FETCH_QUIZ_RESULT", payload: { data: result, total: count } });
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  });
}
