import React from "react";
import Button from "./Button";
import "../../index.css";

const cy = window.cy;

describe("<Button />", () => {
  it("renders disabled :  false", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button />);
    cy.get('[data-cy="buttonType"]').click().should("have.text", "Click Me");
  });

  it("renders disabled :  True", () => {
    cy.mount(<Button disabled={true} />);
    cy.get('[data-cy="buttonType"]').should("not.be.enabled");
  });
});
