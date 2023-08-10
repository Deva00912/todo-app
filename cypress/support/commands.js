const cy = window.cy;
// eslint-disable-next-line
Cypress.Commands.add("register", (user) => {
  cy.get(`[data-cy=userName]`).type(`${user.userName}`);
  cy.get(`[data-cy=firstName]`).type(user.firstName);
  cy.get(`[data-cy=lastName]`).type(user.lastName);
  cy.get(`[data-cy=password]`).type(user.password);
  cy.get(`[data-cy=confirmPassword]`).type(user.confirmPassword);
});

// eslint-disable-next-line
Cypress.Commands.add("validate", (data) => {
  data.forEach((field) => {
    cy.get(field.dataCy).clear();

    data
      .filter((obj) => obj.dataCy !== field.dataCy)
      .forEach((obj) => {
        cy.get(obj.dataCy).clear().type(obj.correctValue);
      });

    field.wrongValues.forEach((value) => {
      cy.get(field.dataCy)
        .clear()
        .type(value)
        .get('[data-cy="registerButton"]')
        .should("not.be.enabled")
        .get(field.dataCy)
        .clear();
    });
  });
});
