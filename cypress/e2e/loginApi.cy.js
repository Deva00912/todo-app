const cy = window.cy;

describe("Testing the app APIS", () => {
  describe("with Login page - API", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("success in user login", () => {
      const user1 = { email: "devendran0912@gmail.com", password: "Dev@1234" };
      cy.login(user1);
      cy.contains("Logged in").should("be.visible");
      cy.location("pathname").should("eq", "/");
    });

    it("give warning with invalid credentials (email - invalid)", () => {
      const user = {
        email: "Devendran0912",
        password: "Dev@1234",
      };
      cy.login(user);
      cy.contains("email is invalid").should("be.visible");
      cy.contains("Entered details is wrong!").should("be.visible");
    });

    it("give warning with invalid credentials (password - invalid)", () => {
      const user = {
        email: "devendran0912",
        password: "Dev@123433",
      };
      cy.login(user);
      cy.contains("Invalid credentials").should("be.visible");
    });

    it("give warning - 'User does not exists' ", () => {
      const user = {
        email: "goku1234",
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
        email: "qinwentian99@test.com",
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
        email: "qinwentian99@test.com",
        firstName: "Wentian",
        lastName: "Qin",
        password: "Wentian@1234",
        confirmPassword: "Wentian@1234",
      };

      cy.register(user);
      cy.get('[data-cy="registerButton"]').click();
      cy.contains("email is already in use").should("be.visible");
    });

    it("give warning for invalid user details before creating user", () => {
      cy.visit("/register");

      const user = {
        email: "Qinwentian99",
        firstName: "Wentian",
        lastName: "Qin",
        password: "Wentian@1234",
        confirmPassword: "Wentian@1234",
      };

      cy.register(user);
      cy.contains("email is invalid").should("be.visible");
      cy.get('[data-cy="registerButton"]').should("not.be.enabled");
    });
  });

  describe("Tasks page - API", () => {
    beforeEach(() => {
      cy.visit("/login");
      const user = {
        userId: "g8ZQjXoWhM4zbmw7nNDH",
        firstName: "Devendran",
        lastName: "M",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
        email: "devendran0912@test.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJnOFpRalhvV2hNNHpibXc3bk5ESCIsInVzZXJuYW1lIjoiZGV2ZW5kcmFuMDkxMiIsImlhdCI6MTY5OTA3MjMzMSwiZXhwIjoxNjk5MDc1OTMxfQ.ejvXmRUHzBRZiaye8QCGnZNBwB8rxqs6JyIsct1FVkc",
      };
      cy.login(user);
    });

    it.only("Adding an task", () => {
      cy.location("pathname").should("eq", "/");
      cy.get('[data-cy="taskEntry"]').should("be.visible").type("task-2");
      cy.get('[data-cy="addTask"]').should("be.visible").click();
      cy.contains("task-2").should("be.visible");
      cy.get('[data-cy="editButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible");
    });

    it.only("Editing a Task working", () => {
      cy.contains("task-2").should("be.visible");
      cy.get('[data-cy="editButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible");
      cy.get('[data-cy="taskEntry"]')
        .should("be.visible")
        .type("task-2 to task-0");
      cy.get('[data-cy="editButton"]').should("be.visible").first().click();
      cy.contains("Task Edited").should("be.visible");
    });

    it.only("Deleting a task working", () => {
      cy.contains("task-2 to task-0").should("be.visible");
      cy.get('[data-cy="editButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible");
      cy.get('[data-cy="deleteButton"]').should("be.visible").first().click();
      cy.wait(2000);
      cy.contains("Task deleted").should("be.visible");
    });
  });
});
