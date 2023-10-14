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
  addTask: (task, token) => {
    store.dispatch({
      type: actionTypes.ADD_TASK,
      payload: {
        task: { ...task },
        token: token,
      },
    });
  },

  editTask: (task, token) => {
    store.dispatch({
      type: actionTypes.EDIT_TASK,
      payload: {
        editTask: { ...task },
        token: token,
      },
    });
  },

  deleteTask: (task, token) => {
    store.dispatch({
      type: actionTypes.DELETE_TASK,
      payload: {
        taskId: task.taskId,
        userId: task.userId,
        token: token,
      },
    });
  },

  getUserTasks: (userId, token) => {
    store.dispatch({
      type: actionTypes.GET_USER_TASKS,
      payload: {
        userId: userId,
        token: token,
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
    yield addTaskApi(action.payload.task, action.payload.token);
    toast.success("Task Added");
    yield taskActions.getUserTasks(
      action.payload.task.userId,
      action.payload.token
    );
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
      console.log("Not empty");
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
    yield taskActions.getUserTasks(
      action.payload.editTask.userId,
      action.payload.token
    );
  } catch (error) {
    toast.error(error.message);
  }
}

function* deleteTaskWorker(action) {
  try {
    yield deleteTaskApi(action.payload.taskId, action.payload.token);
    toast.success("Task deleted");
    yield taskActions.getUserTasks(action.payload.userId, action.payload.token);
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
