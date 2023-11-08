const cy = window.cy;
describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Test case - Correct details", () => {
    const user = {
      email: "abcd123@test.com",
      firstName: "abcd",
      lastName: "wxyz",
      password: "Abcd@1234",
      confirmPassword: "Abcd@1234",
    };
    cy.register(user);
    cy.get('[data-cy="registerButton"]').click();
    cy.contains("Registered").should("be.visible");
  });

  it("Test case - Incorrect details", () => {
    const user = {
      email: "Abcd123",
      firstName: "abcd",
      lastName: "wxyz@",
      password: "Abcd@1234",
      confirmPassword: "Abcd@1234",
    };
    cy.register(user);
    cy.get('[data-cy="registerButton"]').should("not.be.enabled");
  });

  it("Navigating to Login Page", () => {
    cy.contains("Already have an account?");
    cy.get('[data-cy="goToLogin"]').click();
    cy.url().should("include", "http://localhost:3000/login");
  });
});
