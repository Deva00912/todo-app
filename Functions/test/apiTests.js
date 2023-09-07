const assert = require("chai").assert;

const headersList = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

describe("Testing API", () => {
  describe("Register APIs", () => {
    /*
  it("Creating a user", async () => {
    const user = {
      userName: "luoZheng",
      firstName: "Zheng",
      lastName: "Luo",
      password: "Zheng@1234",
      confirmPassword: "Zheng@1234",
    };

    const response = await fetch("http://localhost:7000/register/create-user", {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: headersList,
    });

    const createdUser = await response.json();
    assert.equal(createdUser.statusCode, 201);
    assert.equal(createdUser.message, "User created");
    assert.equal(Object.values(createdUser.data).length, 8);
  });

  */

    /*
  it("Creating an existing user", async () => {
    const user = {
      userName: "devendran0912",
      firstName: "Devendran",
      lastName: "M",
      password: "Dev@1234",
      confirmPassword: "Dev@1234",
    };

    const response = await fetch("http://localhost:7000/register/create-user", {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: headersList,
    });

    const createdUser = await response.json();
    assert.equal(createdUser.statusCode, 400);
    assert.equal(createdUser.message, "Username is already in use");
    //   assert.equal(Object.values(createdUser.data).length, 8);
  });
  */

    it("Validating user details before creating user", async () => {
      const user = {
        userName: "Devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };

      const response = await fetch(
        "http://localhost:7000/register/create-user",
        {
          method: "POST",
          body: JSON.stringify({ ...user }),
          headers: headersList,
        }
      );

      const createdUser = await response.json();
      assert.equal(createdUser.statusCode, 400);
      assert.equal(createdUser.message, "Enter details correctly");
    });

    it("give warning when Checking username availability - username is already used", async () => {
      const userName = "devendran0912";
      const response = await fetch(
        "http://localhost:7000/register/username-check",
        {
          method: "POST",
          body: JSON.stringify({ userName: userName }),
          headers: headersList,
        }
      );
      const findUser = await response.json();
      assert.equal(findUser.statusCode, 400);
      assert.equal(findUser.message, "UserName is already in use");
    });

    it("allow to create a user when Checking username availability - username is available", async () => {
      const userName = "abc1234";
      const response = await fetch(
        "http://localhost:7000/register/username-check",
        {
          method: "POST",
          body: JSON.stringify({ userName: userName }),
          headers: headersList,
        }
      );
      const findUser = await response.json();
      assert.equal(findUser.statusCode, 200);
      assert.equal(findUser.message, "UserName is available");
      assert.equal(Object.values(findUser.data).length, 0);
    });

    it("give warning when Checking username availability - incorrect username", async () => {
      const userName = "Abc1234";
      const response = await fetch(
        "http://localhost:7000/register/username-check",
        {
          method: "POST",
          body: JSON.stringify({ userName: userName }),
          headers: headersList,
        }
      );
      const findUser = await response.json();
      assert.equal(findUser.statusCode, 400);
      assert.equal(findUser.message, "Username is invalid");
      // assert.equal(Object.values(findUser.data).length, 0);
    });
  });

  describe("Login APIs", () => {
    it("With Valid credentials", async () => {
      const user = {
        userName: "devendran0912",
        password: "Dev@1234",
      };

      const response = await fetch("http://localhost:7000/login/check", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      });
      const findUser = await response.json();

      assert.equal(findUser.statusCode, 200);
      assert.equal(findUser.message, "Logged in");
      assert.equal(Object.values(findUser.data).length, 8);
    });

    it("give warning With invalid credentials (password)", async () => {
      const user = {
        userName: "devendran0912",
        password: "Dev@123466",
      };

      const response = await fetch("http://localhost:7000/login/check", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      });
      const findUser = await response.json();

      assert.equal(findUser.statusCode, 401);
      assert.equal(findUser.message, "Password does not match");
      assert.equal(Object.values(findUser.data).length, 0);
    });

    it("give warning With invalid credentials (username (invalid one) )", async () => {
      const user = {
        userName: "Devendran0912",
        password: "Dev@1234",
      };

      const response = await fetch("http://localhost:7000/login/check", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      });
      const findUser = await response.json();

      assert.equal(findUser.statusCode, 401);
      assert.equal(findUser.message, "Username is invalid");
      assert.equal(Object.values(findUser.data).length, 0);
    });

    it("With no existing user", async () => {
      const user = {
        userName: "goku1234",
        password: "Dev@1234",
      };

      const response = await fetch("http://localhost:7000/login/check", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: headersList,
      });
      const findUser = await response.json();

      assert.equal(findUser.statusCode, 401);
      assert.equal(findUser.message, "User not found");
      assert.equal(Object.values(findUser.data).length, 0);
    });
  });

  describe("Homepage - Task APIs", () => {
    describe("Adding Tasks", () => {
      it("adding a task", async () => {
        const task = {
          userId: "64ed9b72d276512eb609a3f4",
          entry: "task 2 - Nalini",
        };

        const response = await fetch("http://localhost:7000/task/add", {
          method: "POST",
          body: JSON.stringify({ ...task }),
          headers: headersList,
        });
        const responseTask = await response.json();

        assert.equal(responseTask.statusCode, 201);
        assert.equal(responseTask.message, "Task Added!");
        assert.equal(Object.values(responseTask.data).length, 7);
      });

      it("give warning when adding an empty task", async () => {
        const task = {
          userId: "64ed9b72d276512eb609a3f4",
          entry: "",
        };

        const response = await fetch("http://localhost:7000/task/add", {
          method: "POST",
          body: JSON.stringify({ ...task }),
          headers: headersList,
        });
        const responseTask = await response.json();

        assert.equal(responseTask.statusCode, 400);
        assert.equal(responseTask.message, "Task cannot be empty");
        assert.equal(Object.values(responseTask.data).length, 0);
      });
    });

    describe("Editing task", () => {
      it("editing an task", async () => {
        const task = {
          taskId: "64f341ae2245ab97687076aa",
          entry: "Task Edited ",
        };

        const response = await fetch("http://localhost:7000/task/edit", {
          method: "PATCH",
          body: JSON.stringify({ ...task }),
          headers: headersList,
        });
        const responseTask = await response.json();

        assert.equal(responseTask.statusCode, 200);
        assert.equal(responseTask.message, "Task edited");
      });

      it("give warning when updating an task with an empty entry", async () => {
        const task = {
          taskId: "64f341ae2245ab97687076aa",
          entry: "",
        };

        const response = await fetch("http://localhost:7000/task/edit", {
          method: "PATCH",
          body: JSON.stringify({ ...task }),
          headers: headersList,
        });
        const responseTask = await response.json();

        assert.equal(responseTask.statusCode, 400);
        assert.equal(responseTask.message, "Task cannot be empty");
      });

      it("give warning when updating an task with an empty taskId", async () => {
        const task = {
          taskId: "",
          entry: "Task edited",
        };

        const response = await fetch("http://localhost:7000/task/edit", {
          method: "PATCH",
          body: JSON.stringify({ ...task }),
          headers: headersList,
        });
        const responseTask = await response.json();

        assert.equal(responseTask.statusCode, 400);
        assert.equal(responseTask.message, "Task not found!");
      });
    });

    describe("Deleting tasks", () => {
      it("deleting an Non existing task", async () => {
        const taskDeleteId = "64f341b72245ab97687076ae";
        const response = await fetch(
          `http://localhost:7000/task/delete/${taskDeleteId}`,
          {
            method: `DELETE`,
            headers: headersList,
          }
        );
        //   console.log("response", response);
        const data = await response.json();
        // console.log("data", data);

        assert.equal(data.statusCode, 400);
        assert.equal(data.message, "Task not found");
      });

      /*
      it("deleting an Existing task", async () => {
        const taskDeleteId = "64f341e92245ab97687076c5";
        const response = await fetch(
          `http://localhost:7000/task/delete/${taskDeleteId}`,
          {
            method: `DELETE`,
            headers: headersList,
          }
        );
        //   console.log("response", response);
        const data = await response.json();
        console.log("data", data);

        assert.equal(data.statusCode, 200);
        assert.equal(data.message, "Task Deleted");
      });
      */

      /*
      // --------Need to have a discussion---------
      it("give warning when taskId is not requested", async () => {
        const taskDeleteId = "";
        const response = await fetch(
          `http://localhost:7000/task/delete/${taskDeleteId}`,
          {
            method: `DELETE`,
            headers: headersList,
          }
        );
        //   console.log("response", response);
        const data = await response.json();
        console.log("data", data);

        assert.equal(data.statusCode, 400);
        assert.equal(data.message, "Task not found!");
      });
      */
    });

    describe("Getting User's tasks", () => {
      it("getting tasks", async () => {
        const userId = "64ed9b72d276512eb609a3f4";
        const response = await fetch(
          `http://localhost:7000/task/find/${userId}`,
          {
            method: `GET`,
            headers: headersList,
          }
        );
        const data = await response.json();
        assert.equal(data.statusCode, 200);
        assert.equal(data.message, "User Tasks");
        assert.isAbove(data.data.length, 0);
      });
    });
  });
});
