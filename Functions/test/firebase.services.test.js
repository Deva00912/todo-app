/* eslint-disable jest/valid-expect */
const { expect } = require("chai");
const {
  getUsersFDB,
  createUserFDB,
  getUserFDB,
} = require("../Services/FireBase/UserService");
const {
  addTaskFDB,
  updateTaskFDB,
  deleteTaskFDB,
  getUserTasksFDB,
  getTasksByTaskIdFDB,
} = require("../Services/FireBase/TasksService");

const firebaseCreateUser = async (user) => {
  await createUserFDB(user);
  return firebaseGetUser(user.username);
};

const firebaseGetUser = async (username) => {
  const snapshot = await getUserFDB(username);
  return getDocumentsFromSnapshot(snapshot)[0];
};

const getDocumentsFromSnapshot = (snapshot) => {
  return snapshot.docs.map((doc) => ({
    userId: doc.id,
    ...doc.data(),
  }));
};

const getUserTasks = async (userId) => {
  const snapshot = await getUserTasksFDB(userId);
  return getDocumentsFromSnapshot(snapshot);
};

describe("Testing Firebase services", () => {
  describe("User - Services", () => {
    it("fetching all users from database", async () => {
      const snapshot = await getUsersFDB();
      const users = getDocumentsFromSnapshot(snapshot);
      expect(users).to.be.a("array");
    });
    it("creating a user", async () => {
      const user = {
        username: "suchen099",
        firstName: "Chen",
        lastName: "Su",
        password: "Chen@1234",
        confirmPassword: "Chen@1234",
      };
      const createdUser = await firebaseCreateUser(user);
      expect(createdUser).to.be.a("object");
      expect(createdUser).to.haveOwnProperty("userId");
    });
    it("fetching an existing user", async () => {
      const username = "kimdokja9853";
      const fetchedUser = await firebaseGetUser(username);
      expect(fetchedUser).to.be.a("object");
      expect(fetchedUser).to.haveOwnProperty("userId");
    });
  });

  describe("Task - Services", () => {
    it("Adding a task", async () => {
      const task = {
        userId: "652789dcb1be297de3aa58de",
        entry: "Test Service - 3",
      };
      await addTaskFDB(task);
      const tasks = await getUserTasks("652789dcb1be297de3aa58de");
      expect(tasks).to.be.a("array");
    });
    it("editing a task", async () => {
      const task = {
        taskId: "CL4KO40fnYR5txTQK0Bn",
        entry: "Test Service - 2 - updated",
      };
      await updateTaskFDB(task);
      const snapshot = await getTasksByTaskIdFDB(task.taskId);
      const updatedTask = snapshot.data();
      console.log("updatedTask", updatedTask);
      expect(updatedTask).to.be.a("object").to.haveOwnProperty("userId");
    });
    it("deleting a task", async () => {
      const taskId = "XZ4fsVpqRI7U5M4kYtBW";

      await deleteTaskFDB(taskId);
      const snapshot = await getTasksByTaskIdFDB(taskId);
      const deletedTask = snapshot.data();
      expect(deletedTask).to.be.a("undefined");
    });
    it("fetching a existing user's tasks", async () => {
      const userId = "652789dcb1be297de3aa58de";
      const tasks = await getUserTasks(userId);
      expect(tasks).to.be.a("array");
    });
  });
});
