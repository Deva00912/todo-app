const cy = window.cy;
describe("checking everything", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Allows user to enter details", () => {
    //register
    cy.get("[data-cy=userName]").type("devendran0912");
    cy.get('[data-cy="firstName"]').type("Devendran");
    cy.get('[data-cy="lastName"]').type("M");
    cy.get("[data-cy=password]").type("Dev@1234");
    cy.get('[data-cy="confirmPassword"]').type("Dev@1234");
    cy.get('[data-cy="registerButton"]').click();
    cy.contains("Registered"); //toast

    //tasks
    cy.get('[data-cy="taskEntry"]').type("Task 1");
    cy.get('[data-cy="addTask"]').click();
    cy.get('[data-cy="logOutButton"]').click();

    //login
    cy.get("[data-cy=userName]").type("devendran0912");
    cy.get("[data-cy=password]").type("Dev@1234");
    cy.get('[data-cy="logInButton"]').click();

    //Task - Edit
    cy.get('[data-cy="taskEntry"]').type("Task 1 changed to Task 0");
    cy.get('[value="Edit"]').click();

    //Task - Delete
    cy.get('[value="Delete"]').click();
  });
});
