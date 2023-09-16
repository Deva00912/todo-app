const {
  addTaskInDB,
  updateTaskInDB,
  findTaskByTaskId,
  deleteTaskInDB,
  getUserTasksFromDB,
} = require("../Services/MongoDB/TaskServices");

const throwTaskError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  error.name = "TypeError";
  throw error;
};

const addTaskFeature = async (task) => {
  if (!task || !task.entry) {
    throwTaskError("Task cannot be empty", 3330);
  }
  await addTaskInDB(task);
  return { message: "Task Added!" };
};

const updateTask = async (taskId, entry) => {
  if (!taskId) {
    throwTaskError("Task not found!", 3321);
  }
  if (!entry) {
    throwTaskError("Task cannot be empty", 3330);
  }
  const taskByTaskId = await findTaskByTaskId(taskId);
  if (!Object.values(taskByTaskId).length) {
    throwTaskError("Task not found!", 3321);
  }
  await updateTaskInDB(taskId, entry);
  return { message: "Task edited" };
};

const deleteTaskFeature = async (taskId) => {
  if (!taskId) {
    throwTaskError("Task not found!", 3321);
  }
  const response = await findTaskByTaskId(taskId);
  if (!response) {
    throwTaskError("Task not found!", 3321);
  }
  await deleteTaskInDB(taskId);
  return { message: "Task Deleted" };
};

const getUserTasksFeature = async (userId) => {
  const response = await getUserTasksFromDB(userId);
  if (!response.length) {
    throwTaskError("No Tasks", 3402);
  }
  return { message: "User Tasks", data: response };
};

module.exports = {
  addTaskFeature,
  updateTask,
  deleteTaskFeature,
  getUserTasksFeature,
};
