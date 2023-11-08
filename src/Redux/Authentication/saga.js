/**
 * @module Saga-Auth
 */

import { all, put, takeEvery } from "redux-saga/effects";
import {
  checkUserCredentialsApi,
  checkUserEmailAvailabilityApi,
  createUserApi,
} from "../../Services/Api/auth";
import { toast } from "react-toastify";
import {
  registerWithEmailAndPassword,
  signInUserFDB,
  signOutFDB,
} from "../../Database/Firebase/Authentication";

function* logInUserWorker(action) {
  try {
    var response = undefined;
    if (process.env.REACT_APP_DATABASE === "firebase") {
      response = yield signInUserFDB({
        email: action.payload.email,
        password: action.payload.password,
      });
    } else {
      response = yield checkUserCredentialsApi({
        email: action.payload.email,
        password: action.payload.password,
      });
    }
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
    var response = undefined;
    if (process.env.REACT_APP_DATABASE === "firebase") {
      response = yield registerWithEmailAndPassword(action.payload.user);
    } else {
      yield checkUserEmailAvailabilityApi(action.payload.user.email);
      response = yield createUserApi(action.payload.user);
    }
    if (response) {
      yield put({
        type: "SET_LOGGED_USER",
        payload: {
          data: response,
        },
      });
      toast.success("Registered");
    }
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
    yield signOutFDB();
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
