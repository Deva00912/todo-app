import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import tasksReducer from "./tasksReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: [],
};
const tasksPersistConfig = {
  key: "tasks",
  storage: storage,
  blacklist: [],
};

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth ", "task"],
};

//root reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tasks: persistReducer(tasksPersistConfig, tasksReducer),
});

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
