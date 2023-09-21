const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const addTaskApi = async (task) => {
  const response = await fetch("http://localhost:7000/task/addTask", {
    method: "PUT",
    body: JSON.stringify(task),
    headers: headersList,
  });
  const responseTask = await response.json();
  if (responseTask.ackStatus !== "completed") {
    throw new Error("Something went wrong!");
  }
  if (response.status !== 201) {
    throw new Error(responseTask.message + " Enter correctly");
  }
};

export const deleteTaskApi = async (taskDeleteId) => {
  const response = await fetch(
    `http://localhost:7000/task/deleteTask/${taskDeleteId}`,
    {
      method: `DELETE`,
      headers: headersList,
    }
  );

  const deletedTask = await response.json();
  if (deletedTask.ackStatus !== "completed") {
    throw new Error("Something went wrong!");
  }
  if (response.status !== 200) {
    throw new Error(deletedTask.message);
  }
};

export const getIndividualUserTasksApi = async (userId) => {
  const response = await fetch(
    `http://localhost:7000/task/findUserTasks/${userId}`,
    {
      method: `GET`,
      headers: headersList,
    }
  );
  const data = await response.json();
  if (data.ackStatus !== "completed") {
    throw new Error("Something went wrong!");
  }
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data.data;
};

export const editTaskApi = async (taskId, entry) => {
  const response = await fetch("http://localhost:7000/task/editTask", {
    method: `PATCH`,
    body: JSON.stringify({ taskId, entry }),
    headers: headersList,
  });
  const editedTask = await response.json();
  if (editedTask.ackStatus !== "completed") {
    throw new Error("Something went wrong!");
  }
  if (response.status !== 200) {
    throw new Error(editedTask.message);
  }
  return editedTask.message;
};
