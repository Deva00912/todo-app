import { all, put, takeEvery } from "redux-saga/effects";
import store from "../Store/store";

export const actionTypes = {
  CHANGE_COLOR: "CHANGE_COLOR",
};

export const myFirstSagaActions = {
  changeColor: (color) => {
    store.dispatch({
      type: actionTypes.CHANGE_COLOR,
      payload: {
        color: color,
      },
    });
  },
};

function* changeColorWorker(action) {
  yield put({
    type: "SET_COLOR",
    payload: {
      color: action.payload.color,
    },
  });
}

// eslint-disable-next-line
function* signUpWorker(action) {
  // try {
  // yield setAuthLoading(true);
  // const response = yield signUpWithAuthCredentials(
  //   store.getState().auth.credentials.authCredential,
  //   action.payload.displayName,
  //   action.payload.phoneNumber
  // );
  // yield put({
  //   type: "SET_AUTH_INFO",
  //   payload: {
  //     accessToken: response.user.accessToken,
  //     uid: response.user.uid,
  //     displayName: action.payload.displayName,
  //     phoneNumber: response.user.phoneNumber
  //   }
  // });
  //   yield setAuthLoading(false);
  // } catch (error) {
  //   yield statusActions.setErrorStatus(error);
  //   yield setAuthLoading(false);
  // }
}

export function* myFirstWatcher() {
  yield all([takeEvery("CHANGE_COLOR", changeColorWorker)]);
}
