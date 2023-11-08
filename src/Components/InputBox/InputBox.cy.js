import React from "react";
import "../../index.css";
import InputBox from "./InputBox";

const cy = window.cy;

describe("Input box Component", () => {
  it("renders", () => {
    cy.mount(<InputBox disabled={false} />);
  });

  describe("passing props", () => {
    it("disabled as 'True'", () => {
      cy.mount(<InputBox disabled={true} />);
      cy.get('[data-cy="textBox"]').should("not.be.enabled");
    });

    it(" disabled as 'False'", () => {
      cy.mount(<InputBox disabled={false} />);
      cy.get('[data-cy="textBox"]')
        .should("be.visible")
        .type("Text added")
        .should("have.value", "Text added");
    });

    it(" as value : 'Text value from props'", () => {
      cy.mount(<InputBox value={"Text value from props"} />);
      cy.get('[data-cy="textBox"]').should(
        "have.value",
        "Text value from props"
      );
    });

    it(" as placeholder : 'Text value from props'", () => {
      cy.mount(<InputBox placeholder={"Text value from props"} />);
      cy.get('[data-cy="textBox"]').should(
        "be.visible",
        "Text value from props"
      );
    });
  });

  describe("validating with name attribute", () => {
    describe("name = email", () => {
      it("valid email", () => {
        cy.mount(<InputBox name={"email"} />);
        cy.get('[data-cy="textBox"]')
          .should("be.visible")
          .type("devendran0912");
      });
      it("Invalid email", () => {
        cy.mount(<InputBox name={"email"} />);
        cy.get('[data-cy="textBox"]')
          .should("be.visible")
          .type("Devendran0912");
        cy.contains("email is invalid").should("be.visible");
      });
    });
  });
});
