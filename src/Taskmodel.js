import React, { useEffect, useRef, useState } from "react";

export default function TaskModel() {
  const [tasks, setTasks] = useState([]);

  const taskTitle = useRef("");
  const taskSummary = useRef("");

  // eslint-disable-next-line 
  function createTask() {
    setTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);

    saveTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);
  }

  // eslint-disable-next-line 
  function deleteTask(index) {
    var clonedTasks = [...tasks];

    clonedTasks.splice(index, 1);

    setTasks(clonedTasks);

    saveTasks([...clonedTasks]);
  }
  
  // eslint-disable-next-line 
  function loadTasks() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  useEffect(() => {
    loadTasks();
  }, []);
  return <div></div>;
}
