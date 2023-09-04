const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const addTaskApi = async (task) => {
  if (!task) {
    throw new Error("Task cannot be empty");
  } else {
    const response = await fetch("http://localhost:7000/task/add", {
      method: "POST",
      body: JSON.stringify({ ...task }),
      headers: headersList,
    });
    const data = await response.json();
    return data;
  }
};

export const deleteTaskApi = async (taskDeleteId) => {
  const response = await fetch(
    `http://localhost:7000/task/delete/${taskDeleteId}`,
    {
      method: `DELETE`,
      headers: headersList,
    }
  );
  const deletedTask = await response.json();
  return deletedTask;
};

export const getIndividualUserTasksApi = async (userId) => {
  const response = await fetch(`http://localhost:7000/task/find/${userId}`, {
    method: `GET`,
    headers: headersList,
  });
  const data = await response.json();
  return data;
};

export const editTaskApi = async (taskId, entry) => {
  const response = await fetch("http://localhost:7000/task/edit", {
    method: `PATCH`,
    body: JSON.stringify({ taskId, entry }),
    headers: headersList,
  });
  const editedTask = await response.json();
  return editedTask;
};

export const clearUserTasksApi = async (userId) => {
  const response = await fetch("http://localhost:7000/task/clear", {
    method: `PATCH`,
    body: JSON.stringify({ userId }),
    headers: headersList,
  });
  const clearedTasks = await response.json();
  return clearedTasks;
};
