const cy = window.cy;
describe("template spec", () => {
  beforeEach(() => {
    const user1 = {
      userName: "abcd123",
      firstName: "abcd",
      lastName: "wxyz",
      password: "Abcd@1234",
      confirmPassword: "Abcd@1234",
    };
    const user2 = {
      userName: "devendran0912",
      firstName: "abcd",
      lastName: "wxyz",
      password: "Dev@1234",
      confirmPassword: "Dev@1234",
    };
    const user3 = {
      userName: "nalin1601",
      firstName: "Nalini",
      lastName: "Kumar",
      password: "Nalini@1234",
      confirmPassword: "Nalini@1234",
    };

    const userData = [user1, user2, user3];
    localStorage.setItem("Users", JSON.stringify(userData));
  });

  it("login Page", () => {
    cy.get("[data-cy=userName]").type("devendran0912");
    cy.get("[data-cy=password]").type("Dev@1234");
    cy.get('[data-cy="logInButton"]').click();
    cy.contains("Logged in");

    cy.url().should("include", "http://localhost:3000/");
    cy.contains("Logout successful");
  });
});
