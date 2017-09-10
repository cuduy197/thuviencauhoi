import * as types from "../actions/_type";
import { message, notification } from "antd";

const defaultState = {
  done: false,
  data: [],
  total: 0,
  ui: { isLoading: false }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case types.QUIZ_ADD_RESULT:
      return { ...state, done: action.payload };

    case types.QUIZ_ERROR:
      state.ui.isLoading = false;

      let error = action.error;
      message.error("Đã có lỗi ! [ " + error.code + " ]");
      console.error(error.message + "\nCode: " + error.code);

      if (error.code === 209) {
        message.info("Vui lòng đăng nhập lại!");
        setTimeout(() => {
          window.localStorage.clear();
          window.history.go(0);
        }, 1000);
      }

      return { ...state, done: false };

    case "QUIZ_TEST":
      console.log("QUIZ TEST!");
      return { ...state };

    case "FETCH_QUIZ":
      if (state.total !== 0) {
        state.ui.isLoading = true;
      }

      return { ...state };
      break;

    case "FETCH_QUIZ_RESULT":
      state.ui.isLoading = false;

      state.data = action.payload.data;
      state.total = action.payload.total;
      return { ...state };
      break;

    case "DELETE_QUIZ":
      state.ui.isLoading = true;
      return { ...state };
      break;

    case "DELETE_QUIZ_RESULT":
      state.ui.isLoading = false;
      message.success("Đã xóa");
      state.data = state.data.filter(i => i.id !== action.payload.id);
      return { ...state };
      break;

    default:
      return state;
  }
}
