const cy = window.cy;

describe("Testing the app APIS", () => {
  describe("with Login page - API", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("success in user login", () => {
      const user1 = { username: "devendran0912", password: "Dev@1234" };
      cy.login(user1);
      cy.contains("Logged in").should("be.visible");
      cy.location("pathname").should("eq", "/");
    });

    it("give warning with invalid credentials (username - invalid)", () => {
      const user = {
        username: "Devendran0912",
        password: "Dev@1234",
      };
      cy.login(user);
      cy.contains("Username is invalid").should("be.visible");
      cy.contains("Entered details is wrong!").should("be.visible");
    });

    it("give warning with invalid credentials (password - invalid)", () => {
      const user = {
        username: "devendran0912",
        password: "Dev@123433",
      };
      cy.login(user);
      cy.contains("Invalid credentials").should("be.visible");
    });

    it("give warning - 'User does not exists' ", () => {
      const user = {
        username: "goku1234",
        password: "Dev@123433",
      };
      cy.login(user);
      cy.contains("User does not exists").should("be.visible");
    });
  });

  describe("with Register page - API", () => {
    beforeEach(() => {
      cy.visit("/register");
    });

    it.skip("creating a user", () => {
      const user = {
        username: "qinwentian99",
        firstName: "Wentian",
        lastName: "Qin",
        password: "Wentian@1234",
        confirmPassword: "Wentian@1234",
      };

      cy.register(user);
      cy.get('[data-cy="registerButton"]').click();
      cy.contains("Registered").should("be.visible");
    });

    it("give warning when creating an existing user", () => {
      cy.visit("/register");

      const user = {
        username: "qinwentian99",
        firstName: "Wentian",
        lastName: "Qin",
        password: "Wentian@1234",
        confirmPassword: "Wentian@1234",
      };

      cy.register(user);
      cy.get('[data-cy="registerButton"]').click();
      cy.contains("Username is already in use").should("be.visible");
    });

    it("give warning for invalid user details before creating user", () => {
      cy.visit("/register");

      const user = {
        username: "Qinwentian99",
        firstName: "Wentian",
        lastName: "Qin",
        password: "Wentian@1234",
        confirmPassword: "Wentian@1234",
      };

      cy.register(user);
      cy.contains("Username is invalid").should("be.visible");
      cy.get('[data-cy="registerButton"]').should("not.be.enabled");
    });
  });

  describe("Tasks page - API", () => {
    beforeEach(() => {
      cy.visit("/login");
      const user = {
        _id: "64f341992245ab97687076a3",
        userId: "64f341992245ab97687076a2",
        firstName: "Devendran",
        lastName: "M",
        username: "devendran0912",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      cy.login(user);
    });

    it("Adding an task", () => {
      cy.location("pathname").should("eq", "/");
      cy.get('[data-cy="taskEntry"]').should("be.visible").type("task-2");
      cy.get('[data-cy="addTask"]').should("be.visible").click();
      cy.contains("task-2").should("be.visible");
      cy.get('[data-cy="editButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible");
    });

    it("Editing a Task working", () => {
      cy.contains("task-2").should("be.visible");
      cy.get('[data-cy="editButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible");
      cy.get('[data-cy="taskEntry"]')
        .should("be.visible")
        .type("task-2 to task-0");
      cy.get('[data-cy="editButton"]').should("be.visible").first().click();
      cy.contains("Task Edited").should("be.visible");
    });

    it("Deleting a task working", () => {
      cy.contains("task-2 to task-0").should("be.visible");
      cy.get('[data-cy="editButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible").first().click();
      cy.contains("Task deleted").should("be.visible");
    });
  });
});
