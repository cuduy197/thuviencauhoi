import { store } from "../store";
import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";

import * as types from "../actions/_type";

export function watch_AUTH_CHANGED() {
  //Auth
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Chào: " + user.displayName);
      store.dispatch({ type: types.ON_AUTH_CHANGED, payload: true });
      window.localStorage.name = user.displayName;
      window.localStorage.id = user.providerData[0].uid;
      window.localStorage.photoUrl = user.providerData[0].photoURL;

      store.dispatch({
        type: types.USER_LOGIN,
        payload: {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          id: user.providerData[0].uid,
          photoUrl: user.providerData[0].photoURL
        }
      });
    } else {
      console.log("Bạn chưa đăng nhập !");
      store.dispatch({ type: types.ON_AUTH_CHANGED, payload: false });
      store.dispatch({ type: types.USER_UNLOGIN });
    }
  });

  console.log("start watching AUTH CHANGE!");
}
