import { useEffect, useState } from "react";

export function useTasks(props) {
  const loggedUser = localStorage.getItem("LoggedUsers")
    ? Object.values(JSON.parse(localStorage.getItem("LoggedUsers"))).length > 0
      ? JSON.parse(localStorage.getItem("LoggedUsers"))
      : {}
    : {};
  const [taskList, setTaskList] = useState(
    localStorage.getItem("Tasks")
      ? Object.values(JSON.parse(localStorage.getItem("Tasks"))).length > 0
        ? JSON.parse(localStorage.getItem("Tasks"))
        : []
      : []
  );

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(taskList));
    getUserTasks();

    // eslint-disable-next-line
  }, [taskList]);

  function addTask(task) {
    if (!taskList) {
      setTaskList(task);
      return true;
    } else {
      setTaskList([...taskList, task]);
      localStorage.setItem("Tasks", JSON.stringify(taskList));
      return true;
    }
  }

  function deleteTask(taskDeleteId) {
    const keepList = taskList.filter((task) => task.taskId !== taskDeleteId);
    setTaskList(keepList);
    localStorage.setItem("Tasks", JSON.stringify(taskList));
  }

  function getUserTasks() {
    const filterTask = taskList.filter(
      (task) => task?.userId === loggedUser?.id
    );
    filterTask.sort((a, b) => b.timestamp - a.timestamp);
    return filterTask;
  }

  function editTask(editTaskId, entry) {
    const keepList = taskList.filter((task) => task?.taskId !== editTaskId);
    keepList.push(entry);
    setTaskList(keepList);
    localStorage.setItem("Tasks", JSON.stringify(taskList));
  }

  function clearAllTask() {
    const keepList = taskList.filter((task) => task.userId !== loggedUser.id);
    setTaskList(keepList);
    localStorage.setItem("Tasks", JSON.stringify(taskList));
  }
  function logOut() {
    localStorage.setItem("Tasks", JSON.stringify(taskList));
    localStorage.removeItem("LoggedUsers");
    props.navigate("/login");
  }

  return { taskList, addTask, deleteTask, getUserTasks, editTask, clearAllTask, logOut };
}
