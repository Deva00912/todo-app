/* eslint-disable jest/valid-expect */
const mongoose = require("mongoose");
const expect = require("chai").expect;
const {
  validate,
  postCreateUser,
  getGetAllUsers,
  postIsUsernameExist,
  validateUsername,
  checkPasswordAndLogin,
} = require("../Features/Auth");
const {
  addTaskFeature,
  updateTask,
  deleteTaskFeature,
  getUserTasksFeature,
} = require("../Features/Tasks");

const { MONGO_URL } = require("../Services/Utils/Constants");

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error.message));

describe("Testing Features", () => {
  describe("User features", () => {
    it("Validating user - valid details", () => {
      const user = {
        username: "devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(true);
    });
    describe("Validating user - Invalid details", () => {
      it("Incorrect username", () => {
        const user = {
          username: "Devendran0912",
          firstName: "Devendran",
          lastName: "M",
          password: "Dev@1234",
          confirmPassword: "Dev@1234",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
      it("Invalid password", () => {
        const user = {
          username: "Devendran0912",
          firstName: "Devendran",
          lastName: "M",
          password: "dev1234",
          confirmPassword: "Dev@1234",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
      it("Mismatch password & confirm password", () => {
        const user = {
          username: "Devendran0912",
          firstName: "Devendran",
          lastName: "M",
          password: "Dev@1dd234",
          confirmPassword: "Dev@1234",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
      it("Empty first name", () => {
        const user = {
          username: "devendran0912",
          firstName: "",
          lastName: "M",
          password: "Dev@1234",
          confirmPassword: "Dev@1234",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
      it("Empty last name", () => {
        const user = {
          username: "devendran0912",
          firstName: "Devendran",
          lastName: "",
          password: "Dev@1234",
          confirmPassword: "Dev@1234",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
      it("Empty first &  last name", () => {
        const user = {
          username: "devendran0912",
          firstName: "",
          lastName: "",
          password: "Dev@1234",
          confirmPassword: "Dev@1234",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
      it("Empty password & confirmPassword", () => {
        const user = {
          username: "devendran0912",
          firstName: "Devendran",
          lastName: "M",
          password: "",
          confirmPassword: "",
        };
        const result = validate(user);
        expect(result).to.be.equal(false);
      });
    });

    describe("Creating User", () => {
      it("Creating a user with Valid details", async () => {
        const user = {
          username: "anitha33332",
          firstName: "Anitha",
          lastName: "K",
          password: "Dev@1234",
          confirmPassword: "Dev@1234",
        };
        const response = await postCreateUser(user);
        expect(response).to.be.a("object");
        expect(Object.values(response).length).to.be.equal(2);
        expect(response.message).to.be.equal("User created");
        expect(response.data).to.be.a("object");
      });
    });

    describe("Getting all users", () => {
      it("Getting every users", async () => {
        const response = await getGetAllUsers();
        expect(response).to.be.a("object");
        expect(response.message).to.be.equal("All Users");
        expect(response.data).to.be.a("array");
        expect(response.data.length).to.be.above(0);
      });
    });

    describe("checking username exists", () => {
      it("Username exists", async () => {
        const username = "devendran0912";
        const response = await postIsUsernameExist(username);
        expect(response).to.be.a("object");
        expect(response.message).to.be.equal("Username is already in use");
        expect(response.data).to.be.a("object");
        expect(Object.values(response.data).length).to.be.above(1);
      });
      it("Username is available", async () => {
        const username = "devendrhhan0912";
        const response = await postIsUsernameExist(username);

        expect(response).to.be.a("object");
        expect(response.message).to.be.equal("Username is available");
        expect(response.data).to.be.a("array");
        expect(response.data.length).to.be.equal(0);
      });

      it("Validating username - valid username", () => {
        const username = "devendran0222";
        const result = validateUsername(username);
        expect(result).to.be.equal(true);
      });
      it("Validating username - invalid username", () => {
        const username = "Devendran0222";
        const result = validateUsername(username);

        expect(result).to.be.equal(false);
      });
    });

    describe("Login Validation", () => {
      it("existing user - valid credentials", async () => {
        const user = {
          username: "devendran0912",
          password: "Dev@1234",
        };
        const response = await checkPasswordAndLogin(
          user.username,
          user.password
        );

        expect(response).to.be.a("object");
        expect(Object.values(response)).to.have.lengthOf(2);
        expect(response.statusCode).to.be.equal(200);
        expect(response.message).to.be.equal("Logged in");
        expect(response.data).to.be.a("object");
        expect(
          Object.values(JSON.stringify(response.data))
        ).to.have.lengthOf.above(3);
      });
      it("existing user - invalid credentials (password)", async () => {
        const user = {
          username: "devendran0912",
          password: "Dev@e1234",
        };
        const response = await checkPasswordAndLogin(
          user.username,
          user.password
        );

        expect(response).to.be.a("object");
        expect(Object.values(response)).to.have.lengthOf(3);
        expect(response.statusCode).to.be.equal(401);
        expect(response.message).to.be.equal("Invalid credentials");
        expect(response.data).to.be.a("object");
        expect(Object.values(response.data)).to.have.lengthOf(0);
      });

      it("Non - existing user", async () => {
        const user = {
          username: "hello234",
          password: "Dev@e1234",
        };
        const response = await checkPasswordAndLogin(
          user.username,
          user.password
        );

        expect(response).to.be.a("object");
        expect(Object.values(response)).to.have.lengthOf(3);
        expect(response.data).to.be.a("object");
        expect(Object.values(response.data)).to.have.lengthOf(0);
      });
    });
  });

  describe("Tasks", () => {
    describe("Adding task", () => {
      it.skip("Valid task", async () => {
        const task = {
          userId: "64f341992245ab97687076a2",
          entry: "Test feature - 1",
        };

        const response = await addTaskFeature(task);

        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(201);
        expect(response.message).to.be.equal("Task Added!");
        expect(response.data).to.be.a("object");
        expect(
          Object.values(JSON.stringify(response.data))
        ).to.have.lengthOf.above(2);
      });

      it("Adding an empty task - null", async () => {
        const task = null;
        const response = await addTaskFeature(task);

        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("Task cannot be empty");
        expect(response.data).to.be.a("object");
        expect(Object.values(response.data)).to.have.lengthOf(0);
      });
      it("Adding an empty task entry - null", async () => {
        const task = {
          userId: "64f341992245ab97687076a2",
          entry: "",
        };

        const response = await addTaskFeature(task);

        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("Task cannot be empty");
        expect(response.data).to.be.a("object");
        expect(Object.values(response.data)).to.have.lengthOf(0);
      });
    });

    describe("Updating task", () => {
      it("valid task", async () => {
        const task = {
          taskId: "650535be18739d85cd823de6",
          entry: "Task Edit Feature - 1",
        };

        const response = await updateTask(task.taskId, task.entry);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(200);
        expect(response.message).to.be.equal("Task edited");
      });
      it("Invalid task - empty taskId", async () => {
        const task = {
          taskId: "",
          entry: "Task Edit Feature - 1",
        };

        const response = await updateTask(task.taskId, task.entry);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("Task not found!");
      });
      it("Invalid task - empty entry", async () => {
        const task = {
          taskId: "650535be18739d85cd823de6",
          entry: "",
        };

        const response = await updateTask(task.taskId, task.entry);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("Task cannot be empty");
      });
    });

    describe("Deleting an task", () => {
      it.skip("valid deletion", async () => {
        const taskId = "6502ce84b0792b4d6a62efd3";

        const response = await deleteTaskFeature(taskId);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(200);
        expect(response.message).to.be.equal("Task Deleted");
      });
      it("invalid deletion - empty taskId", async () => {
        const taskId = "";

        const response = await deleteTaskFeature(taskId);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("Task not found!");
      });

      it("invalid deletion - not an existing taskId", async () => {
        const taskId = "6502ce84b0792b4d6a62efd3";

        const response = await deleteTaskFeature(taskId);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("Task not found!");
      });
    });

    describe("getting user tasks", () => {
      it("valid user - tasks are present", async () => {
        const userId = "64f341992245ab97687076a2";

        const response = await getUserTasksFeature(userId);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(200);
        expect(response.message).to.be.equal("User Tasks");
        expect(response.data).to.be.a("array");
        expect(response.data).to.have.lengthOf.above(0);
      });

      it("valid user - tasks are not present", async () => {
        const userId = "64f6fe32be6ff5aa5d25b904";

        const response = await getUserTasksFeature(userId);
        expect(response).to.be.a("object");
        expect(response.statusCode).to.be.equal(400);
        expect(response.message).to.be.equal("No Tasks");
      });
    });
  });
});
