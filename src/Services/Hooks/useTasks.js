import { useEffect, useState } from "react";
import {
  addTaskApi,
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

  const addTask = async (task, token) => {
    if (!task) {
      throw new Error("Task cannot be empty");
    } else {
      if (process.env.REACT_APP_STAGING === "local") {
        if (!taskList) {
          setTaskList(task);
          return true;
        }
        setTaskList([...taskList, task]);
        return true;
      } else {
        const response = await addTaskApi(task, token);
        return response;
      }
    }
  };

  const deleteTask = async (taskDeleteId, token) => {
    if (process.env.REACT_APP_STAGING === "local") {
      const keepList = taskList.filter((task) => task.taskId !== taskDeleteId);
      setTaskList(keepList);
    } else {
      const response = await deleteTaskApi(taskDeleteId, token);
      return response;
    }
  };

  const getIndividualUserTasks = async (userId, token) => {
    if (userId) {
      if (process.env.REACT_APP_STAGING === "local") {
        if (!taskList) {
          return [];
        }
        const filterTask = taskList.filter((task) => task?.userId === userId);
        filterTask.sort((a, b) => b.timestamp - a.timestamp);
        return filterTask;
      } else {
        const response = await getIndividualUserTasksApi(userId, token);
        return response;
      }
    }
  };

  const editTask = async (editTaskId, entry, token) => {
    if (process.env.REACT_APP_STAGING === "local") {
      const keepList = taskList.filter((task) => task?.taskId !== editTaskId);
      keepList.push(entry);
      setTaskList(keepList);
    } else {
      const response = await editTaskApi(editTaskId, entry.entry, token);
      return response;
    }
  };

  return {
    taskList,
    addTask,
    deleteTask,
    getIndividualUserTasks,
    editTask,
  };
}
