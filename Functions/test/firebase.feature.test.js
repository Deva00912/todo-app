/* eslint-disable jest/valid-expect */
require("dotenv").config();
const { expect } = require("chai");
const { validate, putCreateUser } = require("../Features/Auth");

describe("Testing features for firebase", () => {
  describe.skip("Validating user - Invalid details", () => {
    it("Validating user - valid details", () => {
      const user = {
        username: "devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(true);
    });
    it("Incorrect username", () => {
      const user = {
        username: "Devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
    it("Invalid password", () => {
      const user = {
        username: "Devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "dev1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
    it("Mismatch password & confirm password", () => {
      const user = {
        username: "Devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "Dev@1dd234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
    it("Empty first name", () => {
      const user = {
        username: "devendran0912",
        firstName: "",
        lastName: "M",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
    it("Empty last name", () => {
      const user = {
        username: "devendran0912",
        firstName: "Devendran",
        lastName: "",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
    it("Empty first &  last name", () => {
      const user = {
        username: "devendran0912",
        firstName: "",
        lastName: "",
        password: "Dev@1234",
        confirmPassword: "Dev@1234",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
    it("Empty password & confirmPassword", () => {
      const user = {
        username: "devendran0912",
        firstName: "Devendran",
        lastName: "M",
        password: "",
        confirmPassword: "",
      };
      const result = validate(user);
      expect(result).to.be.equal(false);
    });
  });

  it("Creating an user", async () => {
    const user = {
      username: "anitha33332",
      firstName: "Anitha",
      lastName: "K",
      password: "Dev@1234",
      confirmPassword: "Dev@1234",
    };
    const response = await putCreateUser(user);

    expect(response)
      .to.be.a("object")
      .to.haveOwnProperty("message")
      .to.be.equal("User created");
    expect(response).to.haveOwnProperty("data").to.be.a("object");
    expect(Object.keys(response).length).to.be.equal(2);
  });
});
