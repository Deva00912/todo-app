import { all, put, takeEvery } from "redux-saga/effects";
import store from "../Store/store";
import {
  checkUserCredentialsApi,
  checkUsernameAvailabilityApi,
  createUserApi,
} from "../../Services/Api/auth";
import { toast } from "react-toastify";

export const actionTypes = {
  REGISTER: "REGISTER",
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
  register: (user) => {
    store.dispatch({
      type: actionTypes.REGISTER,
      payload: {
        user: { ...user },
      },
    });
  },
  logOut: () => {
    store.dispatch({
      type: actionTypes.LOGOUT,
    });
  },
};

function* logInUserWorker(action) {
  try {
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

function* registerWorker(action) {
  try {
    yield checkUsernameAvailabilityApi(action.payload.user.username);
    const response = yield createUserApi(action.payload.user);
    yield put({
      type: "SET_LOGGED_USER",
      payload: {
        data: response,
      },
    });
    toast.success("Registered");
  } catch (error) {
    toast.error(error.message);
  }
}

function* logOutWorker() {
  try {
    yield put({
      type: "SET_LOGGED_USER",
      payload: {
        data: {},
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
    takeEvery("REGISTER", registerWorker),
    takeEvery("LOGOUT", logOutWorker),
  ]);
}
