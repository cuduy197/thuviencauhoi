import { ON_AUTH_CHANGED, AUTH_LOGIN, AUTH_LOGOUT } from "../actions/_type";

import { Modal } from "antd";
const confirm = Modal.confirm;

export const authDefaultState = {
  islogin: null,
  userData: {
    name: "Đang tải",
    email: "Đang tải",
    uid: "",
    id: "",
    photoUrl: ""
  }
};

export default function(state = authDefaultState, action) {
  switch (action.type) {
    case ON_AUTH_CHANGED:
      state.islogin = action.payload;
      return { ...state, islogin: state.islogin };

    case AUTH_LOGIN:
      console.log("LOGIN");
      //Firebase
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      return { ...state };

    case AUTH_LOGOUT:
      confirm({
        title: "Bạn có muốn đăng xuất ? ",
        onOk() {
          firebase
            .auth()
            .signOut()
            .then(function() {
              console.log("LOGOUT");
              setTimeout(() => {
                window.history.go(0);
              }, 500);
            })
            .catch(function(error) {
              alert("Có lỗi!!!");
            });
        }
      });
      return { ...state };

    default:
      return state;
  }
}
