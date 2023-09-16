/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-conditional-expect */
const chai = require("chai");
const chaiHttp = require("chai-http");
// const app = require("../index.js");

chai.use(chaiHttp);

const expect = chai.expect;

describe.only("User API", () => {
  describe("POST login/check", () => {
    it("should handle valid login user", () => {
      chai
        .request("http://localhost:7000")
        .post("/login/check")
        .send({
          userName: "tatsumi3214",
          password: "Dev@1234",
        })
        .end((err, res) => {
          if (err) {
            expect(res).to.have.status(500);
            expect(res.body).to.have.property("message");
          } else {
            expect(res).to.have.status(400);
            expect(res.body)
              .to.have.property("message")
              .equal("User does not exists");
          }
        });
    });
  });
});
