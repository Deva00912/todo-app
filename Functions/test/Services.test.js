/* eslint-disable jest/valid-expect */
const mongoose = require("mongoose");
const {
  createUserInDB,
  getAllUsersFromDB,
  getUserFromDB,
} = require("../Services/MongoDB/UserServices");
const {
  addTaskInDB,
  updateTaskInDB,
  deleteTaskInDB,
  findTaskByTaskId,
  getUserTasksFromDB,
} = require("../Services/MongoDB/TaskServices");
const { MONGO_URL } = require("../Services/Utils/Constants");

const expect = require("chai").expect;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error.message));

describe("Testing services", () => {
  describe("Users", () => {
    it("Getting all user", async () => {
      const response = await getAllUsersFromDB();
      expect(response).to.be.a("array");
    });

    it.skip("Creating a user", async () => {
      const user = {
        username: "kimdokja9813ee3492",
        firstName: "Dokja",
        lastName: "Kim",
        password: "Dokja@1234",
        confirmPassword: "Dokja@1234",
      };

      const response = await createUserInDB(user);
      expect(response).to.be.a("object");
    });

    it("Throw error - Duplicate user", async () => {
      const user = {
        username: "kimdokja9813ee3492",
        firstName: "Dokja",
        lastName: "Kim",
        password: "Dokja@1234",
        confirmPassword: "Dokja@1234",
      };
      let code = 0;
      try {
        await createUserInDB(user);
      } catch (error) {
        code = error.code;
      }
      expect(code).to.be.equal(11000);
    });

    it("Getting a user", async () => {
      const username = "devendran0912";
      const response = await getUserFromDB(username);

      expect(response).to.be.a("object");
      expect(Object.values(response).length).to.be.above(1);
    });

    it("Getting an non-existing user", async () => {
      const username = "devendrassn0912";
      const response = await getUserFromDB(username);
      expect(response).to.be.a("null");
      // expect(response).to.be.above(1);
    });
  });

  describe("Tasks", () => {
    it.skip("Adding an task", async () => {
      const task = {
        userId: "64f341992245ab97687076a2",
        entry: "Test Service - 2",
      };

      const response = await addTaskInDB(task);

      expect(response).to.be.a("object");
    });

    it.skip("Update a task", async () => {
      const { taskId, entry } = {
        taskId: "6503e8fd55b6cf122a09e825",
        entry: "Updated on Test Service - 1",
      };
      const response = await updateTaskInDB(taskId, entry);

      expect(response).to.be.a("object");
    });

    it.skip("Delete an task by taskId", async () => {
      const taskId = "6503e8fd55b6cf122a09e825";
      const response = await deleteTaskInDB(taskId);

      expect(response).to.be.a("object");
    });

    it("Find a task by taskId", async () => {
      const taskId = "64ff15977ca546e62c154869";
      const response = await findTaskByTaskId(taskId);

      expect(response).to.be.a("object");
    });

    it("Getting user tasks", async () => {
      const userId = "64ff15847ca546e62c154865";
      const response = await getUserTasksFromDB(userId);

      expect(response).to.be.a("array");
    });

    it("Getting user tasks - with an empty userId", async () => {
      const userId = "";
      let errorMessage = "";
      try {
        await getUserTasksFromDB(userId);
      } catch (error) {
        errorMessage = error.message;
      }

      expect(errorMessage).to.include(`Cast to ObjectId failed for value ""`);
    });
  });
});
