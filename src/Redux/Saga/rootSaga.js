import { all } from "redux-saga/effects";
import { authWatcher } from "./authSaga";
import { taskWatcher } from "./tasksSaga";

export default function* rootSaga() {
  yield all([authWatcher(), taskWatcher()]);
}
