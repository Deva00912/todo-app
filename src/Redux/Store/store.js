import { persistedReducer } from "../Reducer/rootReducer";
import rootSaga from "../Saga/rootSaga";
import persistStore from "redux-persist/es/persistStore";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);
sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);

export default store;
