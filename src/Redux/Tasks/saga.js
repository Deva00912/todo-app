import { all, put, takeEvery } from "redux-saga/effects";
import {
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
  getIndividualUserTasksApi,
} from "../../Services/Api/tasks";
import { toast } from "react-toastify";
import { getUserTasks } from "./action";

function* addTaskWorker(action) {
  try {
    yield addTaskApi(action.payload.task, action.payload.token);
    toast.success("Task Added");
    yield getUserTasks(action.payload.task.userId, action.payload.token);
  } catch (error) {
    toast.error(error.message);
  }
}

function* getUserTasksWorker(action) {
  try {
    const userTasks = yield getIndividualUserTasksApi(
      action.payload.userId,
      action.payload.token
    );
    if (userTasks.length) {
      yield put({
        type: "SET_USER_TASKS",
        payload: {
          userTasks: userTasks,
        },
      });
    }
  } catch (error) {
    if (error.message === "No Tasks") {
      yield put({
        type: "SET_USER_TASKS",
        payload: {
          userTasks: [],
        },
      });
    }
    toast.error(error.message);
  }
}

function* editTaskWorker(action) {
  try {
    yield editTaskApi(
      action.payload.editTask.taskId,
      action.payload.editTask.entry,
      action.payload.token
    );
    toast.success("Task Edited");
    yield getUserTasks(action.payload.editTask.userId, action.payload.token);
  } catch (error) {
    toast.error(error.message);
  }
}

function* deleteTaskWorker(action) {
  try {
    yield deleteTaskApi(action.payload.taskId, action.payload.token);
    toast.success("Task deleted");
    yield getUserTasks(action.payload.userId, action.payload.token);
  } catch (error) {
    toast.error(error.message);
  }
}

function* clearUserTasksWorker(action) {
  try {
    yield put({
      type: "SET_USER_TASKS",
      payload: {
        userTasks: [],
      },
    });
  } catch (error) {
    toast.error(error.message);
  }
}

export function* taskWatcher() {
  yield all([
    takeEvery("GET_USER_TASKS", getUserTasksWorker),
    takeEvery("ADD_TASK", addTaskWorker),
    takeEvery("EDIT_TASK", editTaskWorker),
    takeEvery("DELETE_TASK", deleteTaskWorker),
    takeEvery("CLEAR_USER_TASKS", clearUserTasksWorker),
  ]);
}
