import { useEffect, useState } from "react";
import {
  addTaskApi,
  clearUserTasksApi,
  deleteTaskApi,
  editTaskApi,
  getIndividualUserTasksApi,
} from "../Api/tasks";

export function useTasks(props) {
  const [taskList, setTaskList] = useState(
    localStorage.getItem("Tasks")
      ? Object.values(JSON.parse(localStorage.getItem("Tasks"))).length > 0
        ? JSON.parse(localStorage.getItem("Tasks"))
        : []
      : []
  );

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(taskList));
    getIndividualUserTasks(props.auth?.loggedInUser?.userId);

    // eslint-disable-next-line
  }, [taskList]);

  const addTask = async (task) => {
    if (!task) {
      throw new Error("Task cannot be empty");
    } else {
      if (process.env.REACT_APP_STAGING === "local") {
        if (!taskList) {
          setTaskList(task);
          return true;
        } else {
          setTaskList([...taskList, task]);
          return true;
        }
      } else {
        const response = await addTaskApi(task);
        return response;
      }
    }
  };

  const deleteTask = async (taskDeleteId) => {
    if (process.env.REACT_APP_STAGING === "local") {
      const keepList = taskList.filter((task) => task.taskId !== taskDeleteId);
      setTaskList(keepList);
    } else {
      const response = await deleteTaskApi(taskDeleteId);
      return response;
    }
  };

  const getIndividualUserTasks = async (userId) => {
    if (userId) {
      if (process.env.REACT_APP_STAGING === "local") {
        if (!taskList) {
          return [];
        } else {
          const filterTask = taskList.filter((task) => task?.userId === userId);
          filterTask.sort((a, b) => b.timestamp - a.timestamp);
          return filterTask;
        }
      } else {
        const response = await getIndividualUserTasksApi(userId);
        return response;
      }
    }
  };

  const editTask = async (editTaskId, entry) => {
    if (process.env.REACT_APP_STAGING === "local") {
      const keepList = taskList.filter((task) => task?.taskId !== editTaskId);
      keepList.push(entry);
      setTaskList(keepList);
    } else {
      const response = await editTaskApi(editTaskId, entry.entry);
      return response;
    }
  };

  const clearUserTask = async (userId) => {
    if (process.env.REACT_APP_STAGING === "local") {
      const keepList = taskList.filter((task) => task.userId !== userId);
      setTaskList(keepList);
    } else {
      const response = await clearUserTasksApi(userId);
      return response;
    }
  };

  return {
    taskList,
    addTask,
    deleteTask,
    getIndividualUserTasks,
    editTask,
    clearUserTask,
  };
}
