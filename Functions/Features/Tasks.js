const {
  addTaskInDB,
  updateTaskInDB,
  findTaskByTaskId,
  deleteTaskInDB,
  getUserTasksFromDB,
} = require("../Services/MongoDB/TaskServices");

const addTaskFeature = async (task) => {
  try {
    if (!task || !task.entry) {
      throw new Error("Task cannot be empty");
    }
    const response = await addTaskInDB(task);
    return { statusCode: 201, message: "Task Added!", data: response };
  } catch (error) {
    return { statusCode: 400, message: error.message, data: {} };
  }
};

const updateTask = async (taskId, entry) => {
  try {
    if (!taskId) {
      throw new Error("Task not found!");
    }
    if (!entry) {
      throw new Error("Task cannot be empty");
    }
    const taskByTaskId = await findTaskByTaskId(taskId);
    if (!(Object.values(taskByTaskId).length > 0)) {
      throw new Error("Task not found!");
    }
    // eslint-disable-next-line
    const response = await updateTaskInDB(taskId, entry);
    return { statusCode: 200, message: "Task edited" };
  } catch (error) {
    return { statusCode: 400, message: error.message };
  }
};

const deleteTaskFeature = async (taskId) => {
  try {
    if (!taskId) {
      throw new Error("Task not found!");
    }
    const response = await findTaskByTaskId(taskId);
    if (!response) {
      throw new Error("Task not found");
    }
    await deleteTaskInDB(taskId);
    return { statusCode: 200, message: "Task Deleted" };
  } catch (error) {
    return { statusCode: 400, message: error.message };
  }
};

const getUserTasksFeature = async (userId) => {
  try {
    const response = await getUserTasksFromDB(userId);
    if (!response.length) {
      throw new Error("No Tasks");
    }
    return { statusCode: 200, message: "User Tasks", data: response };
  } catch (error) {
    return { statusCode: 400, message: error.message };
  }
};

module.exports = {
  addTaskFeature,
  updateTask,
  deleteTaskFeature,
  getUserTasksFeature,
};
