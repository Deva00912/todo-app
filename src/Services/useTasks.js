import { useEffect, useState } from "react";

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
    getIndividualUserTasks();

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

  function getIndividualUserTasks() {
    const filterTask = taskList.filter(
      (task) => task?.userId === props.loggedInUser?.id
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
    const keepList = taskList.filter(
      (task) => task.userId !== props.loggedInUser.id
    );
    setTaskList(keepList);
    localStorage.setItem("Tasks", JSON.stringify(taskList));
  }

  return {
    taskList,
    addTask,
    deleteTask,
    getIndividualUserTasks,
    editTask,
    clearAllTask,
  };
}
