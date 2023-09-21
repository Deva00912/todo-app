const cy = window.cy;
describe("In login screen", () => {
  beforeEach(() => {
    const user1 = {
      username: "abcd123",
      firstName: "abcd",
      lastName: "wxyz",
      password: "Abcd@1234",
      confirmPassword: "Abcd@1234",
      id: "user1",
    };
    const user2 = {
      username: "devendran0912",
      firstName: "abcd",
      lastName: "wxyz",
      password: "Dev@1234",
      confirmPassword: "Dev@1234",
      id: "user2",
    };
    const user3 = {
      username: "nalin1601",
      firstName: "Nalini",
      lastName: "Kumar",
      password: "Nalini@1234",
      confirmPassword: "Nalini@1234",
      id: "user3",
    };

    const userData = [user1, user2, user3];
    localStorage.setItem("Users", JSON.stringify(userData));

    cy.visit("/login");
  });

  it("Making a user log in", () => {
    const user1 = {};
    cy.login(user1);
    cy.contains("Logged in").should("be.visible");
    cy.location("pathname").should("eq", "/");
  });
});
