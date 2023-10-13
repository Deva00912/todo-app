/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-conditional-expect */
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

describe("User API", () => {
  describe("POST login/check", () => {
    it("should handle existing user", () => {
      chai
        .request("http://localhost:7000")
        .post("/login/authUserAndLogin")
        .send({
          username: "devendran0912",
          password: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message").equal("Logged in");
          }
        });
    });

    it("should handle existing user - invalid credentials (password)", () => {
      chai
        .request("http://localhost:7000")
        .post("/login/authUserAndLogin")
        .send({
          username: "devendran0912",
          password: "Deve@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Invalid credentials");
          }
        });
    });
    it("should handle existing user - invalid credentials (username)", () => {
      chai
        .request("http://localhost:7000")
        .post("/login/authUserAndLogin")
        .send({
          username: "Devendran0912",
          password: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property("ackStatus");
          }
        });
    });

    it("should handle non existing user", () => {
      chai
        .request("http://localhost:7000")
        .post("/login/authUserAndLogin")
        .send({
          username: "tatsumi0912",
          password: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("User does not exists");
          }
        });
    });
  });

  describe("Register API", () => {
    it.skip("Creating an valid user", () => {
      chai
        .request("http://localhost:7000")
        .put("/register/createUser")
        .send({
          username: "anitha041108642",
          firstName: "Anitha",
          lastName: "K",
          password: "Dev@1234",
          confirmPassword: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res).to.have.property("message");
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("message").equal("User created");
          }
        });
    });

    it("error - Creating an existing valid user", () => {
      try {
        chai
          .request("http://localhost:7000")
          .put("/register/createUser")
          .send({
            username: "anitha0912",
            firstName: "Anitha",
            lastName: "K",
            password: "Dev@1234",
            confirmPassword: "Dev@1234",
          })
          .end((err, res) => {
            if (err) {
              expect(res).to.have.status(500);
              expect(res).to.have.property("message");
            } else {
              expect(res).to.have.status(400);
              expect(res.body)
                .to.have.property("message")
                .equal("User already exists");
            }
          });
      } catch (error) {
        // console.log("error", error);
      }
    });

    it("error - Creating an user with an invalid username", () => {
      chai
        .request("http://localhost:7000")
        .put("/register/createUser")
        .send({
          username: "Anitha8899",
          password: "Dev@1234",
          firstName: "Anitha",
          lastName: "K",
          confirmPassword: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property("ackStatus");
          }
        });
    });

    it("give error - creating a user with no password match", () => {
      chai
        .request("http://localhost:7000")
        .put("/register/createUser")
        .send({
          username: "Anitha0981",
          password: "Dev@1234",
          firstName: "Anitha",
          lastName: "K",
          confirmPassword: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Enter details correctly");
          }
        });
    });
    it("getting all users", () => {
      chai
        .request("http://localhost:7000")
        .get("/register/getUsers")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message").equal("All Users");
          expect(res.body).to.have.property("data");
        });
    });

    it("checking whether an username exist? - username exists", () => {
      chai
        .request("http://localhost:7000")
        .post("/register/isUsernameExists")
        .send({
          username: "devendran0912",
          password: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Username is already in use");
            expect(res.body).to.have.property("data").to.be.a("object");
          }
        });
    });

    it("checking whether an username exist? - username not exists", () => {
      chai
        .request("http://localhost:7000")
        .post("/register/isUsernameExists")
        .send({
          username: "abcd1234",
          password: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(200);
            expect(res.body)
              .to.have.property("message")
              .equal("Username is available");
            expect(res.body).to.have.property("data").to.be.a("array");
          }
        });
    });
  });

  describe("Tasks API", () => {
    it("Adding an valid task", () => {
      chai
        .request("http://localhost:7000")
        .post("/task/addTask")
        .send({
          userId: "64f341992245ab97687076a2",
          entry: "Test api integration 1",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property("message").equal("Task Added!");
          }
        });
    });

    it("give warning - adding an empty entry", () => {
      chai
        .request("http://localhost:7000")
        .post("/task/addTask")
        .send({
          userId: "64f341992245ab97687076a2",
          entry: "",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Task cannot be empty");
          }
        });
    });

    it("give warning - adding an empty task", () => {
      chai
        .request("http://localhost:7000")
        .post("/task/addTask")
        .send({})
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Task cannot be empty");
          }
        });
    });

    it("Editing an valid task", () => {
      chai
        .request("http://localhost:7000")
        .patch("/task/editTask")
        .send({
          taskId: "650a7d370569e1cbfe957b36",
          entry: "Test api integration edit - 1",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message").equal("Task edited");
          }
        });
    });

    it("give warning - editing an non existing task", () => {
      chai
        .request("http://localhost:7000")
        .patch("/task/editTask")
        .send({
          taskId: "64f341e92245ab97687076c5",
          entry: "Test api integration edit - 1",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Task not found!");
          }
        });
    });

    it("give warning - editing an empty task", () => {
      chai
        .request("http://localhost:7000")
        .patch("/task/editTask")
        .send({
          taskId: "64f341e92245ab97687076c5",
          entry: "",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Task cannot be empty");
          }
        });
    });

    it.skip("deleting an existing task", () => {
      chai
        .request("http://localhost:7000")
        .delete("/task/deleteTask/650a7d370569e1cbfe957b41")
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message").equal("Task deleted");
          }
        });
    });

    it("give warning deleting an non - existing task", () => {
      chai
        .request("http://localhost:7000")
        .delete("/task/deleteTask/650bfb44591bbd2879e5a92a")
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("Task not found!");
            // expect(res.body).to.have.property("error");
            // expect(res.body).to.have.property("ackStatus").equal("failed");
          }
        });
    });
    it("getting user tasks", () => {
      chai
        .request("http://localhost:7000")
        .get("/task/findUserTasks/650a93674e3cc62ca66a89b3")
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message").equal("User Tasks");
            expect(res.body).to.have.property("ackStatus").equal("completed");
            expect(res.body).to.have.property("data").to.be.a("array");
          }
        });
    });

    it("getting an non existing user tasks", () => {
      chai
        .request("http://localhost:7000")
        .get("/task/findUserTasks/64f341d42245ab97687076b9")
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("error");
            expect(res.body).to.have.property("ackStatus").equal("failed");
          } else {
            expect(res).to.have.status(400);
            // expect(res.body).to.have.property("message").equal("No Tasks");
            expect(res.body).to.have.property("error");
            expect(res.body).to.have.property("ackStatus").equal("failed");
          }
        });
    });
  });
});
