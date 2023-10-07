import { all, put, takeEvery } from "redux-saga/effects";
import store from "../Store/store";
import {
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
  getIndividualUserTasksApi,
} from "../../Services/Api/tasks";
import { toast } from "react-toastify";

export const actionTypes = {
  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  GET_USER_TASKS: "GET_USER_TASKS",
  CLEAR_USER_TASKS: "CLEAR_USER_TASKS",
};

export const taskActions = {
  addTask: (task) => {
    store.dispatch({
      type: actionTypes.ADD_TASK,
      payload: {
        task: { ...task },
      },
    });
  },

  editTask: (task) => {
    store.dispatch({
      type: actionTypes.EDIT_TASK,
      payload: {
        editTask: { ...task },
      },
    });
  },

  deleteTask: (taskId) => {
    store.dispatch({
      type: actionTypes.DELETE_TASK,
      payload: {
        taskId: taskId,
      },
    });
  },

  getUserTasks: (userId) => {
    store.dispatch({
      type: actionTypes.GET_USER_TASKS,
      payload: {
        userId: userId,
      },
    });
  },

  clearUserTasks: () => {
    store.dispatch({
      type: actionTypes.CLEAR_USER_TASKS,
    });
  },
};

function* addTaskWorker(action) {
  try {
    yield addTaskApi(action.payload.task);
    toast.success("Task Added");
  } catch (error) {
    toast.error(error.message);
  }
}

function* getUserTasksWorker(action) {
  try {
    const userTasks = yield getIndividualUserTasksApi(action.payload.userId);
    if (userTasks.length) {
      yield put({
        type: "SET_USER_TASKS",
        payload: {
          userTasks: userTasks,
        },
      });
    }
  } catch (error) {
    toast.error(error.message);
  }
}

function* editTaskWorker(action) {
  try {
    const response = yield editTaskApi(
      action.payload.editTask.taskId,
      action.payload.editTask.entry
    );
    console.log("response", response);
    toast.success("Task Edited");
  } catch (error) {
    toast.error(error.message);
  }
}

function* deleteTaskWorker(action) {
  try {
    yield deleteTaskApi(action.payload.taskId);
    toast.success("Task deleted");
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
