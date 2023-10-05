import { all, put, takeEvery } from "redux-saga/effects";
import store from "../Store/store";
import {
  checkUserCredentialsApi,
  createUserApi,
} from "../../Services/Api/auth";
import { toast } from "react-toastify";

export const actionTypes = {
  REGISTER_USER: "REGISTER_USER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const authActions = {
  logInUser: (user) => {
    store.dispatch({
      type: actionTypes.LOGIN,
      payload: {
        ...user,
      },
    });
  },
  registerUser: (user) => {
    store.dispatch({
      type: actionTypes.REGISTER_USER,
      payload: {
        user: { ...user },
      },
    });
  },
  logOut: () => {
    store.dispatch({
      type: actionTypes.LOGOUT,
      payload: {
        data: {},
      },
    });
  },
};

function* logInUserWorker(action) {
  try {
    console.log("Worker - action.payload: ", action.payload);
    const response = yield checkUserCredentialsApi({
      username: action.payload.username,
      password: action.payload.password,
    });

    if (response) {
      yield put({
        type: "SET_LOGGED_USER",
        payload: {
          data: response,
        },
      });
      toast.success("Logged in");
    }
  } catch (error) {
    toast.error(error.message);
  }
}

function* registerUserWorker(action) {
  try {
    yield createUserApi(action.payload.user);
    toast.success("Registered");
  } catch (error) {
    toast.error(error.message);
  }
}

function* logOutWorker(action) {
  try {
    yield put({
      type: "SET_LOGGED_USER",
      payload: {
        data: action.payload.data,
      },
    });
    toast.success("Logout successful");
  } catch (error) {
    toast.error(error.message);
  }
}

export function* authWatcher() {
  yield all([
    takeEvery("LOGIN", logInUserWorker),
    takeEvery("REGISTER_USER", registerUserWorker),
    takeEvery("LOGOUT", logOutWorker),
  ]);
}
