const {
  addTaskInDB,
  updateTaskInDB,
  findTaskByTaskId,
  deleteTaskInDB,
  getUserTasksFromDB,
} = require("../Services/MongoDB/TaskServices");

const throwTaskError = (message) => {
  const error = new Error(message);
  error.name = "TaskError";
  throw error;
};

const addTaskFeature = async (task) => {
  if (!task || !task.entry) {
    throwTaskError("Task cannot be empty");
  }
  await addTaskInDB(task);
  return { message: "Task Added!" };
};

const updateTask = async (taskId, entry) => {
  if (!taskId) {
    throwTaskError("Task not found!");
  }
  if (!entry) {
    throwTaskError("Task cannot be empty");
  }
  const taskByTaskId = await findTaskByTaskId(taskId);
  if (!taskByTaskId) {
    throwTaskError("Task not found!");
  }
  const updatedTask = await updateTaskInDB(taskId, entry);
  return { message: "Task edited", data: updatedTask };
};

const deleteTaskFeature = async (taskId) => {
  if (!taskId) {
    throwTaskError("Task not found!");
  }
  const response = await findTaskByTaskId(taskId);
  if (!response) {
    throwTaskError("Task not found!");
  }
  const deletedTask = await deleteTaskInDB(taskId);
  return { message: "Task deleted", data: deletedTask };
};

const getUserTasksFeature = async (userId) => {
  const response = await getUserTasksFromDB(userId);
  if (!response.length) {
    throwTaskError("No Tasks");
  }
  return { message: "User Tasks", data: response };
};

module.exports = {
  addTaskFeature,
  updateTask,
  deleteTaskFeature,
  getUserTasksFeature,
};
