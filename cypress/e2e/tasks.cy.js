const cy = window.cy;

describe("In Task screen ", () => {
  beforeEach("Users logged in", () => {
    const user1 = {
      userName: "abcd123",
      firstName: "abcd",
      lastName: "wxyz",
      password: "Abcd@1234",
      confirmPassword: "Abcd@1234",
      id: "user1",
    };

    localStorage.setItem("LoggedInUsers", JSON.stringify(user1));
    cy.visit("/");
  });

  it("adding a task working", () => {
    cy.get('[data-cy="taskEntry"]').should("be.visible").type("task-1");
    cy.get('[data-cy="addTask"]').should("be.visible").click();
    cy.contains("task-1").should("be.visible");
    cy.get('[data-cy="editButton"]').should("be.visible");
    cy.get('[data-cy="deleteButton"]').should("be.visible");
  });

  it("Editing a Task working", () => {
    cy.get('[data-cy="taskEntry"]').should("be.visible").type("task-1");
    cy.get('[data-cy="addTask"]').should("be.visible").click();
    cy.contains("task-1").should("be.visible");
    cy.get('[data-cy="editButton"]').should("be.visible");
    cy.get('[data-cy="deleteButton"]').should("be.visible");
    cy.get('[data-cy="taskEntry"]')
      .should("be.visible")
      .type("task-1 to task-0");
    cy.get('[data-cy="editButton"]').should("be.visible").click();
    cy.contains("Task Edited").should("be.visible");
  });

  it("Deleting a task working", () => {
    cy.get('[data-cy="taskEntry"]').should("be.visible").type("task-1");
    cy.get('[data-cy="addTask"]').should("be.visible").click();
    cy.contains("task-1").should("be.visible");
    cy.get('[data-cy="editButton"]').should("be.visible");
    cy.get('[data-cy="deleteButton"]').should("be.visible");
    cy.get('[data-cy="taskEntry"]')
      .should("be.visible")
      .type("task-1 to task-0");
    cy.get('[data-cy="deleteButton"]').should("be.visible").click();
    cy.contains("Task deleted").should("be.visible");
  });

  it("Clearing all task button working", () => {
    cy.get('[data-cy="taskEntry"]').should("be.visible").type("task-1");
    cy.get('[data-cy="addTask"]').should("be.visible").click();
    cy.contains("task-1").should("be.visible");
    cy.get('[data-cy="editButton"]').should("be.visible");
    cy.get('[data-cy="deleteButton"]').should("be.visible");
    cy.get('[data-cy="clearAllTasksButton"]').should("be.visible").click();
    cy.contains("Cleared all tasks").should("be.visible");
  });

  it("Logout button working", () => {
    cy.get('[data-cy="logOutButton"]').should("be.visible").click();
    cy.location("pathname").should("eq", "/login");
    cy.contains("Logout successful").should("be.visible");
  });
});
