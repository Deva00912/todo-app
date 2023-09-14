const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const addTaskApi = async (task) => {
  const response = await fetch("http://localhost:7000/task/add", {
    method: "POST",
    body: JSON.stringify(task),
    headers: headersList,
  });
  const responseTask = await response.json();
  if (responseTask.statusCode !== 201) {
    throw new Error(responseTask.message + " Enter correctly");
  }
  return responseTask.data;
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
  console.log("API - response: ", deletedTask);
  if (deletedTask.statusCode !== 200) {
    throw new Error(deletedTask.message);
  }
  return deletedTask.message;
};

export const getIndividualUserTasksApi = async (userId) => {
  const response = await fetch(`http://localhost:7000/task/find/${userId}`, {
    method: `GET`,
    headers: headersList,
  });
  const data = await response.json();
  if (data.statusCode !== 200) {
    throw new Error(data.message);
  }
  return data.data;
};

export const editTaskApi = async (taskId, entry) => {
  const response = await fetch("http://localhost:7000/task/edit", {
    method: `PATCH`,
    body: JSON.stringify({ taskId, entry }),
    headers: headersList,
  });
  const editedTask = await response.json();
  if (editedTask.statusCode !== 200) {
    throw new Error(editedTask.message);
  }
  return editedTask.message;
};

export const clearUserTasksApi = async (userId) => {
  const response = await fetch("http://localhost:7000/task/clear", {
    method: `PATCH`,
    body: JSON.stringify({ userId }),
    headers: headersList,
  });
  const clearedTasks = await response.json();
  if (clearedTasks.statusCode !== 200) {
    throw new Error(clearedTasks.message);
  }
  return clearedTasks.message;
};
